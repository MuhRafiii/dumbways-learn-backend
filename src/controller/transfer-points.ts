import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const transferPoints = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { amount, senderId, receiverId } = req.body;

  try {
    if (amount <= 0) {
      res
        .status(400)
        .json({
          statusCode: 400,
          status: "error",
          message: "Jumlah poin harus lebih besar dari 0",
        });
      return;
    }

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: senderId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: receiverId,
        },
      }),
    ]);

    if (!sender) {
      res
        .status(404)
        .json({
          statusCode: 404,
          status: "error",
          message: "Pengguna pengirim tidak ditemukan",
        });
      return;
    }

    if (!receiver) {
      res
        .status(404)
        .json({
          statusCode: 404,
          status: "error",
          message: "Pengguna penerima tidak ditemukan",
        });
      return;
    }

    if (sender.points < amount) {
      res
        .status(400)
        .json({
          statusCode: 400,
          status: "error",
          message: "Poin pengirim tidak mencukupi",
        });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });

      res
        .status(200)
        .json({
          statusCode: 200,
          status: "success",
          message: "Poin berhasil ditransfer",
        });
    });
  } catch (error) {
    next(error);
  }
};

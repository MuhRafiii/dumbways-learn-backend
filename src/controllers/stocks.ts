import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { updates } = req.body;

  try {
    const validate = updates.map(async (update: any) => {
      const { supplierId, productId, quantity } = update;

      const [supplier, product] = await Promise.all([
        prisma.supplier.findUnique({ where: { id: supplierId } }),
        prisma.product.findUnique({ where: { id: productId } }),
      ]);

      if (!supplier)
        throw {
          statusCode: 404,
          message: `Supplier dengan ID ${supplierId} tidak ditemukan`,
        };

      if (!product)
        throw {
          statusCode: 404,
          message: `Produk dengan ID ${productId} tidak ditemukan`,
        };

      const newStock = product.stock + quantity;
      if (newStock < 0)
        throw {
          statusCode: 400,
          message: `Kuantitas melebihi stok yang ada untuk produk dengan ID ${productId}`,
        };
    });

    await Promise.all(validate);

    await prisma.$transaction(async (tx) => {
      const updateStocks = updates.map(async (update: any) => {
        const { supplierId, productId, quantity } = update;

        await tx.product.update({
          where: { id: productId },
          data: { stock: { increment: quantity } },
        });

        await tx.stock.create({
          data: {
            productId,
            supplierId,
            quantity,
          },
        });
      });

      await Promise.all(updateStocks);
    });

    res.status(200).json({ message: "Semua stok berhasil diperbarui." });
  } catch (error) {
    next(error);
  }
};

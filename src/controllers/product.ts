import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const product = await prisma.product.create({
      data: { name, price },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

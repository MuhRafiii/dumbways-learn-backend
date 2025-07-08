import { Request, Response } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/product";
import { productSchema, updateProductSchema } from "../validation/product";

export async function handleGetProducts(req: Request, res: Response) {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleAddProduct(req: Request, res: Response) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, name, stocks } = req.body;
    const product = await addProduct(email, name, stocks);
    res.status(201).json({ message: "Product added", product });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { stocks } = req.body;
    await updateProduct(user, Number(id), stocks);
    res.status(200).json({ message: "Product updated" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleDeleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    await deleteProduct(user, Number(id));
    res.status(200).json({ message: "Product deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

import { Request, Response } from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  uploadImage,
} from "../services/product";
import {
  productSchema,
  updateProductSchema,
  uploadImageSchema,
} from "../validation/product";

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

export async function handleUploadImage(req: Request, res: Response) {
  try {
    const { error } = uploadImageSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const user = (req as any).user;
    const { name } = req.body;
    const picture = req.file.filename;
    const image = await uploadImage(user.email, name, picture);
    res.status(200).json({ message: "Image uploaded", image });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function handleUpdateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const user = (req as any).user;
    const { stocks } = req.body;
    const product = await updateProduct(user.email, Number(id), stocks);
    res.status(200).json({ message: "Product updated", product });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

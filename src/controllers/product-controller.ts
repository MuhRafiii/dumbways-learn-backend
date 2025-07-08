import { Request, Response } from "express";
import { products } from "../models/product-model";

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, desc, price } = req.body;

  if (!name || !desc || !price) {
    res.status(400).json({ message: "Semua field harus diisi" });
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name,
    desc,
    price,
  };

  products.push(newProduct);
  res.status(201).json({ message: "Product berhasil ditambahkan" });
};

export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, desc, price } = req.body;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productIndex === -1) {
    res.status(404).json({ message: "Product tidak ditemukan" });
    return;
  }

  const product = products[productIndex];
  if (name) {
    product.name = name;
  }
  if (desc) {
    product.desc = desc;
  }
  if (price) {
    product.price = price;
  }

  res.status(200).json({ message: "Product berhasil diperbarui" });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productIndex === -1) {
    res.status(404).json({ message: "Product tidak ditemukan" });
    return;
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: "Product berhasil dihapus" });
};

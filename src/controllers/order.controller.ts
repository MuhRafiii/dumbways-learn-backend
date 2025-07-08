import { Request, Response } from "express";
import { Order, OrderItem, orders } from "../models/order-model";
import { products } from "../models/product-model";

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: "Items harus diisi dan berupa array" });
    return;
  }

  let orderItems: OrderItem[] = [];
  let totalPrice = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      res.status(404).json({
        message: `Product dengan ID ${item.productId} tidak ditemukan`,
      });
      return;
    }

    const subTotal = product.price * item.qty;
    totalPrice += subTotal;

    orderItems.push({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      qty: item.qty,
      subTotal,
    });
  }

  const newOrder: Order = {
    id: orders.length + 1,
    items: orderItems,
    totalPrice,
  };

  orders.push(newOrder);

  res.status(201).json({ message: "Order berhasil dibuat", data: newOrder });
};

export const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const { items } = req.body;

  const orderIndex = orders.findIndex((order) => order.id === parseInt(id));

  if (orderIndex === -1) {
    res.status(404).json({ message: "Order tidak ditemukan" });
    return;
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: "Items harus diisi dan berupa array" });
    return;
  }

  let orderItems: OrderItem[] = [];
  let totalPrice = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      res.status(404).json({
        message: `Product dengan ID ${item.productId} tidak ditemukan`,
      });
      return;
    }

    const subTotal = product.price * item.qty;
    totalPrice += subTotal;

    orderItems.push({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      qty: item.qty,
      subTotal,
    });
  }

  // Update order
  orders[orderIndex].items = orderItems;
  orders[orderIndex].totalPrice = totalPrice;

  res.json({ message: "Order berhasil diperbarui", data: orders[orderIndex] });
};

export const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;

  const orderIndex = orders.findIndex((order) => order.id === parseInt(id));

  if (orderIndex === -1) {
    res.status(404).json({ message: "Order tidak ditemukan" });
    return;
  }

  orders.splice(orderIndex, 1);

  res.json({ message: "Order berhasil dihapus" });
};

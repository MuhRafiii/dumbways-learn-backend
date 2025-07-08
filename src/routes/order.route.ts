import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/orders", getOrders);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;

import express from "express";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleGetProducts,
  handleUpdateProduct,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { isSupllier } from "../middlewares/product";

const router = express.Router();

router.get("/products", authenticate, isSupllier, handleGetProducts);
router.post("/products/add", authenticate, isSupllier, handleAddProduct);
router.put("/products/:id", authenticate, isSupllier, handleUpdateProduct);
router.delete("/products/:id", authenticate, isSupllier, handleDeleteProduct);

export default router;

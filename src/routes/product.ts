import express from "express";
import {
  handleAddProduct,
  handleGetProducts,
  handleUpdateProduct,
  handleUploadImage,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { isSupllier } from "../middlewares/product";
import { limiter } from "../middlewares/rate-limit";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/products", authenticate, handleGetProducts);
router.post("/products/add", authenticate, isSupllier, handleAddProduct);
router.put(
  "/products/update/:id",
  authenticate,
  isSupllier,
  handleUpdateProduct
);
router.post(
  "/products/upload-image",
  limiter,
  authenticate,
  upload.single("picture"),
  handleUploadImage
);

export default router;

import express from "express";
import {
  handleLogin,
  handleRegister,
  handleResetPassword,
  handleSupplierLogin,
  handleUploadProfile,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post(
  "/upload-profile",
  authenticate,
  upload.single("picture"),
  handleUploadProfile
);
router.put("/reset-password", authenticate, handleResetPassword);
router.post("/suppliers/login", handleSupplierLogin);

export default router;

import express from "express";
import {
  handleLogin,
  handleRegister,
  handleResetPassword,
  handleSupplierLogin,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.put("/reset-password", authenticate, handleResetPassword);
router.post("/suppliers/login", handleSupplierLogin);

export default router;

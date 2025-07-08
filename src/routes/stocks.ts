import express from "express";
import { updateStock } from "../controllers/stocks";

const router = express.Router();

router.post("/suppliers/stock", updateStock);

export default router;

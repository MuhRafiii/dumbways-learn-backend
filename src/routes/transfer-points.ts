import express from "express";
import { transferPoints } from "../controller/transfer-points";

const router = express.Router();

router.post("/transfer-points", transferPoints);

export default router;

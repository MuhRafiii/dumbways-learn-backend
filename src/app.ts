import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import corsMiddleware from "./middlewares/cors";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

app.use("/auth", authRoute);
app.use("/suppliers", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

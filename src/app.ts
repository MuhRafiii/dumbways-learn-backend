import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth";
import productRoute from "./routes/product";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/suppliers", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

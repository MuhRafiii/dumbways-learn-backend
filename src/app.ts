import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import stockRoute from "./routes/stocks";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1", stockRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

import dotenv from "dotenv";
import express from "express";
import router from "./routes/transfer-points";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

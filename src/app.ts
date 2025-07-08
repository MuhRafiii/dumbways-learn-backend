import express from "express";
import productRoute from "./routes/product";

const app = express();
app.use(express.json());
app.use("/api/v1", productRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

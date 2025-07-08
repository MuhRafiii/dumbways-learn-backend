import express from "express";
import orderRoute from "./routes/order.route";
import productRoute from "./routes/product-route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1", productRoute);
app.use("/api/v2", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

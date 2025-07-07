import express from "express";
import postRoute from "./routes/post-route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1", postRoute);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

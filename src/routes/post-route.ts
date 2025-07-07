import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
} from "../controllers/post-controller";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", createPost);
router.delete("/post/:id", deletePost);

export default router;

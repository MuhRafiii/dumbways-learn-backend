import { Request, Response } from "express";
import { posts } from "../models/post-model";

export const getPosts = (req: Request, res: Response) => {
  res.status(200).json(posts);
};

export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: "Title dan content harus diisi" });
    return;
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);

  res.status(201).json({ message: "Post berhasil dibuat", data: newPost });
};

export const deletePost = (req: Request, res: Response) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    res.status(404).json({ message: "Post tidak ditemukan" });
    return;
  }

  posts.splice(postIndex, 1);

  res.status(200).json({ message: "Post berhasil dihapus" });
};

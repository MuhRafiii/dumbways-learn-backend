import { NextFunction, Request, Response } from "express";

export function isSupllier(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;

    if (user.role !== "supplier") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  } catch {
    res.status(401).json({ message: "Invalid role" });
    return;
  }
}

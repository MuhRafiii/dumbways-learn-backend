import { Request, Response } from "express";
import {
  loginSupplier,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/auth";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json({ message: "Login success", ...result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function handleSupplierLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginSupplier(email, password);
    res.json({ message: "Login success", ...result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function handleResetPassword(req: Request, res: Response) {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;
    await resetPassword(email, password);
    res.json({ message: "Password reset success" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { encrypt } from "../utils/encryption";
import { signToken } from "../utils/jwt";

export async function registerUser(
  email: string,
  password: string,
  role: string
) {
  if (await prisma.user.findUnique({ where: { email } })) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });

  return { id: user.id, email: user.email, role: user.role };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const dataToEncrypt = JSON.stringify({ email, password });
  const loginData = encrypt(dataToEncrypt);
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { loginData, token };
}

export async function loginSupplier(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  if (user.role !== "supplier") throw new Error("User is not a supplier");

  const dataToEncrypt = JSON.stringify({ email, password });
  const loginData = encrypt(dataToEncrypt);
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { loginData, token };
}

export async function resetPassword(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const newPasswordHashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: newPasswordHashed },
  });
}

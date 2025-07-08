import { prisma } from "../prisma/client";

export async function getProducts() {
  const products = await prisma.product.findMany();

  if (products.length === 0) {
    throw new Error("There are no products yet");
  }

  return products;
}

export async function addProduct(email: string, name: string, stocks: number) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const product = await prisma.product.create({
    data: { email, name, stocks },
  });
  return product;
}

export async function updateProduct(user: any, id: number, stocks: number) {
  let product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.email !== user.email) {
    throw new Error("You are not authorized to update this product");
  }

  product = await prisma.product.update({
    where: { id },
    data: { stocks },
  });
  return product;
}

export async function deleteProduct(user: any, id: number) {
  let product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.email !== user.email) {
    throw new Error("You are not authorized to delete this product");
  }

  product = await prisma.product.delete({ where: { id } });
  return product;
}

import { prisma } from "../prisma/client";

export async function getProducts() {
  const products = await prisma.product.findMany();
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

export async function uploadImage(
  email: string,
  name: string,
  picture: string
) {
  const product = await prisma.product.findUnique({ where: { name } });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.email !== email) {
    throw new Error("Forbidden");
  }

  const image = await prisma.image.create({
    data: { name, picture },
  });
  return image;
}

export async function updateProduct(email: string, id: number, stocks: number) {
  let product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.email !== email) {
    throw new Error("Forbidden");
  }

  product = await prisma.product.update({
    where: { id },
    data: { stocks },
  });
  return product;
}

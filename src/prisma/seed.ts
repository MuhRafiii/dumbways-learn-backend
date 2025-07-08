import { prisma } from "./client";

async function main() {
  await prisma.supplier.createMany({
    data: [
      { name: "Supplier A" },
      { name: "Supplier B" },
      { name: "Supplier C" },
    ],
  });

  // Seed products
  await prisma.product.createMany({
    data: [
      { name: "Product X", stock: 100 },
      { name: "Product Y", stock: 200 },
      { name: "Product Z", stock: 300 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "../prisma/client";

async function main() {
  // Clear old data
  await prisma.user.deleteMany();

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", points: 100 },
      { name: "Bob", email: "bob@example.com", points: 750 },
      { name: "Charlie", email: "charlie@example.com", points: 2200 },
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

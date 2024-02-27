import { prisma } from "./src/lib/prisma";

const books_categories = [
  { name: "Romance" },
  { name: "Suspense" },
  { name: "Terror" },
  { name: "Aventura" },
  { name: "Fantasia" },
  { name: "Didático" },
];

try {
  await prisma.bookCategory.createMany({
    data: books_categories,
  });
} catch (error) {
  console.log(error);
}

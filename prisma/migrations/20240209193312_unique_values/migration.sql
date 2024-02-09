/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `book_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cod]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "book_categories_name_key" ON "book_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "books_cod_key" ON "books"("cod");

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idBook" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_bookCategoryId_fkey" FOREIGN KEY ("bookCategoryId") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

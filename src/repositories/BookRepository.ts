import { AppError } from "../errors/AppError";
import { prisma } from "../lib/prisma";
import { Book, BookCategory } from "../models/Book";

export class BookRepository {
  // save
  async save(
    title: string,
    cod: string,
    editora: string,
    autor: string,
    sinopse: string,
    bookCategoryId: string,
    qtd: number,
    idUser: string
  ) {
    try {
      await prisma.book.create({
        data: {
          title,
          cod,
          editora,
          autor,
          sinopse,
          bookCategoryId,
          qtd,
          idUser,
        },
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao salvar livro", 500);
    }
  }

  // findById
  async findById(id: string) {
    const book = await prisma.book.findFirst({
      where: { id },
    });
    return book ? new Book(book) : null;
  }

  // findByTitle
  async findByTitle(title: string) {
    const book = await prisma.book.findFirst({
      where: { title },
    });
    return book ? new Book(book) : null;
  }

  // findByCod
  async findByCod(cod: string) {
    const book = await prisma.book.findFirst({
      where: { cod },
    });
    return book ? new Book(book) : null;
  }

  // find by author
  async findByAuthor(page: number, pageSize: number, autor: string) {
    const books = await prisma.book.findMany({
      where: { autor },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : null;
  }

  // find by author and user
  async findByAuthorAndUser(
    idUser: string,
    page: number,
    pageSize: number,
    autor: string
  ) {
    const books = await prisma.book.findMany({
      where: { idUser, autor },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : null;
  }

  // find by category
  async findByCategory(page: number, pageSize: number, category: string) {
    const books = await prisma.book.findMany({
      where: { bookCategoryId: category },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : null;
  }

  // find by category and user
  async findByCategoryAndUser(
    idUser: string,
    page: number,
    pageSize: number,
    category: string
  ) {
    const books = await prisma.book.findMany({
      where: { idUser, bookCategoryId: category },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : null;
  }

  // find
  async find(page: number, pageSize: number) {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : [];
  }

  // findByUser
  async findByUser(idUser: string, page: number, pageSize: number) {
    const books = await prisma.book.findMany({
      where: { idUser },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return books.length > 0 ? books.map((book) => new Book(book)) : [];
  }

  // contAll
  async countAll() {
    const books = await prisma.book.findMany();
    return books.length;
  }

  // contAllByUser
  async countAllByUser(idUser: string) {
    const books = await prisma.book.findMany({
      where: { idUser },
    });
    return books.length;
  }

  // patch
  async patch(id: string, data: object) {
    try {
      await prisma.book.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao atualizar livro", 500);
    }
  }

  // delete
  async delete(id: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          idBook: id,
        },
      });

      // Excluir todas as reservas associadas ao livro
      const deleteBookingsPromises = bookings.map((booking) =>
        prisma.booking.delete({
          where: {
            id: booking.id,
          },
        })
      );
      await Promise.all(deleteBookingsPromises);

      // Agora que todas as reservas foram excluídas, exclua o livro
      await prisma.book.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao deletar livro", 500);
    }
  }

  // find books categories
  async findBooksCategories(page: number, pageSize: number) {
    const booksCategories = await prisma.bookCategory.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return booksCategories.length > 0
      ? booksCategories.map((bookCategory) => new BookCategory(bookCategory))
      : null;
  }

  // cont all books categories
  async countAllBooksCategories() {
    const booksCategories = await prisma.bookCategory.findMany();
    return booksCategories.length;
  }

  // findCategoryById
  async findBookCategoryById(id: string) {
    const bookCategory = await prisma.bookCategory.findFirst({
      where: { id },
    });
    return bookCategory ? new BookCategory(bookCategory) : null;
  }

  // find book categorie by name
  async findBookCategoryByName(name: string) {
    const bookCategory = await prisma.bookCategory.findFirst({
      where: { name },
    });

    return bookCategory ? new BookCategory(bookCategory) : null;
  }
}

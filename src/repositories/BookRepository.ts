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
          title: title.toLocaleLowerCase(),
          cod,
          editora: editora.toLocaleLowerCase(),
          autor: autor.toLocaleLowerCase(),
          sinopse: sinopse.toLocaleLowerCase(),
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

  // find
  async find(page: number, pageSize: number) {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const totalItems = (await prisma.book.findMany()).length;
    return books
      ? {
          totalItems,
          books: books
            .map((book) => new Book(book))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
        }
      : books;
  }

  // find by category
  async findByCategory(page: number, pageSize: number, categoryId: string) {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        bookCategoryId: categoryId,
      },
    });
    const totalItems = (
      await prisma.book.findMany({
        where: {
          bookCategoryId: categoryId,
        },
      })
    ).length;
    return books
      ? {
          totalItems,
          books: books
            .map((book) => new Book(book))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
        }
      : books;
  }

  // find by category and search
  async findByCategoryAndSearch(
    page: number,
    pageSize: number,
    categoryId: string,
    search: string
  ) {
    let books: Book[] = [];
    (
      await prisma.book.findMany({
        where: {
          bookCategoryId: categoryId,
        },
      })
    ).map((book) => {
      if (
        book.autor.includes(search.toLocaleLowerCase()) ||
        book.cod.includes(search) ||
        book.editora.includes(search.toLocaleLowerCase()) ||
        book.id === search ||
        book.sinopse.includes(search.toLocaleLowerCase()) ||
        book.title.includes(search.toLocaleLowerCase())
      ) {
        books.push(book);
      }
    });
    books.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    const totalItems = books.length;
    books = getPag(books, page, pageSize);
    return books
      ? { totalItems, books: books.map((book) => new Book(book)) }
      : books;
  }

  // find by search
  async findBySearch(page: number, pageSize: number, search: string) {
    let books: Book[] = [];
    (await prisma.book.findMany()).map((book) => {
      if (
        book.autor.includes(search.toLocaleLowerCase()) ||
        book.cod.includes(search) ||
        book.editora.includes(search.toLocaleLowerCase()) ||
        book.id === search ||
        book.sinopse.includes(search.toLocaleLowerCase()) ||
        book.title.includes(search.toLocaleLowerCase())
      ) {
        books.push(book);
      }
    });
    books.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    const totalItems = books.length;
    books = getPag(books, page, pageSize);
    return books
      ? { totalItems, books: books.map((book) => new Book(book)) }
      : books;
  }

  // findByUser
  async findByUser(idUser: string, page: number, pageSize: number) {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: { idUser },
    });
    const totalItems = (await prisma.book.findMany({ where: { idUser } }))
      .length;
    return books
      ? {
          totalItems,
          books: books
            .map((book) => new Book(book))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
        }
      : books;
  }

  // find by User and search
  async findByUserAndSearch(
    page: number,
    pageSize: number,
    search: string,
    idUser: string
  ) {
    let books: Book[] = [];
    (await prisma.book.findMany({ where: { idUser } })).map((book) => {
      if (
        book.autor.includes(search.toLocaleLowerCase()) ||
        book.cod.includes(search) ||
        book.editora.includes(search.toLocaleLowerCase()) ||
        book.id === search ||
        book.sinopse.includes(search.toLocaleLowerCase()) ||
        book.title.includes(search.toLocaleLowerCase())
      ) {
        books.push(book);
      }
    });
    books.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    const totalItems = books.length;
    books = getPag(books, page, pageSize);
    return books
      ? { totalItems, books: books.map((book) => new Book(book)) }
      : books;
  }

  // find by user and category
  async findByUserAndCategory(
    page: number,
    pageSize: number,
    categoryId: string,
    idUser: string
  ) {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        bookCategoryId: categoryId,
        idUser,
      },
    });
    const totalItems = (
      await prisma.book.findMany({
        where: {
          bookCategoryId: categoryId,
          idUser,
        },
      })
    ).length;
    return books
      ? {
          totalItems,
          books: books
            .map((book) => new Book(book))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
        }
      : books;
  }

  // find by user and category and search
  async findByUserAndCategoryAndSearch(
    page: number,
    pageSize: number,
    categoryId: string,
    search: string,
    idUser: string
  ) {
    let books: Book[] = [];
    (
      await prisma.book.findMany({
        where: {
          bookCategoryId: categoryId,
          idUser,
        },
      })
    ).map((book) => {
      if (
        book.autor.includes(search.toLocaleLowerCase()) ||
        book.cod.includes(search) ||
        book.editora.includes(search.toLocaleLowerCase()) ||
        book.id === search ||
        book.sinopse.includes(search.toLocaleLowerCase()) ||
        book.title.includes(search.toLocaleLowerCase())
      ) {
        books.push(book);
      }
    });
    books.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    const totalItems = books.length;
    books = getPag(books, page, pageSize);
    return books
      ? { totalItems, books: books.map((book) => new Book(book)) }
      : books;
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
  async findBooksCategories() {
    let booksCategories: BookCategory[] = [];
    booksCategories = await prisma.bookCategory.findMany();

    return booksCategories
      ? booksCategories
          .map((bookCategory) => new BookCategory(bookCategory))
          .sort((a, b) => a.name.localeCompare(b.name))
      : booksCategories;
  }

  // find Category By Search
  async findBooksCategoriesBySearch(search: string) {
    let booksCategories: BookCategory[] = [];

    (
      await prisma.bookCategory.findMany({
        where: { id: search },
      })
    ).map((bookCategory) => booksCategories.push(bookCategory));

    (
      await prisma.bookCategory.findMany({
        where: {
          name: {
            contains: search.toLocaleLowerCase(),
          },
        },
      })
    ).map((bookCategory) => booksCategories.push(bookCategory));

    return booksCategories
      ? booksCategories
          .map((bookCategory) => new BookCategory(bookCategory))
          .sort((a, b) => a.name.localeCompare(b.name))
      : booksCategories;
  }
}

function getPag<Book>(lista: Book[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return lista.slice(startIndex, endIndex);
}

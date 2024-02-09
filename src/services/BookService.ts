import { AppError } from "../errors/AppError";
import { BookRepository } from "repositories/BookRepository";
import { BookUpdate } from "models/Book";

export class BookService {
  repository: BookRepository;

  constructor(repository: BookRepository) {
    this.repository = repository;
  }

  // register
  async register(
    title: string,
    cod: string,
    editora: string,
    autor: string,
    sinopse: string,
    bookCategoryId: string,
    qtd: number
  ) {
    const bookCategoryIdExists = await this.repository.findBookCategoryById(
      bookCategoryId
    );
    if (!bookCategoryIdExists)
      throw new AppError("Categoria de livro não encontrada", 404);

    const titleExists = await this.repository.findByTitle(title);
    if (titleExists) throw new AppError("Título de livro já existe", 409);

    const codExists = await this.repository.findByCod(cod);
    if (codExists) throw new AppError("Código de livro já existe", 409);

    await this.repository.save(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd
    );

    return { message: "Livro criado com sucesso" };
  }

  // list
  async list(page: number, pageSize: number, search: string) {
    let totalItems = await this.repository.countAll();
    let totalPages = Math.ceil(totalItems / pageSize);
    if (search == "") {
      const books = await this.repository.find(page, pageSize);
      return {
        books: books,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
    }

    let books = await this.repository.findByAuthor(page, pageSize, search);
    if (books)
      return {
        books: books,
        pageInfo: {
          page,
          pageSize,
          totalItems: books.length,
          totalPages: Math.ceil(books.length / pageSize),
        },
      };

    page = 1;
    pageSize = 1;
    totalItems = 1;
    totalPages = 1;

    let book = await this.repository.findByTitle(search);
    if (book)
      return {
        book: book,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    book = await this.repository.findByCod(search);
    if (book)
      return {
        book: book,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    book = await this.repository.findById(search);
    if (book)
      return {
        book: book,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    return { book: {} };
  }

  // list books categories
  async listBooksCategories(page: number, pageSize: number, search: string) {
    let totalItems = await this.repository.countAllBooksCategories();
    let totalPages = Math.ceil(totalItems / pageSize);
    if (search == "") {
      const booksCategories = await this.repository.findBooksCategories(
        page,
        pageSize
      );
      return {
        booksCategories: booksCategories,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
    }
    page = 1;
    pageSize = 1;
    totalItems = 1;
    totalPages = 1;

    let bookCategory = await this.repository.findBookCategoryById(search);
    if (bookCategory)
      return {
        bookCategory: bookCategory,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    bookCategory = await this.repository.findBookCategoryByName(search);
    if (bookCategory)
      return {
        bookCategory: bookCategory,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    return { bookCategory: {} };
  }

  // patch
  async patch(id: string, data: BookUpdate) {
    const livroExists = await this.repository.findById(id);
    if (!livroExists) throw new AppError("Livro não cadastrado", 404);

    if (data.title) {
      data.title ? null : (data.title = "");
      const livroExists = await this.repository.findByTitle(data.title);
      if (livroExists) throw new AppError("Título de livro já cadastrado", 409);
    }

    if (data.cod) {
      data.cod ? null : (data.cod = "");
      const livroExists = await this.repository.findByCod(data.cod);
      if (livroExists) throw new AppError("Código de livro já cadastrado", 409);
    }

    if (data.bookCategoryId) {
      data.bookCategoryId ? null : (data.bookCategoryId = "");
      const bookCategoryIdExists = await this.repository.findBookCategoryById(
        data.bookCategoryId
      );
      if (!bookCategoryIdExists)
        throw new AppError("Categoria de livro não encontrada", 404);
    }

    await this.repository.patch(id, data);
    return { message: "Livro atualizado com sucesso" };
  }

  // delete
  async delete(id: string) {
    const livroExists = await this.repository.findById(id);
    if (!livroExists) throw new AppError("Livro não cadastrado", 404);

    await this.repository.delete(id);
  }
}

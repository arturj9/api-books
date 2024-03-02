import { AppError } from "../errors/AppError";
import { BookRepository } from "repositories/BookRepository";
import { Book, BookCategory, BookUpdate } from "models/Book";

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
    qtd: number,
    idUser: string
  ) {
    const bookCategoryIdExists =
      await this.repository.findBooksCategoriesBySearch(bookCategoryId);
    if (!bookCategoryIdExists)
      throw new AppError("Categoria de livro não encontrada", 404);

    const titleExists = await this.repository.findBySearch(1, 1, title);
    if (titleExists["books"])
      throw new AppError("Título de livro já existe", 409);

    const codExists = await this.repository.findBySearch(1, 1, cod);
    if (codExists["books"])
      throw new AppError("Código de livro já existe", 409);

    await this.repository.save(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd,
      idUser
    );

    return { message: "Livro criado com sucesso" };
  }

  // list
  async list(
    page: number,
    pageSize: number,
    search: string,
    categoryId: string
  ) {
    let books: Book[] = [];
    let totalItems = 0;

    if (categoryId !== "") {
      if (search !== "") {
        const result = await this.repository.findByCategoryAndSearch(
          page,
          pageSize,
          categoryId,
          search
        );
        books = result["books"];
        totalItems = result["totalItems"];
      } else {
        const result = await this.repository.findByCategory(
          page,
          pageSize,
          categoryId
        );
        books = result["books"];
        totalItems = result["totalItems"];
      }
    } else if (search !== "") {
      const result = await this.repository.findBySearch(page, pageSize, search);
      books = result["books"];
      totalItems = result["totalItems"];
    } else {
      const result = await this.repository.find(page, pageSize);
      books = result["books"];
      totalItems = result["totalItems"];
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      books,
      pageInfo: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  }

  // list by user
  async listByUser(
    idUser: string,
    page: number,
    pageSize: number,
    search: string,
    categoryId: string
  ) {
    let books: Book[] = [];
    let totalItems = 0;

    if (categoryId !== "") {
      if (search !== "") {
        const result = await this.repository.findByUserAndCategoryAndSearch(
          page,
          pageSize,
          categoryId,
          search,
          idUser
        );
        books = result["books"];
        totalItems = result["totalItems"];
      } else {
        const result = await this.repository.findByUserAndCategory(
          page,
          pageSize,
          categoryId,
          idUser
        );
        books = result["books"];
        totalItems = result["totalItems"];
      }
    } else if (search !== "") {
      const result = await this.repository.findByUserAndSearch(
        page,
        pageSize,
        search,
        idUser
      );
      books = result["books"];
      totalItems = result["totalItems"];
    } else {
      const result = await this.repository.findByUser(idUser, page, pageSize);
      books = result["books"];
      totalItems = result["totalItems"];
    }

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      books,
      pageInfo: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  }

  // list books categories
  async listBooksCategories(search: string) {
    let booksCategories: BookCategory[] = [];
    if (search !== "") {
      booksCategories = await this.repository.findBooksCategoriesBySearch(search);
    } else {
      booksCategories = await this.repository.findBooksCategories();
    }

    return {
      booksCategories,
    };
  }

  // patch
  async patch(idUser: string, id: string, data: BookUpdate) {
    const livroExists = await this.repository.findBySearch(1, 1, id);
    if (!livroExists["books"]) throw new AppError("Livro não cadastrado", 404);

    if (livroExists["books"][0].idUser != idUser)
      throw new AppError("Não autorizado", 401);

    if (data.title) {
      data.title ? null : (data.title = "");
      const livroExists = await this.repository.findBySearch(1, 1, data.title);
      if (livroExists["books"])
        throw new AppError("Título de livro já cadastrado", 409);
    }

    if (data.cod) {
      data.cod ? null : (data.cod = "");
      const livroExists = await this.repository.findBySearch(1, 1, data.cod);
      if (livroExists["books"])
        throw new AppError("Código de livro já cadastrado", 409);
    }

    if (data.bookCategoryId) {
      data.bookCategoryId ? null : (data.bookCategoryId = "");
      const bookCategoryIdExists =
        await this.repository.findBooksCategoriesBySearch(data.bookCategoryId);
      if (!bookCategoryIdExists)
        throw new AppError("Categoria de livro não encontrada", 404);
    }

    await this.repository.patch(id, data);
    return { message: "Livro atualizado com sucesso" };
  }

  // delete
  async delete(idUser: string, id: string) {
    const livroExists = await this.repository.findBySearch(1, 1, id);
    if (!livroExists["books"]) throw new AppError("Livro não cadastrado", 404);

    if (livroExists["books"][0].idUser != idUser)
      throw new AppError("Não autorizado", 401);

    await this.repository.delete(id);
  }
}

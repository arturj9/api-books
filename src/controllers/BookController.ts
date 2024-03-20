import { Request } from "express";
import { z } from "zod";

import { AppError } from "../errors/AppError";
import { BookService } from "../services/BookService";
import { BookUpdate } from "models/Book";

export class BookController {
  service: BookService;

  constructor(service: BookService) {
    this.service = service;
  }
  // register
  async register(request: Request) {
    const bodySchema = z
      .object({
        title: z.string().min(1),
        cod: z.string().min(1),
        editora: z.string().min(1),
        autor: z.string().min(1),
        sinopse: z.string().min(1),
        bookCategoryId: z.string().min(1),
        qtd: z.number().min(0),
      })
      .strict();

    const { title, cod, editora, autor, sinopse, bookCategoryId, qtd } =
      bodySchema.parse(request.body);

    const { idUser } = request;

    const body = await this.service.register(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd,
      idUser
    );
    return { status: 201, body: body };
  }

  // list
  async list(request: Request) {
    const bodySchema = z
      .object({
        page: z.string().default("1"),
        pageSize: z.string().default("10"),
        search: z.string().default(""),
        categoryId: z.string().default(""),
      })
      .strict();

    let { page, pageSize, search, categoryId } = bodySchema.parse(
      request.query
    );

    const pageNumber = parseInt(page, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageNumber) || pageNumber <= 0)
      throw new AppError(
        "O parâmetro pageSize deve ser um número e maior que 0."
      );

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber) || pageSizeNumber <= 0)
      throw new AppError(
        "O parâmetro pageSize deve ser um número e maior que 0."
      );

    const body = await this.service.list(
      pageNumber,
      pageSizeNumber,
      search,
      categoryId
    );
    return { status: 200, body: body };
  }

  // list by user
  async listByUser(request: Request) {
    const bodySchema = z
      .object({
        page: z.string().default("1"),
        pageSize: z.string().default("10"),
        search: z.string().default(""),
        categoryId: z.string().default(""),
      })
      .strict();

    const { idUser } = request;

    let { page, pageSize, search, categoryId } = bodySchema.parse(
      request.query
    );

    const pageNumber = parseInt(page, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageNumber) || pageNumber <= 0)
      throw new AppError(
        "O parâmetro pageSize deve ser um número e maior que 0."
      );

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber) || pageSizeNumber <= 0)
      throw new AppError(
        "O parâmetro pageSize deve ser um número e maior que 0."
      );

    const body = await this.service.listByUser(
      idUser,
      pageNumber,
      pageSizeNumber,
      search,
      categoryId
    );
    return { status: 200, body: body };
  }

  // list books categories
  async listBooksCategories(request: Request) {
    const bodySchema = z
      .object({
        search: z.string().default(""),
      })
      .strict();

    let { search } = bodySchema.parse(request.query);

    const body = await this.service.listBooksCategories(search);
    return { status: 200, body: body };
  }

  // patch
  async patch(request: Request) {
    const bodySchema = z
      .object({
        title: z.string().nullish(),
        cod: z.string().nullish(),
        editora: z.string().nullish(),
        autor: z.string().nullish(),
        sinopse: z.string().nullish(),
        bookCategoryId: z.string().nullish(),
        qtd: z.number().min(0).nullish(),
      })
      .strict();
    
    const query = z.object({
      id: z.string()
    }).strict()

    
    const { idUser } = request;
    
    const { title, cod, editora, autor, sinopse, bookCategoryId, qtd} =
    bodySchema.parse(request.body);
    
    const {id} = query.parse(request.query)

    if (!id) throw new AppError("id de livro é requerido", 409);

    let data = new BookUpdate(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd
    );

    const body = await this.service.patch(idUser, id, data);
    return { status: 201, body: body };
  }

  // delete
  async delete(request: Request) {
    const bodySchema = z
      .object({
        id: z.string(),
      })
      .strict();

    const { id } = bodySchema.parse(request.query);

    if (!id) throw new AppError("id de livro é requerido", 409);

    const { idUser } = request;

    await this.service.delete(idUser, id);
    return { status: 204, body: null };
  }
}

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

    const body = await this.service.register(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd
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
      })
      .strict();

    let { page, pageSize, search } = bodySchema.parse(request.query);

    const pageNumber = parseInt(page, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageNumber)) new AppError("O parâmetro pageSize deve ser um número.");

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber)) new AppError("O parâmetro pageSize deve ser um número.");

    const body = await this.service.list(pageNumber, pageSizeNumber, search);
    return { status: 200, body: body };
  }

  // list books categories
  async listBooksCategories(request: Request) {
    const bodySchema = z
      .object({
        page: z.string().default("1"),
        pageSize: z.string().default("10"),
        search: z.string().default(""),
      })
      .strict();

    let { page, pageSize, search } = bodySchema.parse(request.query);

    const pageNumber = parseInt(page, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageNumber)) new AppError("O parâmetro pageSize deve ser um número.");

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber)) new AppError("O parâmetro pageSize deve ser um número.");

    const body = await this.service.listBooksCategories(pageNumber, pageSizeNumber, search);
    return { status: 200, body: body };
  }

  // patch
  async patch(request: Request) {
    const bodySchema = z
      .object({
        title: z.string().min(1).nullish(),
        cod: z.string().min(1).nullish(),
        editora: z.string().min(1).nullish(),
        autor: z.string().min(1).nullish(),
        sinopse: z.string().min(1).nullish(),
        bookCategoryId: z.string().min(1).nullish(),
        qtd: z.number().min(0).nullish(),
      })
      .strict();

    const { id } = request.params;

    if (!id) throw new AppError("id de livro é requerido", 409);

    const { title, cod, editora, autor, sinopse, bookCategoryId, qtd } =
      bodySchema.parse(request.body);

    let data = new BookUpdate(
      title,
      cod,
      editora,
      autor,
      sinopse,
      bookCategoryId,
      qtd
    );

    const body = await this.service.patch(id, data);
    return { status: 201, body: body };
  }

  // delete
  async delete(request: Request) {
    const { id } = request.params;

    if (!id) throw new AppError("id de livro é requerido", 409);

    await this.service.delete(id);
    return { status: 204, body: null };
  }
}
import { Request } from "express";
import { z } from "zod";

import { AppError } from "../errors/AppError";
import { BookingService } from "services/BookingService";
import { BookUpdate } from "models/Book";

export class BookingController {
  service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
  }
  // register
  async register(request: Request) {
    const bodySchema = z
      .object({
        bookId: z.string().min(1),
      })
      .strict();

    const { userId } = request;

    const { bookId } = bodySchema.parse(request.body);

    const body = await this.service.register(userId, bookId);
    return { status: 201, body: body };
  }

  // list by user
  async listByUser(request: Request) {
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
    if (isNaN(pageNumber))
      new AppError("O parâmetro pageSize deve ser um número.");

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber))
      new AppError("O parâmetro pageSize deve ser um número.");
    const { userId } = request;
    const body = await this.service.listByUser(userId, pageNumber, pageSizeNumber, search);
    return { status: 200, body: body };
  }
}

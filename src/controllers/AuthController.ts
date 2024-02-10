import { Request } from "express";
import z from "zod";

import { hash } from "bcrypt";
import { AppError } from "../errors/AppError";
import { AuthService } from "../services/AuthService";
import { UserUpdate } from "../models/User";

export class AuthController {
  service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  // login
  async login(request: Request) {
    const bodySchema = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .strict();

    const { email, password } = bodySchema.parse(request.body);

    if (!(email && password))
      throw new AppError("E-mail e senha são requeridos.", 400);

    const body = await this.service.login(email, password);
    return { status: 200, body: body };
  }

  // register
  async register(request: Request) {
    const bodySchema = z
      .object({
        username: z.string().min(1),
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .strict();

    const { username, name, email, password } = bodySchema.parse(request.body);

    const body = await this.service.register(username, name, email, password);
    return { status: 201, body: body };
  }

  // info
  async info(request: Request) {
    const { userId } = request;
    
    const body = await this.service.info(userId);
    return { status: 200, body: body };

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
    if (isNaN(pageNumber) || pageNumber <= 0)
      throw new AppError("O parâmetro pageSize deve ser um número e maior que 0.");

    const pageSizeNumber = parseInt(pageSize, 10);

    // Verifique se a conversão foi bem-sucedida
    if (isNaN(pageSizeNumber) || pageSizeNumber <= 0)
      throw new AppError("O parâmetro pageSize deve ser um número e maior que 0.");

    const body = await this.service.list(pageNumber, pageSizeNumber, search);
    return { status: 200, body: body };

  }

  // patch
  async patch(request: Request) {
    const bodySchema = z
      .object({
        username: z.string().min(1).nullish(),
        name: z.string().min(3).nullish(),
        email: z.string().email().nullish(),
        password: z.string().min(6).nullish(),
      })
      .strict();

    const { userId } = request;
    const { username, name, email, password } = bodySchema.parse(request.body);

    
    let data = new UserUpdate(username, name, email);

    if (password) {
      const password_hash = await hash(password, 6);
      data.setPasswordHash(password_hash);
    }

    const body = await this.service.patch(userId, data);
    return { status: 201, body: body };
  }

  // delete
  async delete(request: Request) {
    const { userId } = request;

    await this.service.delete(userId);
    return {status:204, body:null};
  }
}

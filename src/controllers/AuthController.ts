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

  // verify token
  async verifyToken(request: Request) {
    const bodySchema = z
      .object({
        token: z.string(),
      })
      .strict();

    const { token } = bodySchema.parse(request.query);

    if (await this.service.verifyToken(token)) {
      return { status: 200, body: { tokenIsValid: true } };
    } else {
      return { status: 401, body: { tokenIsValid: false } };
    }
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
    const { idUser } = request;

    const body = await this.service.info(idUser);
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

    const { idUser } = request;
    const { username, name, email, password } = bodySchema.parse(request.body);

    let data = new UserUpdate(username, name, email);

    if (password) {
      const password_hash = await hash(password, 6);
      data.setPasswordHash(password_hash);
    }

    const body = await this.service.patch(idUser, data);
    return { status: 201, body: body };
  }

  // delete
  async delete(request: Request) {
    const { idUser } = request;

    await this.service.delete(idUser);
    return { status: 204, body: null };
  }
}

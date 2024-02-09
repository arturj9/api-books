import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRespository";
import config_values from "../config";
import { UserUpdate } from "../models/User";

export class AuthService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // login
  async login(email: string, password: string) {
    const user = await this.repository.findByEmailWithPassword(email);

    if (!user) throw new AppError("Email ou senha inválidos", 401);

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) throw new AppError("Email ou senha inválidos", 401);

    const token = jwt.sign({}, config_values.jwt_key, {
      subject: user.id,
      expiresIn: "1d",
    });

    return { token: token };
  }

  // register
  async register(
    username: string,
    name: string,
    email: string,
    password: string
  ) {
    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) throw new AppError("Email já cadastrado", 409);

    const userNameExists = await this.repository.findByUserName(username);

    if (userNameExists) throw new AppError("Username já cadastrado", 409);

    const password_hash = await hash(password, 6);

    await this.repository.save(username, name, email, password_hash);

    return { message: "Usuário criado com sucesso" };
  }

  // info
  async info(id: string) {
    const user = await this.repository.findById(id);
    return { user: user };
  }

  // list
  async list(page: number, pageSize: number, search: string) {
    let totalItems = await this.repository.countAll();
    let totalPages = Math.ceil(totalItems / pageSize);
    if (search == "") {
      const users = await this.repository.find(page, pageSize);
      return {
        users: users,
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

    let user = await this.repository.findByUserName(search);
    if (user)
      return {
        user: user,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    user = await this.repository.findByName(search);
    if (user)
      return {
        user: user,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    user = await this.repository.findById(search);
    if (user)
      return {
        user: user,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };

    return { user: {} };
  }

  // patch
  async patch(id: string, data: UserUpdate) {
    if (data.email) {
      data.email ? null : (data.email = "");
      const emailExists = await this.repository.findByEmail(data.email);
      if (emailExists) throw new AppError("Email já cadastrado", 409);
    }

    if (data.username) {
      data.username ? null : (data.username = "");
      const userNameExists = await this.repository.findByUserName(
        data.username
      );
      if (userNameExists) throw new AppError("Username já cadastrado", 409);
    }

    await this.repository.patch(id, data);
    return { message: "Usuário atualizado com sucesso" };
  }

  // delete
  async delete(id: string) {
    await this.repository.delete(id);
  }
}

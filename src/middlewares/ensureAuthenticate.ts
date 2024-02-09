import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

import config_values from "../config";

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token requerido", 401);
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub } = jwt.verify(token, config_values.jwt_key);
    request.userId = sub as string;

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}

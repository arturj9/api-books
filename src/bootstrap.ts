import { UserRepository } from "./repositories/UserRespository.js";
import { BookRepository } from "./repositories/BookRepository.js";
import { BookingRepository } from "repositories/BookingRepository.js";

import { AuthService } from "./services/AuthService.js";
import { BookService } from "./services/BookService.js";
import { BookingService } from "services/BookingService.js";

import { AuthController } from "./controllers/AuthController.js";
import { BookController } from "./controllers/BookController.js";
import { BookingController } from "controllers/BookingController.js";

export const userRepository = new UserRepository();
export const bookRepository = new BookRepository();
export const bookingRepository = new BookingRepository();

export const authService = new AuthService(userRepository);
export const bookService = new BookService(bookRepository);
export const bookingService = new BookingService(bookingRepository, bookRepository);

export const authController = new AuthController(authService);
export const bookController = new BookController(bookService);
export const bookingController = new BookingController(bookingService);


import { AppError } from "../errors/AppError";
import { BookingRepository } from "repositories/BookingRepository";
import { BookRepository } from "repositories/BookRepository";
import { BookUpdate } from "models/Book";

export class BookingService {
  bookingRepository: BookingRepository;
  bookRepository: BookRepository;

  constructor(
    bookingRepository: BookingRepository,
    bookRepository: BookRepository
  ) {
    this.bookingRepository = bookingRepository;
    this.bookRepository = bookRepository;
  }

  // register
  async register(idUser: string, idBook: string) {
    const bookExists = await this.bookRepository.findById(idBook);
    if (!bookExists) throw new AppError("Livro não encontrado", 404);

    await this.bookingRepository.save(idUser, idBook);

    return { message: "Reserva criada com sucesso" };
  }

  // list by user
  async listByUser(
    userId: string,
    page: number,
    pageSize: number,
    search: string
  ) {
    let totalItems = await this.bookingRepository.countAllByUser(userId);
    let totalPages = Math.ceil(totalItems / pageSize);
    if (search == "") {
      const bookings = await this.bookingRepository.findByUser(
        userId,
        page,
        pageSize
      );
      return {
        bookings: bookings,
        pageInfo: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
    }

    let bookings = await this.bookingRepository.findByUserAndBook(
      userId,
      page,
      pageSize,
      search
    );
    if (bookings)
      return {
        bookings: bookings,
        pageInfo: {
          page,
          pageSize,
          totalItems: bookings.length,
          totalPages: Math.ceil(bookings.length / pageSize),
        },
      };

    return { bookings: [] };
  }
}

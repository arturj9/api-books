import { Booking } from "models/Booking";
import { AppError } from "../errors/AppError";
import { prisma } from "../lib/prisma";

export class BookingRepository {
  // save
  async save(idUser: string, idBook: string) {
    const book = await prisma.book.findFirstOrThrow({
      where: { id: idBook },
    });
    if (book.qtd > 0) {
      (await prisma.booking.create({
        data: {
          idUser,
          idBook,
        },
      })) &&
        (await prisma.book.update({
          where: { id: idBook },
          data: { qtd: book.qtd - 1 },
        }));
    } else {
      throw new AppError("Livro indisponível", 400);
    }
  }

  // findByUser
  async findByUser(idUser: string, page: number, pageSize: number) {
    const bookings = await prisma.booking.findMany({
      where: { idUser },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return bookings.length > 0
      ? bookings.map((booking) => new Booking(booking))
      : [];
  }

  // findByUserAndBook
  async findByUserAndBook(
    idUser: string,
    page: number,
    pageSize: number,
    search: string
  ) {
    const bookings = await prisma.booking.findMany({
      where: { idUser },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    let bookingsByBook: Booking[] = [];
    let promises: Promise<void>[] = [];

    for (const booking of bookings) {
      promises.push(
        (async () => {
          const book = await prisma.book.findFirstOrThrow({
            where: { id: booking.idBook },
          });

          if (
            book.id == search ||
            book.title == search ||
            book.cod == search ||
            book.autor == search ||
            book.editora == search
          ) {
            bookingsByBook.push(booking);
          }
        })()
      );
    }

    await Promise.all(promises);

    return bookingsByBook;
  }

  // countAllBookingsByUser
  async countAllByUser(idUser: string) {
    const bookings = await prisma.booking.findMany({
      where: { idUser },
    });

    return bookings.length;
  }
}

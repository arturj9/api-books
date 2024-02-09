export class Booking {
    id: string;
    idUser: string;
    idBook: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(data: Booking) {
      this.id = data.id;
      this.idUser = data.idUser;
      this.idBook = data.idBook;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }
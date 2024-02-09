export class Book {
  id: string;
  title: string;
  cod: string;
  editora: string;
  autor: string;
  sinopse: string;
  bookCategoryId: string;
  qtd: number;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: Book) {
    this.id = data.id;
    this.title = data.title;
    this.cod = data.cod;
    this.editora = data.editora;
    this.autor = data.autor;
    this.sinopse = data.sinopse;
    this.bookCategoryId = data.bookCategoryId;
    this.qtd = data.qtd;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class BookCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: BookCategory) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class BookUpdate {
  title: string | null | undefined;
  cod: string | null | undefined;
  editora: string | null | undefined;
  autor: string | null | undefined;
  sinopse: string | null | undefined;
  bookCategoryId: string | null | undefined;
  qtd: number | null | undefined;
  constructor(
    title: string | null | undefined,
    cod: string | null | undefined,
    editora: string | null | undefined,
    autor: string | null | undefined,
    sinopse: string | null | undefined,
    bookCategoryId: string | null | undefined,
    qtd: number | null | undefined
  ) {
    title ? (this.title = title) : null;
    cod ? (this.cod = cod) : null;
    editora ? (this.editora = editora) : null;
    autor ? (this.autor = autor) : null;
    sinopse ? (this.sinopse = sinopse) : null;
    bookCategoryId ? (this.bookCategoryId = bookCategoryId) : null;
    qtd ? (this.title = title) : null;
  }
}

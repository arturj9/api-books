export class User {
  id: string;
  username: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: User) {
    this.id = data.id;
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class UserUpdate {
  username: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  password_hash: string | null | undefined;
  constructor(
    username: string | null | undefined,
    name: string | null | undefined,
    email: string | null | undefined
  ) {
    username ? this.username = username: null;
    name ? this.name = name : null;
    email ? this.email = email : null;
  }
  setPasswordHash(password_hash: string) {
    password_hash ? this.password_hash = password_hash : null;
  }
}

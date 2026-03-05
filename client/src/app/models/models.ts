export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Book {
  id?: number;
  title: string;
  description: string;
  publishYear: number;
  author: string;
  genre: string;
  price: number;
  createdAt?: Date;
}

export interface Catalog {
  id?: number;
  bookId: number;
  title: string;
  genre: string;
  quantity: number;
  userId?: number;
}

export interface CheckOut {
  bookId: number | null;
  title: string;
  genre: string;
  requestedQuantity: number;
  userId: number | null;
  issuedAt?: Date;
}

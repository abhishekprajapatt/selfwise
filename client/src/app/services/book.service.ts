import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  createBook(book: Book, userId: number): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/create/${userId}`, book);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getAllBooks`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/getBooksById/${bookId}`);
  }

  updateBook(bookId: number, book: Book, userId: number): Observable<Book> {
    return this.http.put<Book>(
      `${this.apiUrl}/updateBookById/bookId/${bookId}/userId/${userId}`,
      book,
    );
  }

  deleteBook(bookId: number, userId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.apiUrl}/deleteBookById/bookId/${bookId}/userId/${userId}`,
    );
  }

  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchBookByGenre/${genre}`);
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchBookByTitle/${title}`);
  }

  getBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchBookByAuthor/${author}`);
  }

  getBooksByYear(year: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/getBooksPublishedIn/${year}`);
  }

  getBooksByYearRange(year1: number, year2: number): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.apiUrl}/getBooksPublished/${year1}/to/${year2}`,
    );
  }

  getAllBooksByGenre(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groupBooksByGenre`);
  }
}

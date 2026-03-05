import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckOut } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/checkOut';

  constructor(private http: HttpClient) {}

  issueBook(
    userId: number,
    bookId: number,
    quantity: number,
  ): Observable<CheckOut> {
    return this.http.post<CheckOut>(
      `${this.apiUrl}/issue/userId/${userId}/bookId/${bookId}/reqQuantity/${quantity}`,
      {},
    );
  }

  getAllIssuedBooks(): Observable<CheckOut[]> {
    return this.http.get<CheckOut[]>(`${this.apiUrl}/getAllIssuedBook`);
  }

  getUserIssuedBooks(userId: number): Observable<CheckOut[]> {
    return this.http.get<CheckOut[]>(
      `${this.apiUrl}/issuedBooks/user/${userId}`,
    );
  }

  getBookIssuedByAnyone(bookId: number): Observable<CheckOut[]> {
    return this.http.get<CheckOut[]>(`${this.apiUrl}/isIssuedBook/${bookId}`);
  }

  returnBook(userId: number, bookId: number): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/returnBook/userId/${userId}/bookId/${bookId}`,
      {},
    );
  }
}

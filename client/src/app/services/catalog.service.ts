import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = `${environment.apiBaseUrl}/catalog`;

  constructor(private http: HttpClient) {}

  addBooks(catalog: Catalog, userId: number): Observable<Catalog> {
    return this.http.post<Catalog>(
      `${this.apiUrl}/add/userId/${userId}`,
      catalog,
    );
  }

  getAllCatalog(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/getAll`);
  }

  getCatalogById(catalogId: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/getCatalogById/${catalogId}`);
  }

  reduceBookQuantity(
    bookId: number,
    quantity: number,
    userId: number,
  ): Observable<Catalog> {
    return this.http.put<Catalog>(
      `${this.apiUrl}/reduceQuantity/bookId/${bookId}/quantity/${quantity}/userId/${userId}`,
      {},
    );
  }
}

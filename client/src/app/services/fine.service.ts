import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  private apiUrl = `${environment.apiBaseUrl}/fines`;

  constructor(private http: HttpClient) {}

  createFine(fine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, fine);
  }

  getAllFines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getFineById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getFinesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPendingFines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  getOverdueFines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/overdue`);
  }

  updateFineStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, {
      params: { status },
    });
  }

  deleteFine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

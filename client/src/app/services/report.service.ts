import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = `${environment.apiBaseUrl}/reports`;

  constructor(private http: HttpClient) {}

  generateReport(report: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, report);
  }

  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getReportById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getReportsByType(reportType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type/${reportType}`);
  }

  getReportsByDateRange(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/range`, {
      params: { startDate, endDate },
    });
  }

  getReportsByTypeAndDateRange(
    reportType: string,
    startDate: string,
    endDate: string,
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type-range`, {
      params: { reportType, startDate, endDate },
    });
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

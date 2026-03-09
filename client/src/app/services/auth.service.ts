import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  userId: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
  token: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  adminCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.storeUserData(response);
          this.currentUserSubject.next(response);
        }),
      );
  }

  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signup`, signupRequest)
      .pipe(
        tap((response) => {
          this.storeUserData(response);
          this.currentUserSubject.next(response);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isAdmin(): boolean {
    const userData = this.getUserFromStorage();
    return userData && userData.role === 'ADMIN';
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): any {
    return this.getUserFromStorage();
  }

  private storeUserData(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem(
      'user_data',
      JSON.stringify({
        userId: response.userId,
        username: response.username,
        email: response.email,
        role: response.role,
      }),
    );
  }

  private getUserFromStorage(): any {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
}

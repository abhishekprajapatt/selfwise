import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserById/${userId}`);
  }

  updateUserInfo(userId: number, user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${userId}`, user);
  }

  updateRole(userId: number, role: string): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/update/role/${role}/${userId}`,
      {},
    );
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/deleteUserById/${userId}`);
  }
}

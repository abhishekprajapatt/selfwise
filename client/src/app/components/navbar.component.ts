import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span>SelfWise</span>
        </div>

        <!-- Show menu items only when logged in -->
        <div *ngIf="isLoggedIn" class="nav-middle">
          <ul class="nav-menu">
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/users">Users</a></li>
            <li><a routerLink="/books">Books</a></li>
            <li><a routerLink="/catalog">Catalog</a></li>
            <li><a routerLink="/checkout">Checkout</a></li>
            <li><a routerLink="/reports">Reports</a></li>
            <li><a routerLink="/fines">Fines</a></li>
          </ul>
        </div>

        <!-- Right side: User info and auth buttons -->
        <div class="nav-right">
          <div *ngIf="isLoggedIn" class="user-info">
            <span class="username">{{ currentUser?.username }}</span>
            <span
              class="role"
              [ngClass]="{
                'role-admin': currentUser?.role === 'ADMIN',
                'role-user': currentUser?.role === 'USER',
              }"
            >
              {{ currentUser?.role }}
            </span>
            <button class="btn-logout" (click)="logout()">Logout</button>
          </div>
          <div *ngIf="!isLoggedIn" class="auth-buttons">
            <a routerLink="/login" class="btn-link">Login</a>
            <a routerLink="/signup" class="btn-signup-link">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background: #000;
        padding: 16px 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        gap: 20px;
      }
      .logo {
        color: white;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      .nav-middle {
        flex: 1;
        display: flex;
        justify-content: center;
      }
      .nav-menu {
        display: flex;
        list-style: none;
        gap: 35px;
        margin: 0;
        padding: 0;
      }
      .nav-menu li {
        position: relative;
      }
      .nav-menu a {
        color: #ccc;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        font-size: 14px;
        letter-spacing: 0.3px;
        display: inline-block;
      }
      .nav-menu a:hover {
        color: white;
      }
      .nav-menu a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s ease;
      }
      .nav-menu a:hover::after {
        width: 100%;
      }
      .nav-right {
        display: flex;
        align-items: center;
        gap: 20px;
        white-space: nowrap;
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #ccc;
        font-size: 13px;
      }
      .username {
        color: white;
        font-weight: 600;
      }
      .role {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }
      .role-admin {
        background-color: #d32f2f;
        color: white;
      }
      .role-user {
        background-color: #555;
        color: white;
      }
      .btn-logout {
        padding: 6px 14px;
        background-color: #333;
        color: white;
        border: 1px solid #555;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s;
      }
      .btn-logout:hover {
        background-color: #555;
        border-color: #777;
      }
      .auth-buttons {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .btn-link {
        color: #ccc;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
        font-size: 14px;
      }
      .btn-link:hover {
        color: white;
      }
      .btn-signup-link {
        padding: 8px 16px;
        background-color: #000;
        color: white;
        border: 1px solid white;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
        font-size: 13px;
        display: inline-block;
      }
      .btn-signup-link:hover {
        background-color: white;
        color: #000;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: any = null;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();

    // Subscribe to auth state changes
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
        this.isLoggedIn = !!user;
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

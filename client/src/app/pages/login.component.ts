import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login to SelfWise</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="Enter your email"
              class="form-control"
            />
            <div
              *ngIf="
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
              class="error-message"
            >
              Please enter a valid email
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Enter your password"
              class="form-control"
            />
            <div
              *ngIf="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
              class="error-message"
            >
              Password is required
            </div>
          </div>

          <div *ngIf="errorMessage" class="error-alert">{{ errorMessage }}</div>
          <div *ngIf="successMessage" class="success-alert">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            class="btn-login"
            [disabled]="!loginForm.valid || isLoading"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="signup-link">
          <p>Don't have an account? <a routerLink="/signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      }

      .login-card {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        text-align: center;
        color: #000;
        margin-bottom: 30px;
        font-size: 24px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        color: #333;
        font-weight: 500;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
        transition: border-color 0.3s;
      }

      .form-control:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      }

      .error-message {
        color: #d32f2f;
        font-size: 12px;
        margin-top: 5px;
      }

      .error-alert {
        background-color: #ffebee;
        border: 1px solid #d32f2f;
        color: #d32f2f;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .success-alert {
        background-color: #e8f5e9;
        border: 1px solid #388e3c;
        color: #388e3c;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .btn-login {
        width: 100%;
        padding: 12px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-weight: 600;
      }

      .btn-login:hover:not(:disabled) {
        background-color: #333;
      }

      .btn-login:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .signup-link {
        text-align: center;
        margin-top: 20px;
        color: #666;
        font-size: 14px;
      }

      .signup-link a {
        color: #000;
        text-decoration: none;
        font-weight: 600;
      }

      .signup-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Login failed. Please try again.';
        },
      });
    }
  }
}

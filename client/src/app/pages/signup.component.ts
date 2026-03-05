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
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="signup-container">
      <div class="signup-card">
        <h2>Create SelfWise Account</h2>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              placeholder="Choose a username"
              class="form-control"
            />
            <div
              *ngIf="
                signupForm.get('username')?.invalid &&
                signupForm.get('username')?.touched
              "
              class="error-message"
            >
              <span *ngIf="signupForm.get('username')?.errors?.['required']"
                >Username is required</span
              >
              <span *ngIf="signupForm.get('username')?.errors?.['minlength']"
                >Username must be at least 3 characters</span
              >
            </div>
          </div>

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
                signupForm.get('email')?.invalid &&
                signupForm.get('email')?.touched
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
              placeholder="Enter a password (6-15 characters)"
              class="form-control"
            />
            <div
              *ngIf="
                signupForm.get('password')?.invalid &&
                signupForm.get('password')?.touched
              "
              class="error-message"
            >
              <span *ngIf="signupForm.get('password')?.errors?.['required']"
                >Password is required</span
              >
              <span *ngIf="signupForm.get('password')?.errors?.['minlength']"
                >Password must be at least 6 characters</span
              >
              <span *ngIf="signupForm.get('password')?.errors?.['maxlength']"
                >Password must be at most 15 characters</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="adminCode">Admin Code (Optional)</label>
            <input
              type="password"
              id="adminCode"
              formControlName="adminCode"
              placeholder="Enter admin code to register as admin"
              class="form-control"
            />
            <small class="hint-text"
              >Leave empty to register as a regular user</small
            >
          </div>

          <div *ngIf="errorMessage" class="error-alert">{{ errorMessage }}</div>
          <div *ngIf="successMessage" class="success-alert">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            class="btn-signup"
            [disabled]="!signupForm.valid || isLoading"
          >
            {{ isLoading ? 'Creating account...' : 'Sign Up' }}
          </button>
        </form>

        <div class="login-link">
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .signup-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      }

      .signup-card {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 450px;
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

      .hint-text {
        display: block;
        color: #999;
        font-size: 12px;
        margin-top: 5px;
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

      .btn-signup {
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

      .btn-signup:hover:not(:disabled) {
        background-color: #333;
      }

      .btn-signup:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      .login-link {
        text-align: center;
        margin-top: 20px;
        color: #666;
        font-size: 14px;
      }

      .login-link a {
        color: #000;
        text-decoration: none;
        font-weight: 600;
      }

      .login-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      adminCode: [''],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          const role =
            response.role === 'ADMIN' ? 'admin account' : 'user account';
          this.successMessage = `Account created successfully as ${role}! Redirecting...`;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || 'Signup failed. Please try again.';
        },
      });
    }
  }
}

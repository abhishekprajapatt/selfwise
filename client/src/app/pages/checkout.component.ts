import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CheckOut, Book, User } from '../models/models';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="container">
      <div class="header">
        <h2>Book CheckOut Management</h2>
        <button class="btn-primary" (click)="toggleIssueForm()">
          + Issue Book
        </button>
      </div>

      <div *ngIf="showIssueForm" class="form-container">
        <h3>Issue Book to User</h3>
        <form (ngSubmit)="issueBook()">
          <select
            [(ngModel)]="issueData.userId"
            name="userId"
            required
            [compareWith]="compareFn"
          >
            <option [value]="null">Select User</option>
            <option *ngFor="let user of users" [ngValue]="user.id">
              {{ user.username }} - {{ user.email }}
            </option>
          </select>
          <select
            [(ngModel)]="issueData.bookId"
            name="bookId"
            required
            [compareWith]="compareFn"
          >
            <option [value]="null">Select Book</option>
            <option *ngFor="let book of books" [ngValue]="book.id">
              {{ book.title }} - {{ book.author }}
            </option>
          </select>
          <input
            type="number"
            placeholder="Quantity"
            [(ngModel)]="issueData.requestedQuantity"
            name="quantity"
            min="1"
            required
          />
          <button type="submit" class="btn-primary">Issue Book</button>
          <button
            type="button"
            class="btn-secondary"
            (click)="toggleIssueForm()"
          >
            Cancel
          </button>
        </form>
      </div>

      <div class="tabs">
        <button
          [class.active]="activeTab === 'all'"
          (click)="activeTab = 'all'; loadAllIssued()"
        >
          All Issued Books
        </button>
        <button
          [class.active]="activeTab === 'user'"
          (click)="activeTab = 'user'; toggleUserFilter()"
        >
          User's Books
        </button>
      </div>

      <div
        *ngIf="activeTab === 'user' && showUserFilter"
        class="filter-container"
      >
        <select
          [(ngModel)]="selectedUserId"
          (change)="loadUserIssued()"
          [compareWith]="compareFn"
        >
          <option [value]="null">Select User to view their issued books</option>
          <option *ngFor="let user of users" [ngValue]="user.id">
            {{ user.username }}
          </option>
        </select>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>User ID</th>
              <th>Issued At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of checkouts">
              <td>{{ item.bookId }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.genre }}</td>
              <td>{{ item.requestedQuantity }}</td>
              <td>{{ item.userId }}</td>
              <td>{{ item.issuedAt | date: 'short' }}</td>
              <td>
                <button
                  class="btn-return"
                  [disabled]="!item.userId || !item.bookId"
                  (click)="returnBook(item.userId!, item.bookId!)"
                >
                  Return
                </button>
              </td>
            </tr>
            <tr *ngIf="checkouts.length === 0">
              <td colspan="7" style="text-align: center; color: #999;">
                No checkouts found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        background: #fff;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #f0f0f0;
      }
      .header h2 {
        margin: 0;
        color: #000;
        font-size: 32px;
        font-weight: 700;
      }
      .form-container {
        background: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        margin-bottom: 40px;
        border: 1px solid #f0f0f0;
      }
      .form-container h3 {
        margin: 0 0 25px 0;
        font-size: 24px;
        color: #000;
        font-weight: 600;
      }
      .form-container form {
        display: grid;
        gap: 18px;
      }
      input,
      select {
        padding: 12px 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
        background: #fff;
        color: #333;
        transition: all 0.2s ease;
      }
      input::placeholder {
        color: #999;
      }
      input:focus,
      select:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
      }
      .btn-primary {
        background: #000;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
        font-size: 14px;
        letter-spacing: 0.5px;
      }
      .btn-primary:hover {
        background: #222;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .btn-primary:active {
        transform: scale(0.98);
      }
      .btn-secondary {
        background: #e8e8e8;
        color: #000;
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      .btn-secondary:hover {
        background: #d0d0d0;
      }
      .btn-return {
        padding: 8px 14px;
        background: #000;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      .btn-return:hover {
        background: #222;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .tabs {
        display: flex;
        gap: 0;
        margin-bottom: 30px;
        border-bottom: 2px solid #f0f0f0;
      }
      .tabs button {
        background: none;
        border: none;
        padding: 14px 24px;
        cursor: pointer;
        font-weight: 600;
        color: #888;
        border-bottom: 3px solid transparent;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      .tabs button:hover {
        color: #000;
      }
      .tabs button.active {
        color: #000;
        border-bottom-color: #000;
      }
      .filter-container {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid #f0f0f0;
      }
      .filter-container select {
        width: 100%;
        max-width: 400px;
      }
      .table-container {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        overflow-x: auto;
        border: 1px solid #f0f0f0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 16px 14px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
      }
      th {
        background: #f8f8f8;
        font-weight: 600;
        color: #000;
        font-size: 13px;
        letter-spacing: 0.5px;
      }
      td {
        font-size: 14px;
        color: #333;
      }
      tr:hover {
        background: #f9f9f9;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  checkouts: CheckOut[] = [];
  users: User[] = [];
  books: Book[] = [];
  activeTab: string = 'all';
  showIssueForm = false;
  showUserFilter = false;
  selectedUserId: any = null;
  currentUserId: number = 0;
  issueData: CheckOut = {
    bookId: null,
    title: '',
    genre: '',
    requestedQuantity: 1,
    userId: null,
  };

  constructor(
    private checkoutService: CheckoutService,
    private bookService: BookService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  compareFn(a: any, b: any) {
    return a === b;
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.userId;
      this.issueData.userId = currentUser.userId;
    }
    this.loadAllIssued();
    this.loadBooks();
    this.loadUsers();
  }

  loadAllIssued() {
    this.checkoutService.getAllIssuedBooks().subscribe({
      next: (data) => {
        this.checkouts = data;
      },
      error: (error) => alert('Error loading checkouts: ' + error.message),
    });
  }

  loadUserIssued() {
    if (this.selectedUserId) {
      this.checkoutService.getUserIssuedBooks(this.selectedUserId).subscribe({
        next: (data) => {
          this.checkouts = data;
        },
        error: (error) =>
          alert('Error loading user checkouts: ' + error.message),
      });
    }
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => alert('Error loading books: ' + error.message),
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => alert('Error loading users: ' + error.message),
    });
  }

  issueBook() {
    if (!this.issueData.userId || !this.issueData.bookId) {
      alert('Please select both user and book');
      return;
    }
    this.checkoutService
      .issueBook(
        this.issueData.userId,
        this.issueData.bookId,
        this.issueData.requestedQuantity,
      )
      .subscribe({
        next: () => {
          this.loadAllIssued();
          this.issueData = {
            bookId: null,
            title: '',
            genre: '',
            requestedQuantity: 1,
            userId: null,
          };
          this.showIssueForm = false;
          alert('Book issued successfully');
        },
        error: (error) => alert('Error issuing book: ' + error.message),
      });
  }

  returnBook(userId: number, bookId: number) {
    if (confirm('Are you sure you want to return this book?')) {
      this.checkoutService.returnBook(userId, bookId).subscribe({
        next: () => {
          this.loadAllIssued();
          alert('Book returned successfully');
        },
        error: (error) => alert('Error returning book: ' + error.message),
      });
    }
  }

  toggleIssueForm() {
    this.showIssueForm = !this.showIssueForm;
  }

  toggleUserFilter() {
    this.showUserFilter = !this.showUserFilter;
  }
}

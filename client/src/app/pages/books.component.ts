import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Book } from '../models/models';

@Component({
  selector: 'app-books',
  template: `
    <div class="container">
      <div class="header">
        <h2>Book Management</h2>
        <button class="btn-primary" (click)="toggleAddForm()" *ngIf="isAdmin">
          + Add Book
        </button>
        <p *ngIf="!isAdmin" class="warning-text">
          You need admin access to add/edit/delete books
        </p>
      </div>

      <div class="search-container">
        <div class="search-group">
          <input
            type="text"
            placeholder="Search by Title"
            [(ngModel)]="searchTitle"
            (ngModelChange)="searchByTitle()"
            name="title"
          />
        </div>
        <div class="search-group">
          <input
            type="text"
            placeholder="Search by Author"
            [(ngModel)]="searchAuthor"
            (ngModelChange)="searchByAuthor()"
            name="author"
          />
        </div>
        <div class="search-group">
          <input
            type="text"
            placeholder="Search by Genre"
            [(ngModel)]="searchGenre"
            (ngModelChange)="searchByGenre()"
            name="genre"
          />
        </div>
        <div class="search-group">
          <input
            type="number"
            placeholder="Search by Year"
            [(ngModel)]="searchYear"
            (ngModelChange)="searchByYear()"
            name="year"
          />
        </div>
        <button class="btn-reset" (click)="resetSearch()">Reset</button>
      </div>

      <div *ngIf="showAddForm" class="form-container">
        <h3>Add New Book</h3>
        <form (ngSubmit)="addBook()">
          <input
            type="text"
            placeholder="Title"
            [(ngModel)]="newBook.title"
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Description"
            [(ngModel)]="newBook.description"
            name="description"
            required
          />
          <input
            type="text"
            placeholder="Author"
            [(ngModel)]="newBook.author"
            name="author"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            [(ngModel)]="newBook.genre"
            name="genre"
            required
          />
          <input
            type="number"
            placeholder="Publish Year"
            [(ngModel)]="newBook.publishYear"
            name="publishYear"
            required
          />
          <input
            type="number"
            placeholder="Price"
            [(ngModel)]="newBook.price"
            name="price"
            step="0.01"
            required
          />
          <button type="submit" class="btn-primary">Add</button>
          <button type="button" class="btn-secondary" (click)="toggleAddForm()">
            Cancel
          </button>
        </form>
      </div>

      <div *ngIf="showEditForm" class="form-container">
        <h3>Edit Book</h3>
        <form (ngSubmit)="updateBook()">
          <input
            type="text"
            placeholder="Title"
            [(ngModel)]="selectedBook.title"
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Description"
            [(ngModel)]="selectedBook.description"
            name="description"
            required
          />
          <input
            type="text"
            placeholder="Author"
            [(ngModel)]="selectedBook.author"
            name="author"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            [(ngModel)]="selectedBook.genre"
            name="genre"
            required
          />
          <input
            type="number"
            placeholder="Publish Year"
            [(ngModel)]="selectedBook.publishYear"
            name="publishYear"
            required
          />
          <input
            type="number"
            placeholder="Price"
            [(ngModel)]="selectedBook.price"
            name="price"
            step="0.01"
            required
          />
          <button type="submit" class="btn-primary">Update</button>
          <button
            type="button"
            class="btn-secondary"
            (click)="toggleEditForm()"
          >
            Cancel
          </button>
        </form>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let book of books">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.genre }}</td>
              <td>{{ book.publishYear }}</td>
              <td>\${{ book.price }}</td>
              <td>
                <button
                  class="btn-edit"
                  (click)="openEditForm(book)"
                  *ngIf="isAdmin"
                >
                  Edit
                </button>
                <button
                  class="btn-delete"
                  (click)="deleteBook(book.id!)"
                  *ngIf="isAdmin"
                >
                  Delete
                </button>
                <span *ngIf="!isAdmin" class="no-action"
                  >No actions available</span
                >
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
      .warning-text {
        margin: 0;
        color: #d32f2f;
        font-size: 14px;
        font-weight: 500;
      }
      .search-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-bottom: 40px;
        background: #fff;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid #f0f0f0;
      }
      .search-group {
        display: flex;
        gap: 0;
      }
      .search-group input {
        flex: 1;
        padding: 12px 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        background: #fff;
        color: #333;
        transition: all 0.2s ease;
      }
      .search-group input::placeholder {
        color: #999;
      }
      .search-group input:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
      }
      .btn-reset {
        padding: 12px 20px;
        background: #000;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
        font-size: 14px;
        letter-spacing: 0.5px;
      }
      .btn-reset:hover {
        background: #222;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
        grid-column: 1 / -1;
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
      .btn-edit,
      .btn-delete {
        padding: 8px 14px;
        margin: 0 6px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s ease;
      }
      .btn-edit {
        background: #000;
        color: white;
      }
      .btn-edit:hover {
        background: #222;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .btn-delete {
        background: #e8e8e8;
        color: #000;
      }
      .btn-delete:hover {
        background: #d0d0d0;
      }
      .no-action {
        color: #999;
        font-size: 13px;
        font-weight: 600;
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
export class BooksComponent implements OnInit {
  books: Book[] = [];
  currentUserId: number = 0;
  isAdmin: boolean = false;
  newBook: Book = {
    title: '',
    description: '',
    author: '',
    genre: '',
    publishYear: 0,
    price: 0,
  };
  selectedBook: Book = {
    title: '',
    description: '',
    author: '',
    genre: '',
    publishYear: 0,
    price: 0,
  };
  searchTitle = '';
  searchAuthor = '';
  searchGenre = '';
  searchYear: number | null = null;
  showAddForm = false;
  showEditForm = false;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.userId;
      this.isAdmin = currentUser.role === 'ADMIN';
    }
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => alert('Error loading books: ' + error.message),
    });
  }

  addBook() {
    this.bookService.createBook(this.newBook, this.currentUserId).subscribe({
      next: () => {
        this.loadBooks();
        this.newBook = {
          title: '',
          description: '',
          author: '',
          genre: '',
          publishYear: 0,
          price: 0,
        };
        this.showAddForm = false;
        alert('Book added successfully');
      },
      error: (error) => alert('Error adding book: ' + error.message),
    });
  }

  openEditForm(book: Book) {
    this.selectedBook = { ...book };
    this.showEditForm = true;
  }

  updateBook() {
    this.bookService
      .updateBook(this.selectedBook.id!, this.selectedBook, this.currentUserId)
      .subscribe({
        next: () => {
          this.loadBooks();
          this.showEditForm = false;
          alert('Book updated successfully');
        },
        error: (error) => alert('Error updating book: ' + error.message),
      });
  }

  deleteBook(bookId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId, this.currentUserId).subscribe({
        next: () => {
          this.loadBooks();
          alert('Book deleted successfully');
        },
        error: (error) => alert('Error deleting book: ' + error.message),
      });
    }
  }

  searchByTitle() {
    if (this.searchTitle.trim()) {
      this.bookService.getBooksByTitle(this.searchTitle).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (error) => alert('Error searching books: ' + error.message),
      });
    }
  }

  searchByAuthor() {
    if (this.searchAuthor.trim()) {
      this.bookService.getBooksByAuthor(this.searchAuthor).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (error) => alert('Error searching books: ' + error.message),
      });
    }
  }

  searchByGenre() {
    if (this.searchGenre.trim()) {
      this.bookService.getBooksByGenre(this.searchGenre).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (error) => alert('Error searching books: ' + error.message),
      });
    }
  }

  searchByYear() {
    if (this.searchYear) {
      this.bookService.getBooksByYear(this.searchYear).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (error) => alert('Error searching books: ' + error.message),
      });
    }
  }

  resetSearch() {
    this.searchTitle = '';
    this.searchAuthor = '';
    this.searchGenre = '';
    this.searchYear = null;
    this.loadBooks();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
}

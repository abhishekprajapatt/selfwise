import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { BookService } from '../services/book.service';
import { Catalog, Book } from '../models/models';

@Component({
  selector: 'app-catalog',
  template: `
    <div class="container">
      <div class="header">
        <h2>Catalog Management</h2>
        <button class="btn-primary" (click)="toggleAddForm()">
          + Add to Catalog
        </button>
      </div>

      <div *ngIf="showAddForm" class="form-container">
        <h3>Add Books to Catalog</h3>
        <form (ngSubmit)="addToCatalog()">
          <select [(ngModel)]="newCatalog.bookId" name="bookId" required>
            <option value="">Select Book</option>
            <option *ngFor="let book of availableBooks" [value]="book.id">
              {{ book.title }} - {{ book.author }}
            </option>
          </select>
          <input
            type="number"
            placeholder="Quantity"
            [(ngModel)]="newCatalog.quantity"
            name="quantity"
            min="1"
            required
          />
          <button type="submit" class="btn-primary">Add</button>
          <button type="button" class="btn-secondary" (click)="toggleAddForm()">
            Cancel
          </button>
        </form>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Catalog ID</th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of catalog">
              <td>{{ item.id }}</td>
              <td>{{ item.bookId }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.genre }}</td>
              <td>
                <input
                  type="number"
                  [(ngModel)]="item.quantity"
                  (change)="updateQuantity(item)"
                  min="0"
                  class="qty-input"
                />
              </td>
              <td>
                <button class="btn-update" (click)="saveQuantity(item)">
                  Save
                </button>
              </td>
            </tr>
            <tr *ngIf="catalog.length === 0">
              <td colspan="6" style="text-align: center; color: #999;">
                No catalog items found
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
      .btn-update {
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
      .btn-update:hover {
        background: #222;
      }
      .qty-input {
        width: 100px;
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }
      .qty-input:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
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
export class CatalogComponent implements OnInit {
  catalog: Catalog[] = [];
  availableBooks: Book[] = [];
  newCatalog: Catalog = { bookId: 0, title: '', genre: '', quantity: 1 };
  showAddForm = false;

  constructor(
    private catalogService: CatalogService,
    private bookService: BookService,
  ) {}

  ngOnInit() {
    this.loadCatalog();
    this.loadAvailableBooks();
  }

  loadCatalog() {
    this.catalogService.getAllCatalog().subscribe({
      next: (data) => {
        this.catalog = data;
      },
      error: (error) => alert('Error loading catalog: ' + error.message),
    });
  }

  loadAvailableBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.availableBooks = data;
      },
      error: (error) => alert('Error loading books: ' + error.message),
    });
  }

  addToCatalog() {
    this.catalogService.addBooks(this.newCatalog, 1).subscribe({
      next: () => {
        this.loadCatalog();
        this.newCatalog = { bookId: 0, title: '', genre: '', quantity: 1 };
        this.showAddForm = false;
        alert('Book added to catalog successfully');
      },
      error: (error) => alert('Error adding to catalog: ' + error.message),
    });
  }

  updateQuantity(item: Catalog) {}

  saveQuantity(item: Catalog) {
    this.catalogService
      .reduceBookQuantity(item.bookId, item.quantity, 1)
      .subscribe({
        next: () => {
          alert('Quantity updated successfully');
        },
        error: (error) => alert('Error updating quantity: ' + error.message),
      });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FineService } from '../services/fine.service';

@Component({
  selector: 'app-fines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fines-container">
      <div class="page-header">
        <h1>Fine Management</h1>
        <p class="subtitle">Track and manage library book fines</p>
      </div>

      <div class="content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Fines</h3>
            <div class="stat-value">{{ allFines.length }}</div>
          </div>
          <div class="stat-card pending">
            <h3>Pending</h3>
            <div class="stat-value">{{ pendingFines.length }}</div>
          </div>
          <div class="stat-card overdue">
            <h3>Overdue</h3>
            <div class="stat-value">{{ overdueFines.length }}</div>
          </div>
          <div class="stat-card paid">
            <h3>Paid</h3>
            <div class="stat-value">{{ paidFines }}</div>
          </div>
        </div>

        <!-- Add Fine Form -->
        <div class="form-section">
          <h2>Add New Fine</h2>
          <form (ngSubmit)="addFine()" class="fine-form">
            <div class="form-group">
              <label>User ID</label>
              <input
                type="number"
                [(ngModel)]="newFine.userId"
                name="userId"
                required
              />
            </div>
            <div class="form-group">
              <label>Checkout ID</label>
              <input
                type="number"
                [(ngModel)]="newFine.checkoutId"
                name="checkoutId"
                required
              />
            </div>
            <div class="form-group">
              <label>Amount</label>
              <input
                type="number"
                [(ngModel)]="newFine.amount"
                name="amount"
                step="0.01"
                required
              />
            </div>
            <div class="form-group">
              <label>Due Date</label>
              <input
                type="date"
                [(ngModel)]="newFine.dueDate"
                name="dueDate"
                required
              />
            </div>
            <button type="submit" class="btn-submit">Add Fine</button>
          </form>
        </div>

        <!-- Filters -->
        <div class="filters">
          <button
            [class.active]="filterType === 'all'"
            (click)="filterType = 'all'; loadFines()"
          >
            All Fines
          </button>
          <button
            [class.active]="filterType === 'pending'"
            (click)="filterType = 'pending'; loadPendingFines()"
          >
            Pending
          </button>
          <button
            [class.active]="filterType === 'overdue'"
            (click)="filterType = 'overdue'; loadOverdueFines()"
          >
            Overdue
          </button>
        </div>

        <!-- Fines Table -->
        <div class="table-section">
          <table class="fines-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Checkout ID</th>
                <th>Amount</th>
                <th>Created Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let fine of displayedFines">
                <td>{{ fine.id }}</td>
                <td>{{ fine.userId }}</td>
                <td>{{ fine.checkoutId }}</td>
                <td class="amount">{{ fine.amount | currency }}</td>
                <td>{{ fine.createdDate }}</td>
                <td>{{ fine.dueDate }}</td>
                <td>
                  <span class="status" [ngClass]="fine.status.toLowerCase()">
                    {{ fine.status }}
                  </span>
                </td>
                <td class="actions">
                  <button
                    *ngIf="fine.status === 'PENDING'"
                    (click)="markAsPaid(fine.id)"
                    class="btn-paid"
                  >
                    Pay
                  </button>
                  <button (click)="deleteFine(fine.id)" class="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .fines-container {
        padding: 40px 20px;
        max-width: 1200px;
        margin: 0 auto;
        background: #f9f9f9;
        min-height: 100vh;
      }

      .page-header {
        text-align: center;
        margin-bottom: 40px;
      }

      .page-header h1 {
        font-size: 36px;
        color: #000;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        color: #888;
        font-size: 16px;
        margin: 0;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .stat-card {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        border-left: 4px solid #000;
      }

      .stat-card h3 {
        color: #666;
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 15px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #000;
      }

      .stat-card.pending {
        border-left-color: #ffc107;
      }

      .stat-card.overdue {
        border-left-color: #dc3545;
      }

      .stat-card.paid {
        border-left-color: #28a745;
      }

      .form-section {
        background: white;
        padding: 30px;
        border-radius: 8px;
        margin-bottom: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .form-section h2 {
        font-size: 22px;
        color: #000;
        margin: 0 0 20px 0;
        font-weight: 700;
      }

      .fine-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
        font-size: 14px;
      }

      .form-group input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
      }

      .form-group input:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
      }

      .btn-submit {
        grid-column: 1 / -1;
        padding: 12px 24px;
        background: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-submit:hover {
        background: #333;
      }

      .filters {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
      }

      .filters button {
        padding: 10px 20px;
        border: 2px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        color: #666;
      }

      .filters button.active {
        border-color: #000;
        background: #000;
        color: white;
      }

      .table-section {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .fines-table {
        width: 100%;
        border-collapse: collapse;
      }

      .fines-table thead {
        background: #f0f0f0;
        border-bottom: 2px solid #ddd;
      }

      .fines-table th {
        padding: 15px;
        text-align: left;
        font-weight: 600;
        color: #333;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .fines-table td {
        padding: 12px 15px;
        border-bottom: 1px solid #eee;
        color: #666;
        font-size: 14px;
      }

      .fines-table tbody tr:hover {
        background: #f9f9f9;
      }

      .amount {
        font-weight: 600;
        color: #28a745;
      }

      .status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status.pending {
        background: #fff3cd;
        color: #856404;
      }

      .status.overdue {
        background: #f8d7da;
        color: #721c24;
      }

      .status.paid {
        background: #d4edda;
        color: #155724;
      }

      .actions {
        display: flex;
        gap: 8px;
      }

      .btn-paid,
      .btn-delete {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-paid {
        background: #28a745;
        color: white;
      }

      .btn-paid:hover {
        background: #218838;
      }

      .btn-delete {
        background: #dc3545;
        color: white;
      }

      .btn-delete:hover {
        background: #c82333;
      }
    `,
  ],
})
export class FinesComponent implements OnInit {
  allFines: any[] = [];
  pendingFines: any[] = [];
  overdueFines: any[] = [];
  paidFines = 0;
  displayedFines: any[] = [];
  filterType = 'all';

  newFine = {
    userId: null,
    checkoutId: null,
    amount: null,
    dueDate: null,
    status: 'PENDING',
  };

  constructor(private fineService: FineService) {}

  ngOnInit() {
    this.loadFines();
  }

  loadFines() {
    this.fineService.getAllFines().subscribe({
      next: (fines) => {
        this.allFines = fines;
        this.displayedFines = fines;
        this.paidFines = fines.filter((f) => f.status === 'PAID').length;
      },
    });
  }

  loadPendingFines() {
    this.fineService.getPendingFines().subscribe({
      next: (fines) => {
        this.pendingFines = fines;
        this.displayedFines = fines;
      },
    });
  }

  loadOverdueFines() {
    this.fineService.getOverdueFines().subscribe({
      next: (fines) => {
        this.overdueFines = fines;
        this.displayedFines = fines;
      },
    });
  }

  addFine() {
    this.fineService.createFine(this.newFine).subscribe({
      next: () => {
        this.newFine = {
          userId: null,
          checkoutId: null,
          amount: null,
          dueDate: null,
          status: 'PENDING',
        };
        this.loadFines();
      },
    });
  }

  markAsPaid(id: number) {
    this.fineService.updateFineStatus(id, 'PAID').subscribe({
      next: () => {
        this.loadFines();
      },
    });
  }

  deleteFine(id: number) {
    this.fineService.deleteFine(id).subscribe({
      next: () => {
        this.loadFines();
      },
    });
  }
}

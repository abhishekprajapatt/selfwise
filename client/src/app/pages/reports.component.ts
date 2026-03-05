import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reports-container">
      <div class="page-header">
        <h1>Reports & Analytics</h1>
        <p class="subtitle">View library performance and statistics</p>
      </div>

      <div class="content">
        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-box">
            <h4>Total Books</h4>
            <p class="large-number">{{ totalBooks }}</p>
          </div>
          <div class="stat-box">
            <h4>Books Issued</h4>
            <p class="large-number">{{ totalIssued }}</p>
          </div>
          <div class="stat-box">
            <h4>Books Returned</h4>
            <p class="large-number">{{ totalReturned }}</p>
          </div>
          <div class="stat-box">
            <h4>Overdue Books</h4>
            <p class="large-number text-danger">{{ totalOverdue }}</p>
          </div>
          <div class="stat-box">
            <h4>Total Users</h4>
            <p class="large-number">{{ totalUsers }}</p>
          </div>
          <div class="stat-box">
            <h4>Active Users</h4>
            <p class="large-number">{{ activeUsers }}</p>
          </div>
        </div>

        <!-- Generate Report Section -->
        <div class="generate-section">
          <h2>Generate New Report</h2>
          <form (ngSubmit)="generateReport()" class="report-form">
            <div class="form-group">
              <label>Report Type</label>
              <select
                [(ngModel)]="newReport.reportType"
                name="reportType"
                required
              >
                <option value="">Select Report Type</option>
                <option value="CIRCULATION">Circulation Report</option>
                <option value="USER_ACTIVITY">User Activity Report</option>
                <option value="INVENTORY">Inventory Report</option>
                <option value="OVERDUE">Overdue Books Report</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Total Books</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.totalBooks"
                  name="totalBooks"
                />
              </div>
              <div class="form-group">
                <label>Books Issued</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.booksIssued"
                  name="booksIssued"
                />
              </div>
              <div class="form-group">
                <label>Books Returned</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.booksReturned"
                  name="booksReturned"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Overdue Books</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.overdueBooks"
                  name="overdueBooks"
                />
              </div>
              <div class="form-group">
                <label>Total Users</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.totalUsers"
                  name="totalUsers"
                />
              </div>
              <div class="form-group">
                <label>Active Users</label>
                <input
                  type="number"
                  [(ngModel)]="newReport.activeUsers"
                  name="activeUsers"
                />
              </div>
            </div>

            <div class="form-group full">
              <label>Summary</label>
              <textarea
                [(ngModel)]="newReport.summary"
                name="summary"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" class="btn-generate">Generate Report</button>
          </form>
        </div>

        <!-- Filter Section -->
        <div class="filter-section">
          <h2>Filter Reports</h2>
          <div class="filter-controls">
            <div class="filter-group">
              <label>Report Type:</label>
              <select [(ngModel)]="selectedType" (change)="filterByType()">
                <option value="">All Types</option>
                <option value="CIRCULATION">Circulation</option>
                <option value="USER_ACTIVITY">User Activity</option>
                <option value="INVENTORY">Inventory</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>
            <button (click)="loadAllReports()" class="btn-reset">
              Reset Filter
            </button>
          </div>
        </div>

        <!-- Reports Table -->
        <div class="table-section">
          <table class="reports-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Report Type</th>
                <th>Generated Date</th>
                <th>Total Books</th>
                <th>Issued</th>
                <th>Returned</th>
                <th>Overdue</th>
                <th>Total Users</th>
                <th>Active Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let report of displayedReports">
                <td>{{ report.id }}</td>
                <td>
                  <span
                    class="type-badge"
                    [ngClass]="report.reportType.toLowerCase()"
                  >
                    {{ report.reportType }}
                  </span>
                </td>
                <td>{{ report.generatedDate }}</td>
                <td>{{ report.totalBooks }}</td>
                <td>{{ report.booksIssued }}</td>
                <td>{{ report.booksReturned }}</td>
                <td class="overdue">{{ report.overdueBooks }}</td>
                <td>{{ report.totalUsers }}</td>
                <td>{{ report.activeUsers }}</td>
                <td class="actions">
                  <button (click)="viewReport(report)" class="btn-view">
                    View
                  </button>
                  <button (click)="deleteReport(report.id)" class="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Report Details Modal -->
        <div *ngIf="selectedReport" class="modal">
          <div class="modal-content">
            <button class="close-btn" (click)="selectedReport = null">
              &times;
            </button>
            <h2>Report Details</h2>
            <div class="details-grid">
              <div class="detail-item">
                <label>Report Type:</label>
                <span>{{ selectedReport.reportType }}</span>
              </div>
              <div class="detail-item">
                <label>Generated Date:</label>
                <span>{{ selectedReport.generatedDate }}</span>
              </div>
              <div class="detail-item">
                <label>Total Books:</label>
                <span>{{ selectedReport.totalBooks }}</span>
              </div>
              <div class="detail-item">
                <label>Books Issued:</label>
                <span>{{ selectedReport.booksIssued }}</span>
              </div>
              <div class="detail-item">
                <label>Books Returned:</label>
                <span>{{ selectedReport.booksReturned }}</span>
              </div>
              <div class="detail-item">
                <label>Overdue Books:</label>
                <span>{{ selectedReport.overdueBooks }}</span>
              </div>
              <div class="detail-item">
                <label>Total Users:</label>
                <span>{{ selectedReport.totalUsers }}</span>
              </div>
              <div class="detail-item">
                <label>Active Users:</label>
                <span>{{ selectedReport.activeUsers }}</span>
              </div>
            </div>
            <div class="summary" *ngIf="selectedReport.summary">
              <h3>Summary</h3>
              <p>{{ selectedReport.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .reports-container {
        padding: 40px 20px;
        max-width: 1400px;
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

      .quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .stat-box {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .stat-box h4 {
        color: #888;
        font-size: 13px;
        font-weight: 600;
        margin: 0 0 15px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .large-number {
        font-size: 32px;
        font-weight: 700;
        color: #000;
        margin: 0;
      }

      .text-danger {
        color: #dc3545;
      }

      .generate-section {
        background: white;
        padding: 30px;
        border-radius: 8px;
        margin-bottom: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .generate-section h2 {
        font-size: 22px;
        color: #000;
        margin: 0 0 20px 0;
        font-weight: 700;
      }

      .report-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group.full {
        grid-column: 1 / -1;
      }

      .form-group label {
        font-weight: 600;
        margin-bottom: 8px;
        color: #333;
        font-size: 14px;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
      }

      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
      }

      .btn-generate {
        padding: 12px 24px;
        background: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-generate:hover {
        background: #333;
      }

      .filter-section {
        background: white;
        padding: 30px;
        border-radius: 8px;
        margin-bottom: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .filter-section h2 {
        font-size: 22px;
        color: #000;
        margin: 0 0 20px 0;
        font-weight: 700;
      }

      .filter-controls {
        display: flex;
        gap: 20px;
        align-items: flex-end;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .filter-group label {
        font-weight: 600;
        color: #333;
        font-size: 14px;
      }

      .filter-group select {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        min-width: 200px;
      }

      .btn-reset {
        padding: 10px 20px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-reset:hover {
        background: #5a6268;
      }

      .table-section {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .reports-table {
        width: 100%;
        border-collapse: collapse;
      }

      .reports-table thead {
        background: #f0f0f0;
        border-bottom: 2px solid #ddd;
      }

      .reports-table th {
        padding: 15px;
        text-align: left;
        font-weight: 600;
        color: #333;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .reports-table td {
        padding: 12px 15px;
        border-bottom: 1px solid #eee;
        color: #666;
        font-size: 14px;
      }

      .reports-table tbody tr:hover {
        background: #f9f9f9;
      }

      .type-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .type-badge.circulation {
        background: #cfe2ff;
        color: #084298;
      }

      .type-badge.user_activity {
        background: #d1e7dd;
        color: #0f5132;
      }

      .type-badge.inventory {
        background: #fff3cd;
        color: #664d03;
      }

      .type-badge.overdue {
        background: #f8d7da;
        color: #842029;
      }

      .overdue {
        color: #dc3545;
        font-weight: 600;
      }

      .actions {
        display: flex;
        gap: 8px;
      }

      .btn-view,
      .btn-delete {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-view {
        background: #000;
        color: white;
      }

      .btn-view:hover {
        background: #333;
      }

      .btn-delete {
        background: #dc3545;
        color: white;
      }

      .btn-delete:hover {
        background: #c82333;
      }

      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .modal-content {
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }

      .modal-content h2 {
        margin-top: 0;
        color: #000;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 20px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .detail-item label {
        font-weight: 600;
        color: #666;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .detail-item span {
        color: #000;
        font-size: 15px;
        font-weight: 500;
      }

      .summary {
        border-top: 2px solid #eee;
        padding-top: 20px;
      }

      .summary h3 {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin: 0 0 10px 0;
      }

      .summary p {
        color: #666;
        line-height: 1.6;
        margin: 0;
      }
    `,
  ],
})
export class ReportsComponent implements OnInit {
  allReports: any[] = [];
  displayedReports: any[] = [];
  selectedReport: any = null;
  selectedType = '';

  totalBooks = 0;
  totalIssued = 0;
  totalReturned = 0;
  totalOverdue = 0;
  totalUsers = 0;
  activeUsers = 0;

  newReport = {
    reportType: '',
    totalBooks: 0,
    booksIssued: 0,
    booksReturned: 0,
    overdueBooks: 0,
    totalUsers: 0,
    activeUsers: 0,
    summary: '',
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadAllReports();
  }

  loadAllReports() {
    this.reportService.getAllReports().subscribe({
      next: (reports) => {
        this.allReports = reports;
        this.displayedReports = reports;
        this.calculateStats();
      },
    });
  }

  calculateStats() {
    if (this.displayedReports.length > 0) {
      const latest = this.displayedReports[this.displayedReports.length - 1];
      this.totalBooks = latest.totalBooks;
      this.totalIssued = latest.booksIssued;
      this.totalReturned = latest.booksReturned;
      this.totalOverdue = latest.overdueBooks;
      this.totalUsers = latest.totalUsers;
      this.activeUsers = latest.activeUsers;
    }
  }

  generateReport() {
    this.reportService.generateReport(this.newReport).subscribe({
      next: () => {
        this.newReport = {
          reportType: '',
          totalBooks: 0,
          booksIssued: 0,
          booksReturned: 0,
          overdueBooks: 0,
          totalUsers: 0,
          activeUsers: 0,
          summary: '',
        };
        this.loadAllReports();
      },
    });
  }

  filterByType() {
    if (this.selectedType) {
      this.reportService.getReportsByType(this.selectedType).subscribe({
        next: (reports) => {
          this.displayedReports = reports;
        },
      });
    } else {
      this.displayedReports = this.allReports;
    }
  }

  viewReport(report: any) {
    this.selectedReport = report;
  }

  deleteReport(id: number) {
    this.reportService.deleteReport(id).subscribe({
      next: () => {
        this.loadAllReports();
      },
    });
  }
}

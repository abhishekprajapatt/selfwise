import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/models';

@Component({
  selector: 'app-users',
  template: `
    <div class="container">
      <div class="header">
        <h2>User Management</h2>
        <button class="btn-primary" (click)="toggleRegister()">
          + Register User
        </button>
      </div>

      <div *ngIf="showRegisterForm" class="form-container">
        <h3>Register New User</h3>
        <form (ngSubmit)="registerUser()">
          <input
            type="text"
            placeholder="Username"
            [(ngModel)]="newUser.username"
            name="username"
            required
          />
          <input
            type="email"
            placeholder="Email"
            [(ngModel)]="newUser.email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            [(ngModel)]="newUser.password"
            name="password"
            required
          />
          <select [(ngModel)]="newUser.role" name="role" required>
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="LIBRARIAN">Librarian</option>
          </select>
          <button type="submit" class="btn-primary">Register</button>
          <button
            type="button"
            class="btn-secondary"
            (click)="toggleRegister()"
          >
            Cancel
          </button>
        </form>
      </div>

      <div *ngIf="showEditForm" class="form-container">
        <h3>Edit User</h3>
        <form (ngSubmit)="updateUserInfo()">
          <input
            type="text"
            placeholder="Username"
            [(ngModel)]="selectedUser.username"
            name="username"
            required
          />
          <input
            type="email"
            placeholder="Email"
            [(ngModel)]="selectedUser.email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            [(ngModel)]="selectedUser.password"
            name="password"
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
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <select
                  [(ngModel)]="user.role"
                  (change)="updateRole(user.id!, user.role)"
                  name="role{{ user.id }}"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="LIBRARIAN">Librarian</option>
                </select>
              </td>
              <td>
                <button class="btn-edit" (click)="openEditForm(user)">
                  Edit
                </button>
                <button class="btn-delete" (click)="deleteUser(user.id!)">
                  Delete
                </button>
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
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', email: '', password: '', role: '' };
  selectedUser: User = { username: '', email: '', password: '', role: '' };
  showRegisterForm = false;
  showEditForm = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => alert('Error loading users: ' + error.message),
    });
  }

  registerUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { username: '', email: '', password: '', role: '' };
        this.showRegisterForm = false;
        alert('User registered successfully');
      },
      error: (error) => alert('Error registering user: ' + error.message),
    });
  }

  openEditForm(user: User) {
    this.selectedUser = { ...user };
    this.showEditForm = true;
  }

  updateUserInfo() {
    this.userService
      .updateUserInfo(this.selectedUser.id!, this.selectedUser)
      .subscribe({
        next: () => {
          this.loadUsers();
          this.showEditForm = false;
          alert('User updated successfully');
        },
        error: (error) => alert('Error updating user: ' + error.message),
      });
  }

  updateRole(userId: number, role: string) {
    this.userService.updateRole(userId, role).subscribe({
      next: () => {
        alert('Role updated successfully');
      },
      error: (error) => alert('Error updating role: ' + error.message),
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
          alert('User deleted successfully');
        },
        error: (error) => alert('Error deleting user: ' + error.message),
      });
    }
  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
}

# 📚 SelfWise - Library Management System

<div align="center">

**A Full-Stack Web Application for Library Management with Role-Based Access Control**

[Live Demo](#-ui-preview) • [API Docs](#-api-documentation) • [Tech Stack](#-technologies) • [Setup Guide](#-installation--setup)

</div>

---

## 📋 Overview

**SelfWise** is a modern, enterprise-grade Library Management System built with a full-stack Java and Angular architecture. It provides a complete solution for managing library operations including book catalog management, user checkout tracking, fine management, and comprehensive reporting.

The system implements robust role-based access control (RBAC) with separate workflows for **Administrators** and **Users**, ensuring secure and efficient library operations with RESTful API design patterns and scalable database architecture.

---

## ✨ Key Features

### 🔐 Admin Features

- ✅ **Add/Update/Delete Books**: Full CRUD operations on book catalog with validation
- ✅ **Manage Book Quantity**: Real-time inventory management with automatic stock tracking
- ✅ **Manage Checkouts**: Complete oversight of all book issuances and returns
- ✅ **User Management**: Create, update, and manage user accounts and roles
- ✅ **Fine Management**: Track and manage user fines for overdue books
- ✅ **Advanced Reporting**: Generate insights on book usage, user activity, and overdue reports
- ✅ **Catalog Dashboard**: Comprehensive view of inventory status and analytics

### 👤 User Features

- ✅ **Browse Library**: View all available books with advanced filtering and search
- ✅ **Search Books**: Search by title, author, genre, publication year, and year range
- ✅ **Issue Books**: Request and checkout books with automated quantity management
- ✅ **View Issued Books**: Track personal checkout history and due dates
- ✅ **Return Books**: Return books with automatic fine calculation for overdue items
- ✅ **Profile Management**: Update personal information and view account details
- ✅ **Genre Grouping**: Browse books organized by genre categories

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Angular)                        │
│  - Responsive UI with role-based dashboards                 │
│  - Real-time data binding and validation                    │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────────────┐
│               API Gateway (Spring Boot)                      │
│  - RESTful endpoints with OpenAPI documentation             │
│  - JWT Authentication & Authorization                       │
│  - CORS enabled for cross-origin requests                   │
└────────────────────┬────────────────────────────────────────┘
                     │ ORM (JPA)
┌────────────────────▼────────────────────────────────────────┐
│          Database Layer (MySQL 8.0)                          │
│  - Normalized schema with proper indexing                   │
│  - Foreign key relationships & constraints                  │
│  - Transaction support for data integrity                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technologies & Stack

| Component             | Technology            | Version  |
| --------------------- | --------------------- | -------- |
| **Backend Framework** | Spring Boot           | 3.4.2    |
| **Language**          | Java                  | 17 (LTS) |
| **Database**          | MySQL                 | 8.0+     |
| **ORM**               | JPA/Hibernate         | Latest   |
| **Frontend**          | Angular               | Latest   |
| **Build Tool**        | Maven                 | 3.8+     |
| **Authentication**    | JWT + Spring Security | -        |
| **API Documentation** | Swagger/OpenAPI       | 3.0      |
| **Validation**        | Jakarta Validation    | -        |
| **Logging**           | SLF4J + Logback       | -        |

---

## 📊 API Documentation

### Core Endpoints

#### Book Management

- `POST /api/books` - Add new book
- `GET /api/books` - Get all books with filtering
- `GET /api/books/{id}` - Get book by ID
- `PUT /api/books/{id}` - Update book details
- `DELETE /api/books/{id}` - Delete book

#### User Management

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users` - Get all users (admin only)

#### Book Checkout

- `POST /api/checkOut/issue/{userId}/{bookId}/{quantity}` - Issue book to user
- `GET /api/checkOut/getAllIssuedBook` - Get all issued books
- `GET /api/checkOut/issuedBooks/user/{userId}` - Get user's issued books
- `PUT /api/checkOut/returnBook/{userId}/{bookId}` - Return book

#### Fine Management

- `GET /api/fines/user/{userId}` - Get user fines
- `POST /api/fines` - Calculate and create fines

#### Reports

- `GET /api/reports/books-issued` - Issued books report
- `GET /api/reports/overdue-books` - Overdue books report
- `GET /api/reports/user-activity` - User activity analytics

---

## 📊 API Documentation Screenshots

### Swagger/OpenAPI Documentation

<img width="892" alt="API Documentation 1" src="https://github.com/user-attachments/assets/6d39860a-8eb1-45a2-a12d-2154c8edd8d8" />
<img width="896" alt="API Documentation 2" src="https://github.com/user-attachments/assets/750c8b35-d7f3-4f4c-8272-babe38ce5d92" />
<img width="896" alt="API Documentation 3" src="https://github.com/user-attachments/assets/680a0a2d-44cc-40ff-bbe2-596cdf9c841a" />
<img width="848" alt="API Documentation 4" src="https://github.com/user-attachments/assets/8c5350bb-8184-4e9b-a34f-a5d9e5e5b126" />
<img width="857" alt="API Documentation 5" src="https://github.com/user-attachments/assets/12d9bba4-c69c-4ba3-a389-0334abe68325" />

---

## 🚀 Installation & Setup

### Prerequisites

- Java 17 (JDK)
- MySQL 8.0+
- Node.js 16+ & npm
- Maven 3.8+

### Backend Setup

```bash
# 1. Navigate to server directory
cd selfwise/server

# 2. Configure database in application.properties
# Update spring.datasource.url, username, password

# 3. Build project
mvn clean install

# 4. Run application
java -jar target/SelfWise-LibraryManagementSystem-1.0.0.jar

# Server runs on http://localhost:8080
```

### Frontend Setup

```bash
# 1. Navigate to client directory
cd selfwise/client

# 2. Install dependencies
npm install

# 3. Start development server
ng serve

# Frontend runs on http://localhost:4200
```

### Database Setup

```sql
-- Create database
CREATE DATABASE library_management;
USE library_management;

-- Tables will be auto-created by Hibernate (Spring Boot)
-- Set spring.jpa.hibernate.ddl-auto=update in application.properties
```

---

## 🔒 Security Features

- ✅ **JWT-based Authentication**: Secure token-based user sessions
- ✅ **Role-Based Authorization**: ADMIN and USER roles with proper access controls
- ✅ **Password Hashing**: BCrypt encoding for secure password storage
- ✅ **CORS Configuration**: Configured cross-origin resource sharing
- ✅ **Input Validation**: DTO validation with Jakarta Validation annotations
- ✅ **Exception Handling**: Centralized exception handling with meaningful error messages

---

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- JPA query optimization with proper fetching strategies
- Pagination support for large datasets
- Caching mechanisms for catalog data
- Connection pooling with HikariCP

---

## 🎨 UI Preview

### Home Page

<img width="1920" height="5871" alt="screencapture-localhost-4200-home-2026-03-06-02_15_38" src="https://github.com/user-attachments/assets/5ff380dd-8a84-462c-aabb-b6c256ba146d" />

### Users Management

<img width="1920" height="1068" alt="screencapture-localhost-4200-users-2026-03-06-02_23_38" src="https://github.com/user-attachments/assets/de2a2932-677b-4937-9aef-d6be839238c6" />

### Books Catalog

<img width="1920" height="1068" alt="screencapture-localhost-4200-catalog-2026-03-06-02_25_05" src="https://github.com/user-attachments/assets/adca8dcb-777d-4152-95ea-4ace14f5168f" />

### Book Inventory

<img width="1920" height="1068" alt="screencapture-localhost-4200-books-2026-03-06-02_24_07" src="https://github.com/user-attachments/assets/caaed743-d374-49fb-8ddb-df2cd3638c78" />

### Checkout Management

<img width="1920" height="1068" alt="screencapture-localhost-4200-checkout-2026-03-06-02_26_35" src="https://github.com/user-attachments/assets/18d0dfc1-f513-461a-92f5-4963739a124e" />

### Reports & Analytics

<img width="1920" height="2043" alt="screencapture-localhost-4200-reports-2026-03-06-02_27_14" src="https://github.com/user-attachments/assets/89275286-6c0d-48f7-8e70-33dde8cdb091" />

### Fine Management

<img width="1920" height="1351" alt="screencapture-localhost-4200-fines-2026-03-06-02_27_44" src="https://github.com/user-attachments/assets/ad815826-2720-4cfb-9085-3901cca3f326" />

---


## 📝 Database Schema

### Key Tables

- **users**: User accounts with roles
- **books**: Book catalog with metadata
- **catalogs**: Inventory tracking
- **checkout**: Book issuance records
- **fines**: Fine tracking and calculations
- **reports**: User activity and analytics

---

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t selfwise-library .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host:3306/library \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=password \
  selfwise-library
```

---

## 🎯 Future Enhancements

- Email notifications for overdue books
- SMS alerts for users
- Advanced analytics with charts
- Mobile app (React Native/Flutter)
- Barcode scanning for book management
- Payment integration for fines
- Cloud deployment (AWS/Azure)
- Microservices architecture refactoring

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Developer

Built as a full-stack application demonstrating enterprise-level architecture, best practices, and production-ready code.

**Skills Demonstrated:**

- Full-stack development (Java + Angular)
- RESTful API design
- Database design & optimization
- Authentication & Authorization
- Error handling & validation
- Code organization & best practices
- Security implementations

---

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Last Updated:** March 6, 2026 | **Version:** 1.0.0

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="logo-badge">
            <span class="logo-text">SelfWise</span>
          </div>
          <h1>Smart Library<br />Management</h1>
          <p class="hero-subtitle">
            Professional book management system designed for modern libraries
          </p>
          <div class="cta-buttons">
            <button
              class="btn-primary"
              [routerLink]="isLoggedIn ? '/users' : '/login'"
            >
              Get Started
            </button>
            <button class="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      <!-- Overview Section -->
      <section class="overview">
        <div class="container">
          <h2>About SelfWise</h2>
          <div class="overview-content">
            <div class="overview-text">
              <p>
                SelfWise is a comprehensive library management solution built
                for the modern era. Designed with librarians and administrators
                in mind, SelfWise streamlines operations while providing
                intuitive tools for managing books, users, inventory, and
                checkout processes.
              </p>
              <p>
                Our platform combines powerful features with an elegant,
                user-friendly interface to help libraries of all sizes operate
                more efficiently and effectively.
              </p>
            </div>
            <div class="stats">
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Cloud Ready</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Available</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">4</div>
                <div class="stat-label">Core Modules</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">∞</div>
                <div class="stat-label">Scalable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2>Core Features</h2>
          <p class="section-subtitle">
            Everything you need to manage your library efficiently
          </p>
          <div class="features">
            <div class="feature-card">
              <div class="feature-icon">👥</div>
              <h3>User Management</h3>
              <p>
                Complete user lifecycle management with role-based access
                control. Register users, manage roles (Admin, Librarian, User),
                and maintain user profiles effortlessly.
              </p>
              <ul class="feature-list">
                <li>User registration & authentication</li>
                <li>Role-based permissions</li>
                <li>Profile management</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📖</div>
              <h3>Book Catalog</h3>
              <p>
                Powerful book management system with advanced search
                capabilities. Organize, search, and filter books by title,
                author, genre, and publication year.
              </p>
              <ul class="feature-list">
                <li>Add & edit book details</li>
                <li>Advanced search filters</li>
                <li>Genre & category management</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>Inventory Control</h3>
              <p>
                Real-time inventory tracking and management. Monitor stock
                levels, manage quantities, and ensure accurate book availability
                information.
              </p>
              <ul class="feature-list">
                <li>Real-time stock tracking</li>
                <li>Quantity management</li>
                <li>Availability alerts</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔄</div>
              <h3>Checkout System</h3>
              <p>
                Streamlined book issuance and return management. Issue books to
                users, track checkout history, and manage return dates
                efficiently.
              </p>
              <ul class="feature-list">
                <li>Issue & return tracking</li>
                <li>Checkout history</li>
                <li>User-specific records</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📈</div>
              <h3>Reports & Analytics</h3>
              <p>
                Comprehensive insights into library operations and performance.
                Generate detailed reports on book circulation, user activity,
                and library statistics.
              </p>
              <ul class="feature-list">
                <li>Circulation reports</li>
                <li>Usage analytics</li>
                <li>Performance metrics</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💰</div>
              <h3>Fine Management</h3>
              <p>
                Automated fine tracking and payment management for overdue
                books. Monitor fines, send reminders, and manage payments with
                ease.
              </p>
              <ul class="feature-list">
                <li>Automatic fine calculation</li>
                <li>Overdue reminders</li>
                <li>Payment tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Section -->
      <section class="tech-section">
        <div class="container">
          <h2>Built with Modern Tech</h2>
          <p class="section-subtitle">
            Powered by industry-leading technologies
          </p>
          <div class="tech-grid">
            <div class="tech-item">
              <h4>Frontend</h4>
              <p>
                Angular 17 with TypeScript for a responsive, dynamic user
                interface
              </p>
            </div>
            <div class="tech-item">
              <h4>Backend</h4>
              <p>Spring Boot 3.4 with Java 17 for robust API services</p>
            </div>
            <div class="tech-item">
              <h4>Database</h4>
              <p>MySQL 8.0 with Hibernate ORM for reliable data persistence</p>
            </div>
            <div class="tech-item">
              <h4>Documentation</h4>
              <p>Swagger/OpenAPI for interactive API exploration</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Transform Your Library?</h2>
          <p>Start managing your library with SelfWise today</p>
          <button
            class="btn-primary-large"
            [routerLink]="isLoggedIn ? '/users' : '/login'"
          >
            Begin Here
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h4>SelfWise</h4>
            <p>Professional library management system for the modern age.</p>
            <p class="copyright">© 2026 SelfWise. All rights reserved.</p>
          </div>
          <div class="footer-section">
            <h5>Product</h5>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h5>Modules</h5>
            <ul>
              <li><a href="#">Users</a></li>
              <li><a href="#">Books</a></li>
              <li><a href="#">Catalog</a></li>
              <li><a href="#">Checkout</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-bottom">
          <p class="version">
            SelfWise v1.0 | Built with Angular + Spring Boot
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
      }

      .home {
        width: 100%;
        background: #fff;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      /* Hero Section */
      .hero {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: white;
        padding: 120px 20px;
        text-align: center;
      }

      .hero-content {
        max-width: 900px;
        margin: 0 auto;
      }

      .logo-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 12px 24px;
        border-radius: 50px;
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
      }

      .logo-text {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 1.5px;
      }

      .hero h1 {
        font-size: 72px;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.2;
        letter-spacing: -2px;
      }

      .hero-subtitle {
        font-size: 20px;
        color: #aaa;
        margin-bottom: 40px;
        font-weight: 400;
      }

      .cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-primary {
        background: white;
        color: #000;
        padding: 14px 32px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 15px;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
      }

      .btn-secondary {
        background: transparent;
        color: white;
        padding: 14px 32px;
        border: 2px solid white;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 15px;
      }

      .btn-secondary:hover {
        background: white;
        color: #000;
      }

      /* Overview Section */
      .overview {
        padding: 80px 20px;
        background: #fff;
      }

      .overview h2 {
        font-size: 48px;
        color: #000;
        margin-bottom: 60px;
        text-align: center;
        font-weight: 700;
      }

      .overview-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
      }

      .overview-text p {
        font-size: 16px;
        color: #555;
        line-height: 1.8;
        margin-bottom: 20px;
      }

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }

      .stat-item {
        padding: 30px;
        background: #f8f8f8;
        border-radius: 8px;
        text-align: center;
        border: 1px solid #f0f0f0;
      }

      .stat-number {
        font-size: 42px;
        font-weight: 700;
        color: #000;
        margin-bottom: 10px;
      }

      .stat-label {
        font-size: 14px;
        color: #888;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      /* Features Section */
      .features-section {
        padding: 80px 20px;
        background: #f9f9f9;
      }

      .features-section h2 {
        font-size: 48px;
        color: #000;
        text-align: center;
        margin-bottom: 15px;
        font-weight: 700;
      }

      .section-subtitle {
        text-align: center;
        color: #888;
        margin-bottom: 60px;
        font-size: 18px;
      }

      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 30px;
      }

      .feature-card {
        background: white;
        padding: 40px 30px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
      }

      .feature-card:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        transform: translateY(-4px);
        border-color: #e0e0e0;
      }

      .feature-icon {
        font-size: 48px;
        margin-bottom: 20px;
        display: block;
      }

      .feature-card h3 {
        font-size: 22px;
        color: #000;
        margin-bottom: 15px;
        font-weight: 700;
      }

      .feature-card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 14px;
      }

      .feature-list {
        list-style: none;
      }

      .feature-list li {
        color: #777;
        padding: 8px 0;
        padding-left: 24px;
        position: relative;
        font-size: 13px;
      }

      .feature-list li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #000;
        font-weight: 700;
      }

      /* Tech Section */
      .tech-section {
        padding: 80px 20px;
        background: white;
      }

      .tech-section h2 {
        font-size: 48px;
        color: #000;
        text-align: center;
        margin-bottom: 15px;
        font-weight: 700;
      }

      .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-top: 60px;
      }

      .tech-item {
        padding: 40px 30px;
        background: #f8f8f8;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
      }

      .tech-item:hover {
        border-color: #ddd;
        background: #fff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      }

      .tech-item h4 {
        font-size: 18px;
        color: #000;
        margin-bottom: 12px;
        font-weight: 700;
      }

      .tech-item p {
        color: #777;
        line-height: 1.6;
        font-size: 14px;
      }

      /* CTA Section */
      .cta-section {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: white;
        padding: 80px 20px;
        text-align: center;
      }

      .cta-content {
        max-width: 700px;
        margin: 0 auto;
      }

      .cta-section h2 {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 15px;
      }

      .cta-section p {
        font-size: 18px;
        color: #aaa;
        margin-bottom: 40px;
      }

      .btn-primary-large {
        background: white;
        color: #000;
        padding: 16px 48px;
        border: none;
        border-radius: 6px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 16px;
      }

      .btn-primary-large:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 24px rgba(255, 255, 255, 0.2);
      }

      /* Footer */
      .footer {
        background: #0a0a0a;
        color: #999;
        padding: 60px 20px 30px;
        border-top: 1px solid #222;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 50px;
        margin-bottom: 40px;
      }

      .footer-section h4 {
        color: white;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 15px;
      }

      .footer-section h5 {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .footer-section p {
        font-size: 13px;
        line-height: 1.6;
        margin-bottom: 12px;
        color: #888;
      }

      .copyright {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #222;
        color: #666;
      }

      .footer-section ul {
        list-style: none;
      }

      .footer-section ul li {
        margin-bottom: 10px;
      }

      .footer-section a {
        color: #999;
        text-decoration: none;
        font-size: 13px;
        transition: color 0.3s ease;
      }

      .footer-section a:hover {
        color: white;
      }

      .footer-divider {
        height: 1px;
        background: #222;
        margin-bottom: 30px;
      }

      .footer-bottom {
        text-align: center;
        padding-top: 30px;
        border-top: 1px solid #222;
      }

      .version {
        font-size: 12px;
        color: #666;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 42px;
        }

        .hero-subtitle {
          font-size: 16px;
        }

        .overview-content {
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .stats {
          grid-template-columns: repeat(2, 1fr);
        }

        .features-section h2,
        .overview h2,
        .tech-section h2,
        .cta-section h2 {
          font-size: 36px;
        }

        .footer-content {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .cta-buttons {
          flex-direction: column;
          align-items: center;
        }

        .btn-primary,
        .btn-secondary {
          width: 100%;
          max-width: 200px;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}

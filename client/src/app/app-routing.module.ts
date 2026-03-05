import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { UsersComponent } from './pages/users.component';
import { BooksComponent } from './pages/books.component';
import { CatalogComponent } from './pages/catalog.component';
import { CheckoutComponent } from './pages/checkout.component';
import { FinesComponent } from './pages/fines.component';
import { ReportsComponent } from './pages/reports.component';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'books', component: BooksComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'fines', component: FinesComponent },
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

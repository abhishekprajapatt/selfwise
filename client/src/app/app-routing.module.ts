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
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'fines', component: FinesComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

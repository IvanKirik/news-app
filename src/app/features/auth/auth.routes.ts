import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { noAuthGuard } from './data-access/auth-guard';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

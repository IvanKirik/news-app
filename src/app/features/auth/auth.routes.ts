import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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

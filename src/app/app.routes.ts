import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./features/articles/articles.routes').then((m) => m.ArticlesRoutes)
  }
];

import { Routes } from '@angular/router';
import { AuthRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/articles/articles.routes').then(
        (m) => m.ArticlesRoutes,
      ),
  },
];

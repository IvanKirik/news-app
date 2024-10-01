import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/articles/articles.routes').then((m) => m.ArticlesRoutes)
  }
];

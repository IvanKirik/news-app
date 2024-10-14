import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/articles/articles.routes').then(
        (m) => m.ArticlesRoutes,
      ),
  },
];

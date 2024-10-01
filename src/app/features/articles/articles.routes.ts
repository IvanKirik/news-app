import {Routes} from "@angular/router";
import {ArticleListComponent} from "./pages/article-list/article-list.component";
import {ArticleItemComponent} from "./pages/article-item/article-item.component";

export const ArticlesRoutes: Routes = [
  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: ':id',
    component: ArticleItemComponent
  }
]

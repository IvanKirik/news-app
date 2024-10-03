import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { articlesInitialState, ArticlesState } from './articles.model';
import { ArticlesService } from '../services/articles.service';
import { inject } from '@angular/core';

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesState>(articlesInitialState),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const articles = await articlesService.getArticles();
      patchState(store, { articles, loading: false });
    },
  })),
);

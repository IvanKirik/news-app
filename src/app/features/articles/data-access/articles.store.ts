import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  articlesInitialState,
  ArticlesListConfig,
  ArticlesState,
  Nullable,
} from './articles.model';
import { ArticlesService } from './articles.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesState>(articlesInitialState),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    updateFilters(filter: Nullable<ArticlesListConfig>): void {
      patchState(store, () => ({ config: { ...filter } }));
    },
    loadAll: rxMethod<Nullable<ArticlesListConfig>>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((filter) =>
          articlesService.getAllArticles(filter).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  articles: response.data,
                  loading: false,
                  total: response.total,
                });
              },
              error: () => {
                patchState(store, { loading: false });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);

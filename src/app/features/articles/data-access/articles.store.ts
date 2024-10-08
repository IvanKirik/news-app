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
import { state } from '@angular/animations';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../../shared/constants/pagination.constatns';

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesState>(articlesInitialState),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    updateFilters(filter: Nullable<ArticlesListConfig>): void {
      patchState(store, (state) => ({
        config: {
          ...state.config,
          page: filter.page,
          limit: filter.limit,
        },
      }));
    },

    updateSearch(search: string): void {
      patchState(store, (state) => ({
        config: {
          ...state.config,
          search,
          page: DEFAULT_PAGE,
          limit: DEFAULT_PAGE_SIZE,
        },
      }));
      this.loadAll(store.config);
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

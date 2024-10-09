import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  articlesInitialState,
  ArticlesListConfig,
  ArticlesState,
} from './articles.model';
import { ArticlesService } from './articles.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { setError, setFulfilled, setPending, withRequestStatus } from '../../../core/signal-store-features';
import { HttpErrorResponse } from '@angular/common/http';
import { Sort } from '../../../core/intefaces/sort.type';

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesState>(articlesInitialState),
  withRequestStatus(),
  withMethods((store, articlesService = inject(ArticlesService)) => ({
    updateFilters(config: ArticlesListConfig): void {
      patchState(store, (state) => ({
        ...state,
        config: {
          ...state.config,
          ...config
        }
      }));
    },
    search(search: string): void {
      patchState(store, (state) => ({
        ...state,
        config: {
          ...state.config,
          search
        }
      }));
    },
    sort(sortField: string, sortOrder: Sort): void {
      patchState(store, (state) => ({
        ...state,
        config: {
          ...state.config,
          sortField,
          sortOrder
        }
      }));
    },
    loadAll: rxMethod<ArticlesListConfig>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap((filter) =>
          articlesService.getAllArticles(filter).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, (state) => ({
                    ...state,
                    articles: response.data,
                    loading: false,
                    total: response.total,
                }), setFulfilled());
              },
              error: ({ message }: HttpErrorResponse) => {
                patchState(store, setError(message));
              },
            }),
          ),
        ),
      ),
    ),
  })),
);

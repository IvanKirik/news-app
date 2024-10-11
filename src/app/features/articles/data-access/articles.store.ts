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
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../core/signal-store-features';
import { HttpErrorResponse } from '@angular/common/http';
import { Sort } from '../../../core/intefaces/sort.type';
import { CreateArticleDto } from './dto/create-article.dto';
import { Tag } from './dto/article.dto';
import {
  SnackbarMessageType,
  SnackBarService,
} from '../../../shared/services/snack-bar.service';

export const ArticlesStore = signalStore(
  { providedIn: 'root' },
  withState<ArticlesState>(articlesInitialState),
  withRequestStatus(),
  withMethods(
    (
      store,
      articlesService = inject(ArticlesService),
      snackBarService = inject(SnackBarService),
    ) => ({
      updateFilters(config: Pick<ArticlesListConfig, 'limit' | 'page'>): void {
        patchState(store, (state) => ({
          ...state,
          config: {
            ...state.config,
            ...config,
          },
        }));
      },
      search(search: string): void {
        patchState(store, (state) => ({
          ...state,
          config: {
            ...state.config,
            search,
          },
        }));
      },
      searchTags({ tags }: { tags: Tag[] }): void {
        patchState(store, (state) => ({
          ...state,
          config: {
            ...state.config,
            tags,
          },
        }));
      },
      sort(sortField: string, sortOrder: Sort): void {
        patchState(store, (state) => ({
          ...state,
          config: {
            ...state.config,
            sortField,
            sortOrder,
          },
        }));
      },
      loadAll: rxMethod<ArticlesListConfig>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap((filter) =>
            articlesService.getAllArticles(filter).pipe(
              tapResponse({
                next: (response) => {
                  patchState(
                    store,
                    (state) => ({
                      ...state,
                      articles: response.data,
                      loading: false,
                      total: response.total,
                    }),
                    setFulfilled(),
                  );
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      ),
      createArticle: rxMethod<CreateArticleDto>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap((dto) =>
            articlesService.createArticle(dto).pipe(
              tapResponse({
                next: () => {
                  patchState(
                    store,
                    (state) => ({
                      ...state,
                    }),
                    setFulfilled(),
                  );
                  snackBarService.open('Новый дайджест успешно добавлен', SnackbarMessageType.Success);
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      ),
      loadTags: rxMethod<void>(
        pipe(
          switchMap(() =>
            articlesService.getTags().pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    ...state,
                    tags: response,
                  }));
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      ),
      loadEmails: rxMethod<void>(
        pipe(
          switchMap(() =>
            articlesService.getEmails().pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, (state) => ({
                    ...state,
                    emails: response,
                  }));
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);

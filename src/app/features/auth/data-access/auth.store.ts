import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { authInitialState, AuthState, UserState } from './auth.model';
import { AuthService } from './auth.service';
import {
  LocalStorageService,
  SnackbarMessageType,
  SnackBarService,
} from '../../../shared/services';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/signal-store-features';
import { HttpErrorResponse } from '@angular/common/http';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withRequestStatus(),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
      snackBarService = inject(SnackBarService),
    ) => ({
      setLoggedIn(loggedIn: boolean): void {
        patchState(store, (state) => ({
          ...state,
          loggedIn,
        }));
      },
      setLoggedOut(): void {
        patchState(store, (state) => ({
          ...state,
          loggedIn: false,
        }));
      },
      login: rxMethod<UserState>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((dto: UserState) =>
            authService.login(dto).pipe(
              tapResponse({
                next: (tokens) => {
                  patchState(
                    store,
                    {
                      loggedIn: true,
                      user: dto,
                    },
                    setFulfilled(),
                  );
                  localStorageService.setTokens(tokens.access_token, tokens.refresh_token)
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, { loggedIn: false }, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      ),

      register: rxMethod<UserState>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((dto: UserState) =>
            authService.register(dto).pipe(
              tapResponse({
                next: () => {
                  patchState(store, setFulfilled());
                  snackBarService.open(
                    'Успешно зарегестрированы',
                    SnackbarMessageType.Success,
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

      // logout: rxMethod<void>(
      //   pipe(
      //     tap(()=> patchState(store, setPending())),
      //     exhaustMap
      //   )
      // )
    }),
  ),
);

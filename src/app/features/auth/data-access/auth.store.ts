import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { authInitialState, AuthState, UserState } from './auth.model';
import { AuthService } from './auth.service';
import { SnackbarMessageType, SnackBarService } from '../../../shared/services';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../../../shared/signal-store-features';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieTokenService } from '../../../shared/services/cookie-token.service';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withRequestStatus(),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      cookieTokenService = inject(CookieTokenService),
      snackBarService = inject(SnackBarService),
    ) => {
      function loginRequest(dto: UserState) {
        return authService.login(dto);
      }

      function registerRequest(dto: UserState) {
        return authService.register(dto);
      }

      function getCurrentUserRequest() {
        return authService.getCurrentUser();
      }

      function setLoggedIn(loggedIn: boolean): void {
        patchState(store, (state) => ({
          ...state,
          loggedIn,
        }));
      }

      function setLoggedOut(): void {
        patchState(store, (state) => ({
          ...state,
          loggedIn: false,
        }));
      }

      const login = rxMethod<UserState>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap((dto: UserState) =>
            loginRequest(dto).pipe(
              tapResponse({
                next: (tokens) => {
                  patchState(store, setFulfilled());
                  cookieTokenService.setTokens(
                    tokens.access_token,
                    tokens.refresh_token,
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
      );

      const register = rxMethod<UserState>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap((dto: UserState) =>
            registerRequest(dto).pipe(
              tapResponse({
                next: () => {
                  patchState(store, setFulfilled());
                  snackBarService.open(
                    'Успешно зарегистрированы',
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
      );

      const getCurrentUser = rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            getCurrentUserRequest().pipe(
              tapResponse({
                next: (response) => {
                  patchState(
                    store,
                    {
                      loggedIn: true,
                      userInfo: response,
                    },
                    setFulfilled(),
                  );
                  snackBarService.open('OPENED', SnackbarMessageType.Success);
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
            ),
          ),
        ),
      );

      const loginAndGetCurrentUser = rxMethod<UserState>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap((dto: UserState) =>
            loginRequest(dto).pipe(
              tapResponse({
                next: (tokens) => {
                  cookieTokenService.setTokens(
                    tokens.access_token,
                    tokens.refresh_token,
                  );
                },
                error: ({ message }: HttpErrorResponse) => {
                  patchState(store, setError(message));
                  snackBarService.open(message, SnackbarMessageType.Error);
                },
              }),
              switchMap(() =>
                getCurrentUserRequest().pipe(
                  tapResponse({
                    next: (response) => {
                      patchState(
                        store,
                        {
                          loggedIn: true,
                          userInfo: response,
                        },
                        setFulfilled(),
                      );
                      snackBarService.open(
                        'Авторизация успешна!',
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
        ),
      );

      return {
        setLoggedIn,
        setLoggedOut,
        login,
        register,
        getCurrentUser,
        loginAndGetCurrentUser,
      };
    },
  ),
);

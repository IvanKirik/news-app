import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { authInitialState, AuthState, UserState } from './auth.model';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
      router = inject(Router),
    ) => ({
      setLoggedIn(loggedIn: boolean): void {
        patchState(store, (state) => ({
          ...state,
          loggedIn,
        }));
      },
      login: rxMethod<UserState>(
        pipe(
          exhaustMap((dto: UserState) =>
            authService.login(dto).pipe(
              tapResponse({
                next: (tokens) => {
                  patchState(store, {
                    loggedIn: true,
                    user: dto,
                  });
                  localStorageService.setItem(tokens.access_token);
                  router.navigateByUrl('');
                },
                error: (err) => {
                  console.error('Login failed', err);
                  patchState(store, { loggedIn: false });
                },
              }),
            ),
          ),
        ),
      ),

      register: rxMethod<UserState>(
        pipe(
          exhaustMap((dto: UserState) =>
            authService.register(dto).pipe(
              tapResponse({
                next: () => {
                  router.navigateByUrl('/');
                },
                error: (err) => console.error('Register failed', err),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);

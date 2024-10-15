import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../services';
import { AuthService } from '../../features/auth/data-access/auth.service';
import { Router } from '@angular/router';
import { DefaultResponse } from '../intefaces/default-response.interface';
import { LoginResponse } from '../../features/auth/data-access/auth.model';

export const authInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const tokens = localStorageService.getTokens();
  if (tokens && tokens.accessToken) {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    return next(authRequest).pipe(
      catchError((error) => {
        if (
          error.status === 401 &&
          !authRequest.url.includes('/login') &&
          !authRequest.url.includes('/refresh')
        ) {
          return handle401Error(
            authRequest,
            next,
            tokens.accessToken!,
            authService,
            router,
            localStorageService,
          );
        }
        return throwError(() => error);
      }),
    );
  }
  return next(request);
};

export const handle401Error = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  token: string,
  authService: AuthService,
  router: Router,
  localStorageService: LocalStorageService,
) => {
  return authService.refresh(token).pipe(
    switchMap((result: DefaultResponse | LoginResponse) => {
      let error = '';
      if ((result as DefaultResponse).error !== undefined) {
        error = (result as DefaultResponse).message;
      }
      const refreshResult = result as LoginResponse;
      if (!refreshResult.access_token || !refreshResult.refresh_token) {
        error = 'Ошибка авторизации';
      }
      if (error) {
        return throwError(() => new Error(error));
      }

      localStorageService.setTokens(
        refreshResult.access_token,
        refreshResult.refresh_token,
      );

      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshResult.access_token}`,
        },
      });

      return next(authRequest);
    }),
    catchError((error) => {
      localStorageService.removeTokens();
      router.navigate(['/']);
      return throwError(() => error);
    }),
  );
};

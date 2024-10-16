import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../services';
import { AuthService } from '../../features/auth/data-access/auth.service';
import { DefaultResponse } from '../intefaces/default-response.interface';
import { LoginResponse } from '../../features/auth/data-access/auth.model';

export const authInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
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
      return throwError(() => error);
    }),
  );
};

// todo any way to use http call from authState and then subscribe
// export const authInterceptor = (
//   request: HttpRequest<any>,
//   next: HttpHandlerFn,
// ): Observable<HttpEvent<any>> => {
//   const localStorageService = inject(LocalStorageService);
//   const authStore = inject(AuthStore); // Inject AuthStore to use its signals
//   const tokens = localStorageService.getTokens();
//
//   if (tokens && tokens.accessToken) {
//     const authRequest = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${tokens.accessToken}`,
//       },
//     });
//
//     return next(authRequest).pipe(
//       catchError((error) => {
//         if (
//           error.status === 401 &&
//           !authRequest.url.includes('/login') &&
//           !authRequest.url.includes('/refresh')
//         ) {
//
//           authStore.refresh(tokens.refreshToken!);
//           const isPending = computed(() => authStore.isPending());
//
//           // Check if the request is pending and wait for completion
//           if (isPending()) {
//             return new Observable<HttpEvent<any>>(observer => {
//               const checkRefresh = setInterval(() => {
//                 if (!isPending()) {
//                   clearInterval(checkRefresh);
//                   const updatedTokens = localStorageService.getTokens();
//
//                   if (updatedTokens?.accessToken) {
//                     const newAuthRequest = authRequest.clone({
//                       setHeaders: {
//                         Authorization: `Bearer ${updatedTokens.accessToken}`,
//                       },
//                     });
//
//                     // Subscribe to the next call and emit the results
//                     next(newAuthRequest).subscribe({
//                       next: (event) => observer.next(event),
//                       error: (err) => observer.error(err),
//                       complete: () => observer.complete(),
//                     });
//                   } else {
//                     observer.error(new Error('Token refresh failed.'));
//                   }
//                 }
//               }, 100); // Check every 100ms
//             });
//           }
//         }
//         return throwError(() => error);
//       })
//     );
//   }
//
//   return next(request);
// };

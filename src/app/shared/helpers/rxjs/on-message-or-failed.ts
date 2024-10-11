import { catchError, Observable, tap, throwError } from 'rxjs';

/**
 * Calls callback function when a stream got message or failed.
 * If it has been failed then error will be thrown.
 * @param callback Callback function.
 */
export const onMessageOrFailed =
  <T>(callback: Function) =>
    (source$: Observable<T>) =>
      source$.pipe(
        tap(() => callback()),
        catchError((error: unknown) => {
          callback();
          // because catching `() => Error` instead of `Error` in next `catchError` .
          return throwError(error);
        }),
      );

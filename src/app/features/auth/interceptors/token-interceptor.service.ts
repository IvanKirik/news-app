import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../shared/services';

export const tokenInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  let token: string | null = null;
  inject(LocalStorageService)
    .getItem()
    .subscribe((t) => (token = t));

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
};

import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

export const noAuthGuard = (): Observable<boolean | UrlTree> => {
  const storage = inject(LocalStorageService);
  const router = inject(Router);

  return storage.getItem().pipe(
    map((token) => {
      if (!token) {
        return router.parseUrl('');
      }
      return true;
    }),
    take(1),
  );
};

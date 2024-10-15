import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services';

export const noAuthGuard = (): boolean | UrlTree => {
  const router = inject(Router);
  const token = inject(LocalStorageService).getTokens().accessToken;

  return token ? true : router.parseUrl('');
};

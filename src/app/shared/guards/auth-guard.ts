import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CookieTokenService } from '../services/cookie-token.service';

export const noAuthGuard = (): boolean | UrlTree => {
  const router = inject(Router);
  const token = inject(CookieTokenService).getTokens().accessToken;

  return token ? true : router.parseUrl('');
};

import { AuthStore } from '../../features/auth/data-access/auth.store';
import { inject } from '@angular/core';
import { CookieTokenService } from '../../shared/services/cookie-token.service';

export const appInitializerFactory = () => {
  const authStore = inject(AuthStore);
  const cookieTokenService = inject(CookieTokenService);
  // todo if set httpOnly to backend how to setIsLoggedIn without access to cookies
  // backend add call to auth/status ?
  const isLoggedIn = !!cookieTokenService.getTokens().accessToken;
  authStore.setLoggedIn(isLoggedIn);
};

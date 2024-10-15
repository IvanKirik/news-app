import { LocalStorageService } from '../../shared/services';
import { AuthStore } from '../../features/auth/data-access/auth.store';
import { inject } from '@angular/core';

export const appInitializerFactory = () => {
  const authStore = inject(AuthStore);
  const localStorageService = inject(LocalStorageService);
  const isLoggedIn = !!localStorageService.getTokens().accessToken;
  authStore.setLoggedIn(isLoggedIn);
};

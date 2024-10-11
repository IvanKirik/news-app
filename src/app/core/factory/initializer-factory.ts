import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AuthStore } from '../../features/auth/data-access/auth.store';
import { inject } from '@angular/core';

export const appInitializerFactory = () => {
  const authStore = inject(AuthStore);
  const localStorageService = inject(LocalStorageService);
  const isLoggedIn = !!localStorageService.getAccessToken();
  authStore.setLoggedIn(isLoggedIn);
};

import { AuthStore } from '../../features/auth/data-access/auth.store';
import { inject } from '@angular/core';

export const appInitializerFactory = () => {
  const authStore = inject(AuthStore);
  authStore.getCurrentUser();
};

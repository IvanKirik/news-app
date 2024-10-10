import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments';
import { API_URL } from './core/services/api-url.token';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './features/auth/data-access/token-interceptor.service';
import { appInitializerFactory } from './core/factory/initializer-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    { provide: API_URL, useValue: environment.API_DOMAIN },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
    },
  ],
};

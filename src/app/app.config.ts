import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Environment } from './core/intefaces/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { appInitializerFactory } from './core/factory/initializer-factory';
import { tokenInterceptor } from './features/auth/data-access/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    DialogService,
    { provide: Environment, useValue: environment },
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
    },
  ],
};

import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from '../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../../environments';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Environment } from '../shared/intefaces';
import { DialogService } from 'primeng/dynamicdialog';
import { appInitializerFactory } from './factory/initializer-factory';
import { authInterceptor } from '../shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    DialogService,
    { provide: Environment, useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
    },
  ],
};

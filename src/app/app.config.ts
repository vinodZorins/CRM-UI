import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/jwt.interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true
    }
  ]
};
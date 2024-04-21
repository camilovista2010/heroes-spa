import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MarvelApiInterceptor } from '@shared/interceptor/marvel-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withViewTransitions(),
      withPreloading(PreloadAllModules)
    ),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MarvelApiInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ]
};

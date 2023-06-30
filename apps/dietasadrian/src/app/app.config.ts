import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  RouterModule,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { routes } from '../routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      RouterModule,
      BrowserModule,
      BrowserAnimationsModule,
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot({ routerState: RouterState.Full }),
      StoreModule.forRoot(
        {},
        {
          metaReducers: [],
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
          },
        }
      )
    ),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    provideStoreDevtools({
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: 70,
    }),
  ],
};

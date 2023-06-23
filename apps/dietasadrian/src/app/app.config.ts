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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      RouterModule,
      BrowserModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(
        {},
        {
          metaReducers: [],
          runtimeChecks: {
            strictActionImmutability: true,
            strictStateImmutability: true,
          },
        }
      ),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot({ routerState: RouterState.Full })
    ),
    provideStoreDevtools({ logOnly: !isDevMode(), trace: true, traceLimit: 70 }),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
};

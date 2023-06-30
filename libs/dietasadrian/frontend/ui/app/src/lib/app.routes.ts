import { Routes } from '@angular/router';
import { SharedModuleModule, SharedStoreFacade } from '@shared-modules';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './components/app/app.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { OobcodeCheckerComponent } from './components/oobcode-checker/oobcode-checker.component';
import { ErrorComponent } from './components/error/error.component';
import { RequestPassResetComponent } from './components/request-pass-reset/request-pass-reset.component';

import { importProvidersFrom } from '@angular/core';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import { environment } from '@enviroments/environment.prod';

const redirectLoggedIn = () => redirectLoggedInTo(['landing']);
const redirectUnauthorized = () => redirectUnauthorizedTo(['login']);

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'prefix',
    providers: [
      SharedModuleModule,
      CommonModule,
      importProvidersFrom(
        provideAuth(() => {
          return getAuth();
          ///////////////////////////////////////////////////////////////////
          /*
          NOT WORKING, IF THE USER IS NOT EMAIL VERIFIED IT WILL CONTINUE TO
          THE LANDING PAGE
          */
         //////////////////////////////////////////////////////////////////
        }),
        provideFirebaseApp(() => initializeApp(environment.firebase))
      ),
      {
        provide: FIREBASE_OPTIONS,
        useValue: environment.firebase,
      },
    ],

    children: [
      {
        path: 'landing',
        pathMatch: 'prefix',
        ...canActivate(redirectUnauthorized),
        loadChildren: () => import('@libs/landing-page').then((r) => r.routes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        ...canActivate(redirectLoggedIn),
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
      },
      {
        pathMatch: 'full',
        component: EmailVerificationComponent,
        path: 'email-verification',
      },
      {
        path: 'passReset',
        component: RequestPassResetComponent,
        pathMatch: 'full',
      },
      {
        path: 'code',
        component: OobcodeCheckerComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        component: ErrorComponent,
        pathMatch: 'full',
      },
    ],
  },
];

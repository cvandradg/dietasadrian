import { getAuth } from 'firebase/auth';
import { Routes } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CommonModule } from '@angular/common';
import { provideAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { canActivate } from '@angular/fire/auth-guard';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@enviroments/environment';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { unverifiedTo, verifiedTo } from '@helperFunctionsService';
import { RegisterComponent } from './components/register/register.component';
import { OobcodeCheckerComponent } from './components/oobcode-checker/oobcode-checker.component';
import { RequestPassResetComponent } from './components/request-pass-reset/request-pass-reset.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const redirectLoggedIn = () => verifiedTo(['landing']);
const redirectUnauthorized = () => unverifiedTo(['login']);

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AppComponent,
    providers: [
      CommonModule,
      SharedModuleModule,
      importProvidersFrom(
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebase))
      ),
      {
        provide: FIREBASE_OPTIONS,
        useValue: environment.firebase,
      },
    ],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing',
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        ...canActivate(redirectLoggedIn),
      },
      {
        path: 'landing',
        pathMatch: 'prefix',
        ...canActivate(redirectUnauthorized),
        loadChildren: () => import('@libs/landing-page').then((r) => r.routes),
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

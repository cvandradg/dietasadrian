import { Routes } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './components/app/app.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { OobcodeCheckerComponent } from './components/oobcode-checker/oobcode-checker.component';
import { ErrorComponent } from './components/error/error.component';
import { RequestPassResetComponent } from './components/request-pass-reset/request-pass-reset.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'prefix',
    providers: [
      SharedModuleModule,
      CommonModule,
      AngularFireAuthModule,
      {
        provide: FIREBASE_OPTIONS,
        useValue: {
          apiKey: 'AIzaSyAnZfF6TYw1ubCSkV8RhClrm8RjVLqqGlE',
          authDomain: 'dietasadrianbadillafirebase.firebaseapp.com',
          databaseURL:
            'https://dietasadrianbadillafirebase-default-rtdb.firebaseio.com',
          projectId: 'dietasadrianbadillafirebase',
          storageBucket: 'dietasadrianbadillafirebase.appspot.com',
          messagingSenderId: '706318825388',
          appId: '1:706318825388:web:9fe85e9af68b552359ac09',
        },
      },
    ],

    children: [
      {
        path: 'landing',
        pathMatch: 'prefix',
        loadChildren: () =>
          import('@libs/landing-page/landing-page.routes').then(
            (routes) => routes.landingPageRoutes
          ),
      },
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
      },
      {
        path: 'email-verification',
        component: EmailVerificationComponent,
        pathMatch: 'full',
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

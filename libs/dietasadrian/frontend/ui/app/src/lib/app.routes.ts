import { Route } from '@angular/router';
import { AuthGuard } from '@guards/auth-guard/auth-guard.guard';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { OobcodeCheckerComponent } from './components/oobcode-checker/oobcode-checker.component';

export const appRoutes: Route[] = [
  {
    path: 'landing',
    component: AppComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@libs/dietas/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'dietas',
        loadChildren: () =>
          import('@libs/dietas/dietas.module').then((m) => m.DietasModule),
      },
    ],
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
    component: PassResetComponent,
    pathMatch: 'full',
  },
  {
    path: 'code',
    component: OobcodeCheckerComponent,
    pathMatch: 'full',
  },
];

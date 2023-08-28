import { Routes } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { unverifiedTo, verifiedTo } from '@helperFunctionsService';
import { RegisterComponent } from './components/register/register.component';
import { OobcodeCheckerComponent } from './components/oobcode-checker/oobcode-checker.component';
import { RequestPassResetComponent } from './components/request-pass-reset/request-pass-reset.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const redirectLoggedIn = () => verifiedTo(['landing']);
const redirectUnauthorized = () => unverifiedTo(['login']);

export const routes: Routes = [
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
        path: 'code',
        component: OobcodeCheckerComponent,
        pathMatch: 'full',
    },
    {
        path: 'passReset',
        component: RequestPassResetComponent,
        pathMatch: 'full',
    },
    {
        pathMatch: 'full',
        component: EmailVerificationComponent,
        path: 'email-verification',
    },
];

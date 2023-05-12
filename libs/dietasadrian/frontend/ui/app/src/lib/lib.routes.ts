import { Route } from '@angular/router';
import { AuthGuard } from '@guards/auth-guard/auth-guard.guard';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';

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
];

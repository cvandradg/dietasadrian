import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { domainGuard } from "@guards/auth-guard/auth-guard.guard";

export const landingPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LandingPageComponent,
    canActivateChild: [domainGuard],
    children: [
      {
        path: 'dietas',
        pathMatch: 'prefix',
        loadChildren: () => import('@libs/dietas/dietas.routes').then(r => r.dietasRoutes)
      }
    ]
  },
];

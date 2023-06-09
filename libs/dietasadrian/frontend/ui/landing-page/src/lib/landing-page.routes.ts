import { Routes, provideRouter } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { dietasRoutes } from "@libs/dietas/dietas.routes";

export const landingPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LandingPageComponent,
    children: [
      {
        path: 'dietas',
        pathMatch: 'prefix',
        loadChildren: () => import('@libs/dietas/dietas.routes').then(r => r.dietasRoutes)
      }
    ]
  },
];

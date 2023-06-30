import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
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

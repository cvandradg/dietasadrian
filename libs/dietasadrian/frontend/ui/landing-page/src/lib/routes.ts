import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('@libs/client/lib.routes').then(r => r.clientRoutes)
      }
    ]
  },
];

import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const landingPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LandingPageComponent,
    children: [
      {
        path: 'dietas',
        loadChildren: () => import('@libs/dietas/dietas.module').then(m => m.DietasModule)
      }
    ],
  },
];

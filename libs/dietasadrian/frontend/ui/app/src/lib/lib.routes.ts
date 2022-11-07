import { Route } from '@angular/router';
import { AppComponent } from './components/app/app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
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
];

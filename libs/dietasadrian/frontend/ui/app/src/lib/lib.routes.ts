import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@libs/dietas/landing-page.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'dietas',
    loadChildren: () =>
      import('@libs/dietas/dietas.module').then((m) => m.DietasModule),
  },
];
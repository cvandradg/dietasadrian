import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@dietasadrian/frontend/app').then(lib => lib.appRoutes),
  },
];

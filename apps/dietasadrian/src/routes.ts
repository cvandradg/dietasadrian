export const routes = [
  {
    path: '',
    loadChildren: () =>
      import('@dietasadrian/frontend/app').then((lib) => lib.appRoutes),
  },
];

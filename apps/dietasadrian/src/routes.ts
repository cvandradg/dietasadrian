export const routes = [
  {
    path: '',
    loadChildren: () =>
      import('@dietasadrian/frontend/app').then((module) => module.AppModule),
  },
];

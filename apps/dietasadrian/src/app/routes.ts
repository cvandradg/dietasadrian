import {  Routes } from '@angular/router';

const routes:Routes = [
    {
      path: '',
      loadChildren: () => import('@libs/dietas/dietas.module').then(m => m.DietasModule)
    }
  ];


  export default routes; 
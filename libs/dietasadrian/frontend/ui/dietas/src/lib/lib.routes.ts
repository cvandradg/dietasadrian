import { Routes } from '@angular/router';
import { MyDietsComponent } from './components/my-diets/my-diets.component';
import { CreateDietsComponent } from './components/create-diets/create-diets.component';
import { UserInputFormComponent } from './components/user-input-form/user-input-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'crear', pathMatch: 'prefix' },
  { path: 'crear', pathMatch: 'full', component: CreateDietsComponent },
  { path: 'misdietas', pathMatch: 'full', component: MyDietsComponent },
  {
    path: 'formulario',
    pathMatch: 'prefix',
    component: UserInputFormComponent,
  },
];

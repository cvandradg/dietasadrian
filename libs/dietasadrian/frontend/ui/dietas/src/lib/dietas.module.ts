import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyDietsComponent } from './components/my-diets/my-diets.component';
import { CreateDietsComponent } from './components/create-diets/create-diets.component';
import { UserInputFormComponent } from './components/user-input-form/user-input-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'misdietas', pathMatch: 'full', component: MyDietsComponent },
      { path: 'crear', pathMatch: 'full', component: CreateDietsComponent },
      { path: 'formulario', pathMatch: 'full', component: UserInputFormComponent },
      { path: '', redirectTo: 'formulario', pathMatch: 'prefix' },
    ]),
  ],
})
export class DietasModule {}

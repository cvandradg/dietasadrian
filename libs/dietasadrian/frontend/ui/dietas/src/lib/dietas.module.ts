import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyDietsComponent } from './components/my-diets/my-diets.component';
import { CreateDietsComponent } from './components/create-diets/create-diets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'misdietas', pathMatch: 'full', component: MyDietsComponent },
      { path: 'crear', pathMatch: 'full', component: CreateDietsComponent },
      { path: '', redirectTo: '/dietas', pathMatch: 'full' },
    ]),
  ],
})
export class DietasModule {}

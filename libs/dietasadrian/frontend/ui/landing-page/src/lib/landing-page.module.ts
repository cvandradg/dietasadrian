import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { Fontawesome } from '@classes/fontawesome';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LandingPageComponent },
    ]),
  ],
})
export class LandingPageModule  extends Fontawesome {}

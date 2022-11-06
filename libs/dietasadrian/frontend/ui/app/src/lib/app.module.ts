import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
})
export class AppModule {}

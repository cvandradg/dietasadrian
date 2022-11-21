import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { appRoutes } from './lib.routes';
import { SharedModuleModule } from '@shared-modules';

@NgModule({
  imports: [SharedModuleModule, CommonModule],
  providers: [provideRouter(appRoutes)],
})
export class AppModule {}

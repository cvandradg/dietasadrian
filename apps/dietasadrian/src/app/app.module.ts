import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModuleModule } from '@shared-modules';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: ()=> import('@dietasadrian/frontend/app').then((module)=>module.AppModule)
        }
      ]
    ),
    BrowserAnimationsModule,
    SharedModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

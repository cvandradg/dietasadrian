import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule, withRouterConfig } from '@angular/router';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from '../routes';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule],
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        canceledNavigationResolution: 'computed',
      })
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

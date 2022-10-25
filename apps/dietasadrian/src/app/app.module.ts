import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import routes from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModuleModule } from '@shared-modules';
import { HeaderComponentModule } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModuleModule,
    HeaderComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

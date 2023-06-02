import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { appRoutes } from './lib.routes';
import { SharedModuleModule } from '@shared-modules';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    SharedModuleModule,
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAnZfF6TYw1ubCSkV8RhClrm8RjVLqqGlE',
      authDomain: 'dietasadrianbadillafirebase.firebaseapp.com',
      databaseURL:
        'https://dietasadrianbadillafirebase-default-rtdb.firebaseio.com',
      projectId: 'dietasadrianbadillafirebase',
      storageBucket: 'dietasadrianbadillafirebase.appspot.com',
      messagingSenderId: '706318825388',
      appId: '1:706318825388:web:9fe85e9af68b552359ac09',
    }),
    AngularFireAuthModule
  ],
  providers: [provideRouter(appRoutes)],
})
export class AppModule {}

import { getAuth } from 'firebase/auth';
import { Routes } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CommonModule } from '@angular/common';
import { provideAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { canActivate } from '@angular/fire/auth-guard';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@enviroments/environment';
import { AppComponent } from './components/app/app.component';
import { ErrorComponent } from './components/error/error.component';
import { unverifiedTo, verifiedTo } from '@helperFunctionsService';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AppComponent,
    providers: [
      CommonModule,
      SharedModuleModule,
      importProvidersFrom(
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebase))
      ),
      {
        provide: FIREBASE_OPTIONS,
        useValue: environment.firebase,
      },
    ],

    children: [
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: ()=> import('@libs/login').then((r) => r.routes),
      },
      {
        path: '**',
        component: ErrorComponent,
        pathMatch: 'full',
      },
    ],
  },
];

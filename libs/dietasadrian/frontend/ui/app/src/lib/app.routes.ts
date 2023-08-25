import { getAuth } from 'firebase/auth';
import { Routes } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { CommonModule } from '@angular/common';
import { provideAuth } from '@angular/fire/auth';
import { importProvidersFrom } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@enviroments/environment';
import { ErrorComponent } from './components/error/error.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    loadChildren: () => import('@libs/login').then((r) => r.routes),
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
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full',
  },
];

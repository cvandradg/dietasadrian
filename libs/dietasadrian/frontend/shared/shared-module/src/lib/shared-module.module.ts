import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { HelperService } from './services/helperFunctions.service';
import { Fontawesome } from './classes/fontawesome';
import { AuthService } from './services/auth/auth-service.service';

@NgModule({
  imports: [CommonModule, MODULES],
  exports: [MODULES],
  providers: [HelperService, AuthService],
})
export class SharedModuleModule extends Fontawesome {}

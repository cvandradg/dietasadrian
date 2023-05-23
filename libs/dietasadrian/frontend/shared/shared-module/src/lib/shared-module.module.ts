import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { HelperService } from './services/helperFunctions.service';
import { HelperErrorHandlerService } from './services/helperErrorHandler.service';
import { Fontawesome } from './classes/fontawesome';
import { AuthService } from './services/auth/auth-service.service';
import { COMPONENTS } from './export-components';

@NgModule({
  imports: [CommonModule, MODULES, COMPONENTS],
  exports: [MODULES, COMPONENTS],
  providers: [HelperService, HelperErrorHandlerService, AuthService],
})
export class SharedModuleModule extends Fontawesome {}

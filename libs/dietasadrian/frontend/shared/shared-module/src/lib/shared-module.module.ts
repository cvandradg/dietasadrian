import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';
import { COMPONENTS } from './export-components';

import { HelperService } from './services/helperFunctions.service';
import { Fontawesome } from './classes/fontawesome';

@NgModule({
  imports: [CommonModule, MODULES, COMPONENTS],
  exports: [MODULES, COMPONENTS],
  providers: [HelperService],
})
export class SharedModuleModule extends Fontawesome {}

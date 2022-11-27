import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { HelperService } from './services/helperFunctions.service';
import { Fontawesome } from './classes/fontawesome';

@NgModule({
  imports: [CommonModule, MODULES],
  exports: [MODULES],
  providers: [HelperService],
})
export class SharedModuleModule extends Fontawesome {}

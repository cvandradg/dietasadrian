import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './exports/export-modules';

import { Fontawesome } from './classes/fontawesome';
import { SERVICES } from './exports/export-services';
import { COMPONENTS } from './exports/export-components';

@NgModule({
  imports: [CommonModule, MODULES, COMPONENTS],
  exports: [MODULES, COMPONENTS],
  providers: [SERVICES],
})
export class SharedModuleModule extends Fontawesome {}

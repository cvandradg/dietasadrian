import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { ConfirmationDialogComponentModule } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddIngredientDialogComponentModule } from './dialogs/add-ingredient-dialog/add-ingredient-dialog.component';
import { HelperService } from './services/helperFunctions.service';
import { Fontawesome } from './classes/fontawesome';

const COMPONENTS = [
  ConfirmationDialogComponentModule,
  AddIngredientDialogComponentModule,
];

@NgModule({
  imports: [CommonModule, MODULES, COMPONENTS],
  exports: [MODULES, COMPONENTS],
  providers: [HelperService],
})
export class SharedModuleModule extends Fontawesome {}

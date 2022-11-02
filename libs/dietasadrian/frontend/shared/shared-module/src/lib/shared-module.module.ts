import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { ConfirmationDialogComponentModule } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddIngredientDialogComponentModule } from './dialogs/add-ingredient-dialog/add-ingredient-dialog.component';

const COMPONENTS = [
  ConfirmationDialogComponentModule,
  AddIngredientDialogComponentModule,
];

const modules = [];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES, COMPONENTS],
})
export class SharedModuleModule {}

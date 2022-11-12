import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MODULES } from './export-modules';

import { ConfirmationDialogComponentModule } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { AddIngredientDialogComponentModule } from './dialogs/add-ingredient-dialog/add-ingredient-dialog.component';
import { HelperService } from './services/helperFunctions.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faBookOpenCover,
  faSack,
  faUserCircle,
} from '@fortawesome/pro-duotone-svg-icons';

const COMPONENTS = [
  ConfirmationDialogComponentModule,
  AddIngredientDialogComponentModule,
];

@NgModule({
  imports: [CommonModule, MODULES, COMPONENTS],
  exports: [MODULES, COMPONENTS],
  providers: [HelperService],
})
export class SharedModuleModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBookOpenCover, faSack, faUserCircle);
  }
}

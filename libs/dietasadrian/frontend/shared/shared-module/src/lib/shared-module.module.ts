import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponentModule } from './dialogs/confirmation-dialog/confirmation-dialog.component';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  DragDropModule,
  MatFormFieldModule,
  MatChipsModule,
  MatDialogModule,
];

const COMPONENTS = [ConfirmationDialogComponentModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES, COMPONENTS],
})
export class SharedModuleModule {}

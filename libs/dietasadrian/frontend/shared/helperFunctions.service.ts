import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  AddIngredientDialogComponent,
} from './shared-module/src';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private dialog: MatDialog) {}

  findIndex(array: Array<any>, id: string): number {
    return array.findIndex((item) => item.id === id);
  }

  openConfirmationDialog(message: string): MatDialogRef<any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        width: '250px',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        message,
      },
    });
  }

  openAddIngredientDialog(): MatDialogRef<any> {
    return this.dialog.open(AddIngredientDialogComponent, {
      data: {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
      },

      maxWidth: '90vw',
      maxHeight: '90vh',
      height: '90%',
      width: '90%',
      panelClass: 'smaller'
    });
  }
}

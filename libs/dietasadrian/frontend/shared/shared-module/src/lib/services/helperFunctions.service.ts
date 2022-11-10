import { Injectable, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddIngredientDialogComponent } from '../dialogs/add-ingredient-dialog/add-ingredient-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

export { debounce } from '../decorators/debounce.decorator';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  static matDialogRef: MatDialogRef<any, any>;

  constructor(@Optional() private dialog: MatDialog) {}

  getMatDialog() {
    return HelperService.matDialogRef;
  }

  findIndex(array: Array<any>, { mealId }: any): number {
    return array.findIndex((item: any) => item.id === mealId);
  }

  openConfirmationDialog(message: string): MatDialogRef<any> {
    return (HelperService.matDialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '250px',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '100ms',
        closeOnNavigation: false,
        data: {
          message,
        },
      }
    ));
  }

  openAddIngredientDialog(): MatDialogRef<any> {
    return (HelperService.matDialogRef = this.dialog.open(
      AddIngredientDialogComponent,
      {
        hasBackdrop: true,
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'dialog-size',
        enterAnimationDuration: '200ms',
        closeOnNavigation: false,
        data: {},
      }
    ));
  }
}

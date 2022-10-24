import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared-module/src/lib/dialogs/confirmation-dialog/confirmation-dialog.component';

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
}

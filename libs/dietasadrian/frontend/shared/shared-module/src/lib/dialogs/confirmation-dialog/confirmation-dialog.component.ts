import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MODULES } from '../../export-modules';

@Component({
  selector: 'dietas-adrian-nx-workspace-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

@NgModule({
  imports: [CommonModule, MODULES],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogComponentModule {}

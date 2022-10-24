import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dietas-adrian-nx-workspace-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
}

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogComponentModule {}

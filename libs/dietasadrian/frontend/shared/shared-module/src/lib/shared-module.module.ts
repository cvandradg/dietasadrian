import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';


const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  DragDropModule,
  MatFormFieldModule,
  MatChipsModule,
]

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES]
})
export class SharedModuleModule {}

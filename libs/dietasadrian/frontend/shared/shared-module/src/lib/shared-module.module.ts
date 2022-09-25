import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
]

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES]
})
export class SharedModuleModule {}

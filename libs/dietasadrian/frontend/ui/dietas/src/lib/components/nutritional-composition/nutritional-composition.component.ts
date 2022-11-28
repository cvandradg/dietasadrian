import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModuleModule],

  selector: 'dietas-adrian-nx-workspace-nutritional-composition',
  templateUrl: './nutritional-composition.component.html',
  styleUrls: ['./nutritional-composition.component.scss'],
})
export class NutritionalCompositionComponent {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-nutritional-composition',
  templateUrl: './nutritional-composition.component.html',
  styleUrls: ['./nutritional-composition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [CommonModule, SharedModuleModule],
})
export class NutritionalCompositionComponent {}

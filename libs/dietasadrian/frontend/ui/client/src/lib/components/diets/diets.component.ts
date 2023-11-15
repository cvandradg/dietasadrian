import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lib-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietsComponent { }

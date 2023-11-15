import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lib-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodComponent {}

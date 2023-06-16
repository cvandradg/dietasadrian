import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-my-diets',
  templateUrl: './my-diets.component.html',
  styleUrls: ['./my-diets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDietsComponent {}

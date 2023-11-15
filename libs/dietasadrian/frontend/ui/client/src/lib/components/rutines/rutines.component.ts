import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lib-rutines',
  templateUrl: './rutines.component.html',
  styleUrls: ['./rutines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RutinesComponent {}

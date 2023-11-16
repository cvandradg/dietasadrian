import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-utilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilitiesComponent { }

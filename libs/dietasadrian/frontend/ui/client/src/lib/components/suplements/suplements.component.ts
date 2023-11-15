import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lib-suplements',
  templateUrl: './suplements.component.html',
  styleUrls: ['./suplements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuplementsComponent {}

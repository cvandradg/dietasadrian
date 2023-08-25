import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedStoreFacade } from '@shared-modules';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  facade = inject(SharedStoreFacade);
}

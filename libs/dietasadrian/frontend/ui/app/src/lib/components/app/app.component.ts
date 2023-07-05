import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedStoreFacade } from '@shared-modules';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, RouterModule],
})
export class AppComponent {
  facade = inject(SharedStoreFacade);
}

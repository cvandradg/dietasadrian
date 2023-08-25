import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModuleModule, SharedStoreFacade } from '@shared-modules';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from "@shared-modules/components/navbar/navbar.component";

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, RouterModule, SharedModuleModule],
})
export class AppComponent {
  facade = inject(SharedStoreFacade);
}

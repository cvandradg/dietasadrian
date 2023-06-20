import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SecondaryAnimatedButtonComponent } from '@shared-modules';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [CommonModule, SecondaryAnimatedButtonComponent, RouterModule],
})
export class ErrorComponent {
  location = inject(Location);
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [CommonModule, RouterModule, SharedModuleModule],
})
export class LandingPageComponent {}

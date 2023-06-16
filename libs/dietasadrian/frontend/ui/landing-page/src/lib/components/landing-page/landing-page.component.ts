import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SharedModuleModule],
})
export class LandingPageComponent extends Handler {
}

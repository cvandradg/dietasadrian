import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';


@Component({
  standalone: true,
  selector: 'lib-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SharedModuleModule],
})
export class DashboardComponent extends firebaseAuthHelper {}

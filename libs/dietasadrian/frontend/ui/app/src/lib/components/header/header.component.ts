import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModuleModule, RouterModule],
  selector: 'dietas-adrian-nx-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}

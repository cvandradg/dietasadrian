import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { RouterModule } from '@angular/router';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { MODULES } from '@shared-modules/exports/export-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MODULES, RouterModule],
})
export class NavbarComponent extends firebaseAuthHelper implements OnInit {
  screenWidth = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
}

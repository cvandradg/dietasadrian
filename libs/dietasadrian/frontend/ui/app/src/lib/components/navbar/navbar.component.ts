import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModuleModule, RouterModule],
  selector: 'dietas-adrian-nx-workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends Handler implements OnInit {
  screenWidth = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
}

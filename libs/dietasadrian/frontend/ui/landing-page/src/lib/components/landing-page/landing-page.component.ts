import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faBookOpenCover,
  faSack,
  faUserCircle,
} from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'dietas-adrian-nx-workspace-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBookOpenCover, faSack, faUserCircle);
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, SharedModuleModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class LandingPageComponentModule {}

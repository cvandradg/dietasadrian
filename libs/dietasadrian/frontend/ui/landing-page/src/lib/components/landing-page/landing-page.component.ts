import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';

@Component({
  selector: 'dietas-adrian-nx-workspace-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {}

@NgModule({
  imports: [CommonModule, RouterModule, SharedModuleModule],
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class LandingPageComponentModule {
}

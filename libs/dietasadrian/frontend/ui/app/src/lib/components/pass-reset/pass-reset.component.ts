import { Component } from '@angular/core';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  imports: [SharedModuleModule],
})
export class PassResetComponent extends firebaseAuthHelper {}

import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { passResetStore } from './pass-reset.store';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  imports: [CommonModule, SharedModuleModule],
  providers: [passResetStore],
})
export class PassResetComponent extends firebaseAuthHelper {

  @Input()
  public user!: string;

  passResetStore = inject(passResetStore);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginStore } from './login.store';
import { PassResetComponent } from '../pass-reset/pass-reset.component';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  selector: 'dietas-adrian-nx-workspace-login',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NavbarComponent,
    SharedModuleModule,
    RouterModule,
    PassResetComponent,
  ],
  providers: [LoginStore],
})
export class LoginComponent extends firebaseAuthHelper {
  readonly loginStore = inject(LoginStore);
}

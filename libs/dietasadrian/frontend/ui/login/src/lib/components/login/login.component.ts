import { LoginStore } from './login.store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { PassResetComponent } from '../pass-reset/pass-reset.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '@shared-modules/components/navbar/navbar.component';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  selector: 'dietas-adrian-nx-workspace-login',
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

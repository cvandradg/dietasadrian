import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { RouterModule } from '@angular/router';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { Subject, map, combineLatest } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegisterStore } from './register.store';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
  providers: [RegisterStore],
})
export class RegisterComponent extends firebaseAuthHelper {
  readonly registerStore = inject(RegisterStore);
  isPassStrong$ = new Subject<boolean>();

  isValidUser$ = this.loginInputForm.valueChanges.pipe(
    map(() => !this.loginInputForm.controls.user.invalid)
  );

  enableButton$ = combineLatest([this.isValidUser$, this.isPassStrong$]).pipe(
    map(([isValidUser, isPassStrong]) => isValidUser && isPassStrong)
  );

  // createAccount$ = this.onCreateAccount$.pipe(
  //   switchMap(() =>
  //     this.authService.createAccount(
  //       this.loginInputForm.value as Credentials
  //     )
  //   ),
  //   map((res: any) => {
  //     this.loginInputForm.controls.pass.disable();
  //     this.loginInputForm.controls.user.disable();

  //     this.authService.sendEmailVerification(res?.user);
  //     return true;
  //   })
  // );
}

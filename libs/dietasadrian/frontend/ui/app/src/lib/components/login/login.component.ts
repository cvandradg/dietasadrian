import {
  Component,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModuleModule } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Handler } from '@classes/Handler';

import { validations } from '@shared-modules/types/types';
import { showLoading } from '../../+state/general-app.actions';
import { isLoading, selectFeature } from '../../+state/general-app.selectors';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HeaderComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler implements OnInit, OnDestroy {
  loginInputForm = this.formBuilder.group({
    user: validations(Validators.email),
    pass: validations(),
  });

  constructor(private formBuilder: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    if (localStorage.getItem('attemptToLoggedIn') === 'true') this.getSession();

    this.store?.dispatch(showLoading());
  }

  login() {
    this.clearVariables();

    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .pipe(this.finalize(), takeUntil(this.destroy))
      .subscribe(this.loginObserver);
  }

  getSession() {
    this.authService.getUserSession().subscribe(this.getSessionsObserver);
  }

  forgotPassword() {
    this.clearVariables();
    this.loadingRecoverPassword = true;

    this.authService
      .recoverPassword(this.loginInputForm.value.user as string)
      .pipe(this.finalize(), takeUntil(this.destroy))
      .subscribe(this.forgotPasswordObserver);
  }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(this.finalize(), takeUntil(this.destroy))
      .subscribe(this.brandSigninObserver);
  }

  createAccountRedirect() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

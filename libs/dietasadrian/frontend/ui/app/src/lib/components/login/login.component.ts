import { Component, Injector, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModuleModule } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Handler } from '@classes/Handler';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HeaderComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler implements OnDestroy {
  
  loginInputForm = this.formBuilder.group({
    user: [
      '',
      [
        Validators.required,
        Validators.min(5),
        Validators.max(30),
        Validators.email,
      ],
    ],
    pass: ['', [Validators.required, Validators.min(5), Validators.max(30)]],
  });

  constructor(private formBuilder: FormBuilder, private injector: Injector) {
    super(injector);
  }

  login() {
    if (this.loginInputForm.invalid) {
      return;
    }

    this.clearVariables();
    this.loading = true;

    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .pipe(takeUntil(this.destroy))
      .subscribe(this.loginObserver);
  }

  forgotPassword() {
    this.clearVariables();
    this.loadingRecoverPassword = true;

    if (this.loginInputForm.value.user === '') {
      this.missingMail = true;
      this.loadingRecoverPassword = false;
      return;
    }

    this.authService
      .recoverPassword(this.loginInputForm.value.user as string)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.forgotPasswordObserver);
  }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(takeUntil(this.destroy))
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

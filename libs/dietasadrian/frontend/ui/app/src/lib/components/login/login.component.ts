import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModuleModule } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HeaderComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent implements OnDestroy {
  destroy = new Subject();

  loading = false;
  loadingRecoverPassword = false;
  missingMail = false;
  successMailSent = false;
  verificationRequired = false;

  error = {
    status: false,
    message: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private errorHelper: HelperErrorHandlerService,
    private router: Router
  ) {}

  loginInputForm = this.formBuilder.group({
    user: [
      '',
      [
        Validators.required, // Validators
        Validators.min(5),
        Validators.max(30),
        Validators.email,
      ],
    ],
    pass: [
      '',
      [
        Validators.required, // Validators
        Validators.min(5),
        Validators.max(30),
      ],
    ],
  });

  onSubmit() {
    if (this.loginInputForm.invalid) {
      return;
    }

    this.clearVariables();
    this.loading = true;

    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (UserCredendial: any) => {
          this.clearVariables();

          if (!UserCredendial.user._delegate.emailVerified) {
            this.authService.sendEmailVerification(UserCredendial);
            this.verificationRequired = true;
            return;
          }

          this.router.navigate(['/landing/dietas/crear']);
          return 'ok';
        },
        error: (err) => {
          this.loading = false;

          this.error = this.errorHelper.handleError(err);
          return 'err';
        },
      });
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
      .subscribe({
        next: (res) => {
          this.successMailSent = true;
          this.loadingRecoverPassword = false;
          return 'ok';
        },
        error: (err) => {
          this.successMailSent = true;
          this.loadingRecoverPassword = false;
          this.error = this.errorHelper.handleError(err);
          return 'err';
        },
      });
  }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          this.successMailSent = true;
          this.loadingRecoverPassword = false;
          this.router.navigate(['/landing/dietas/crear']);
          return 'ok';
        },
        error: (err) => {
          this.error = this.errorHelper.handleError(err);

          return 'err';
        },
      });
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  clearVariables() {
    this.loading = false;
    this.loadingRecoverPassword = false;

    this.missingMail = false;
    this.successMailSent = false;
    this.verificationRequired = false;

    this.error = {
      status: false,
      message: '',
    };
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

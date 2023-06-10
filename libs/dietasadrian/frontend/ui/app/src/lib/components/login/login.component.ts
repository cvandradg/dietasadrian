import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler implements OnInit {
  loadingRecoverPassword = false;

  ngOnInit(): void {
    if (localStorage.getItem('attemptToLoggedIn') === 'true') this.getSession();
  }

  login() {
    this.clearVariables();
    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => this.onLogin(res),
        error: this.observerError,
      });
  }

  getSession() {
    this.authService
      .getUserSession()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => this.onGetSessionsObserver(res),
        error: this.observerError,
      });
  }

  forgotPassword() {
    this.clearVariables();
    this.loadingRecoverPassword = true;

    this.authService
      .recoverPassword(this.loginInputForm.value.user as string)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.successfulReponse = true;
          this.loadingRecoverPassword = false;
        },
        error: (err) => {
          this.observerError(err);
          this.loadingRecoverPassword = false;

          if (
            err.code !== 'auth/missing-email' &&
            err.code !== 'auth/invalid-email'
          ) {
            this.successfulReponse = true;
            this.error.status = false;
          }
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => this.onbrandSignin(),
        error: this.observerError,
      });
  }

  createAccountRedirect() {
    this.router.navigate(['/register']);
  }

  onLogin(UserCredendial: any) {
    this.clearVariables();
    localStorage.setItem('attemptToLoggedIn', 'true');

    if (!UserCredendial.user._delegate.emailVerified) {
      this.authService.sendEmailVerification(UserCredendial?.user);
      this.verificationRequired = true;
      return;
    }

    this.router.navigate(['/landing']);
  }

  async onGetSessionsObserver(userInfo: any) {
    this.clearVariables();

    localStorage.setItem('attemptToLoggedIn', 'true');

    if (!userInfo?.multiFactor?.user) {
      return;
    }

    await userInfo?.multiFactor?.user.reload();

    this.authService.getCurrentUser().subscribe((userInfo2: any) => {
      if (!userInfo2?.emailVerified) {
        this.verificationRequired = true;
        return;
      }

      this.router.navigate(['/landing']);
    });
  }

  onbrandSignin() {
    this.successfulReponse = true;
    this.router.navigate(['/landing']);
  }
}

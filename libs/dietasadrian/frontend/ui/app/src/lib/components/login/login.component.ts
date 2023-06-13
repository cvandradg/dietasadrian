import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {
  catchError,
  of,
  takeUntil,
  tap,
  ignoreElements,
  BehaviorSubject,
  switchMap,
  map,
  Subject,
  concatMapTo,
  exhaustMap,
  interval,
  buffer,
  concatMap,
  mergeMap,
  from,
  Observable,
  concat,
  NEVER,
  throwError,
} from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';
import { FirebaseError } from 'firebase/app';
import { User, UserCredential } from 'firebase/auth';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler {
  onLogin$ = new Subject<{ user: string; pass: string }>();
  error$: Observable<{ status: boolean; message: string; error: any }> =
    this.authService.firebaseError$;

  user$ = this.onLogin$.pipe(
    switchMap((res: any) => this.authService.auth(res)),
    map((res: any) => {
      if (!res?.user?.emailVerified) {
        this.authService.sendEmailVerification(res?.user);
        return res?.user;
      }

      this.router.navigate(['/landing']);
    })
  );

  loadingRecoverPassword = false;

  getSession$ = this.authService.getUserSession().pipe(
    map((userInfo: any) => {
      console.log('userInfo', userInfo);

      if (!userInfo) {
        return userInfo;
      }

      if (userInfo?.emailVerified) {
        this.router.navigate(['/landing']);
        return userInfo;
      }

      this.authService.sendEmailVerification(userInfo?.user as User);
      this.verificationRequired = true;
      return userInfo;
    })
  );

  onLoginSubmit() {
    this.onLogin$.next(
      this.loginInputForm.value as { user: string; pass: string }
    );
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

// ngOnInit(): void {
// if (localStorage.getItem('attemptToLoggedIn') === 'true') this.getSession();
// }

// getSession() {
//   this.authService
//     .getUserSession()
//     .pipe(takeUntil(this.destroy))
//     .subscribe({
//       next: (res) => this.onGetSessionsObserver(res),
//       error: this.observerError,
//     });
// }

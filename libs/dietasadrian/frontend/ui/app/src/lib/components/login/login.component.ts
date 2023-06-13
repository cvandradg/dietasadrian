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
  finalize,
} from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';
import { FirebaseError } from 'firebase/app';
import { User, UserCredential } from 'firebase/auth';
import { generalError } from '@shared-modules/types/types';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler {
  passResetLoader$ = new BehaviorSubject<any>(false);
  onLogin$ = new Subject<any>();
  onPassReset$ = new Subject<any>();

  error$: Subject<generalError> = this.authService.firebaseError$;

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

  passReset$ = this.onPassReset$.pipe(
    tap((res: any) => console.log('getting called,', res)),
    switchMap((res: any) =>
      this.authService.recoverPassword(res).pipe(
        finalize(() => this.passResetLoader$.next(false)),
      )
    ),
    map((res: any) => {
      console.log('pass reset ress,', res);
      return res;
    }),
    
  );

  getSession$ = this.authService.getUserSession().pipe(
    map((userInfo: any) => {
      if (!userInfo) return;

      if (userInfo?.emailVerified) {
        this.router.navigate(['/landing']);
        return userInfo;
      }

      this.authService.sendEmailVerification(userInfo?.user as User);

      return userInfo;
    })
  );

  // forgotPassword() {
  //   this.clearVariables();
  //   this.loadingRecoverPassword = true;

  //   this.authService
  //     .recoverPassword(this.loginInputForm.value.user as string)
  //     .pipe(takeUntil(this.destroy))
  //     .subscribe({
  //       next: () => {
  //         this.successfulReponse = true;
  //         this.loadingRecoverPassword = false;
  //       },
  //       error: (err) => {
  //         this.observerError(err);
  //         this.loadingRecoverPassword = false;

  //         if (
  //           err.code !== 'auth/missing-email' &&
  //           err.code !== 'auth/invalid-email'
  //         ) {
  //           this.successfulReponse = true;
  //           this.error.status = false;
  //         }
  //         this.changeDetectorRef.markForCheck();
  //       },
  //     });
  // }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => this.onbrandSignin(),
        error: this.observerError,
      });
  }

  onbrandSignin() {
    this.successfulReponse = true;
    this.router.navigate(['/landing']);
  }
}

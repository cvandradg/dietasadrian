import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BehaviorSubject, switchMap, map, Subject, finalize, tap } from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from 'firebase/auth';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NavbarComponent, SharedModuleModule, RouterModule],
})
export class LoginComponent extends Handler {
  onLogin$ = new Subject<any>();
  onPassReset$ = new Subject<any>();
  onGoogleSignin$ = new Subject<any>();
  passResetLoader$ = new BehaviorSubject<any>(false);

  user$ = this.onLogin$.pipe(
    switchMap((res: any) => this.authService.auth(res)),
    map((res: any) => {
      if (res?.user?.emailVerified) {
        this.router.navigate(['/landing']);
      }

      this.authService.sendEmailVerification(res?.user);
      return res?.user;
    })
  );

  getSession$ = this.authService.getUserSession().pipe(
    map((userInfo: any) => {
      if (userInfo?.emailVerified) {
        this.router.navigate(['/landing']);
      }

      this.authService.sendEmailVerification(userInfo as User);
      return userInfo;
    })
  );

  passReset$ = this.onPassReset$.pipe(
    switchMap((res: any) =>
      this.authService
        .recoverPassword(res)
        .pipe(finalize(() => this.passResetLoader$.next(false)))
    )
  );

  googleSignin$ = this.onGoogleSignin$.pipe(
    switchMap(() => this.authService.googleSignin()),
    map(() => this.router.navigate(['/landing']))
  );
}

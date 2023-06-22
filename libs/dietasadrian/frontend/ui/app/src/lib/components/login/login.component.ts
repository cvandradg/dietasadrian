import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '@shared-modules';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BehaviorSubject, switchMap, map, Subject, finalize, tap } from 'rxjs';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
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
export class LoginComponent extends firebaseAuthHelper implements OnInit {
  onPassReset$ = new Subject<any>();
  onGoogleSignin$ = new Subject<any>();
  passResetLoader$ = new BehaviorSubject<any>(false);

  ngOnInit(): void {
    this.facade.getSession();
    return;
  }

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

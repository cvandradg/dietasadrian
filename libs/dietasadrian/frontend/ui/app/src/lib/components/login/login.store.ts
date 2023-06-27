import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { deepCopy, Credentials } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { Observable, switchMap, pipe, from, tap } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class LoginStore extends ComponentStoreMixinHelper<object> {
  constructor() {
    super({});
  }

  readonly googleSignin$ = this.effect<void>(
    pipe(
      tap(() => {
        this.setError(null);
        this.setLoading(true);
      }),
      switchMap(() =>
        from(this.authService.googleSignin()).pipe(
          tapResponse(
            (fireUserResponse: any) => {
              this.setError(null);
              localStorage.setItem('attemptedToLoggedIn', 'true');

              const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

              this.facade.storeUserInfo(userInfo);
              userInfo.user.emailVerified && this.router.navigate(['/landing']);
            },
            (error: FirebaseError) => {
              console.log('error en google singin,', error);
              return this.setError(
                this.errorHelperService.firebaseErrorHandler(error)
              );
            }
          )
        )
      )
    )
  );

  readonly accessAccount$ = this.effect(
    (credentials$: Observable<Credentials>) => {
      return credentials$.pipe(
        tap(() => {
          this.setError(null);
          this.setLoading(true);
        }),
        switchMap((credentials) =>
          this.authService.auth(credentials).pipe(
            tapResponse(
              (firebaseResponse: any) => {
                localStorage.setItem('attemptedToLoggedIn', 'true');
                const userInfo = deepCopy(firebaseResponse.user);

                this.facade.storeUserInfo(userInfo);
                this.authService.sendEmailVerification(
                  firebaseResponse.user as User
                );

                userInfo?.emailVerified && this.router.navigate(['/landing']);

                this.setError(null);
                this.setLoading(false);
              },
              (error: FirebaseError) => {
                this.setLoading(false);
                this.setError(
                  this.errorHelperService.firebaseErrorHandler(error)
                );
              }
            )
          )
        )
      );
    }
  );
}

import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { deepCopy, Credentials } from '@shared-modules/types/types';
import { User } from 'firebase/auth';
import { Observable, switchMap, pipe } from 'rxjs';

@Injectable()
export class LoginStore extends ComponentStoreMixinHelper<object> {
  constructor() {
    super({});
  }

  readonly googleSignin$ = this.effect<void>(
    pipe(
      this.responseHandler(
        switchMap(() =>
          this.authService.googleSignin().pipe(
            tapResponse((response: any) => {
              const userInfo = deepCopy(response);

              this.facade.storeUserInfo(userInfo);
              userInfo.emailVerified && this.router.navigate(['/landing']);
            }, this.handleError)
          )
        )
      )
    )
  );

  readonly accessAccount$ = this.effect(
    (credentials$: Observable<Credentials>) => {
      return credentials$.pipe(
        this.responseHandler(
          switchMap((credentials) =>
            this.authService.auth(credentials).pipe(
              tapResponse((user: User) => {
                const userInfo = deepCopy(user);

                this.facade.storeUserInfo(userInfo);
                this.authService.sendEmailVerification(user);

                userInfo?.emailVerified && this.router.navigate(['/landing']);
              }, this.handleError)
            )
          )
        )
      );
    }
  );
}

import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { deepCopy, Credentials } from '@shared-modules/types/types';
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
      this.responseHandler(
        switchMap(() =>
          from(this.authService.googleSignin()).pipe(
            tapResponse((fireUserResponse: any) => {
              const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

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
              tapResponse((firebaseResponse: any) => {
                const userInfo = deepCopy(firebaseResponse.user);

                this.facade.storeUserInfo(userInfo);
                this.authService.sendEmailVerification(
                  firebaseResponse.user as User
                );

                userInfo?.emailVerified && this.router.navigate(['/landing']);
              }, this.handleError)
            )
          )
        )
      );
    }
  );
}

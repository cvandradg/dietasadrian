import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { Credentials, deepCopy } from '@shared-modules/types/types';
import { User } from 'firebase/auth';
import { Observable, switchMap, from } from 'rxjs';

@Injectable()
export class RegisterStore extends ComponentStoreMixinHelper<{ user: any }> {
  constructor() {
    super({ user: null });
  }

  readonly user$ = this.select((state) => state.user);

  readonly setUser = this.updater((state, user: any) => ({
    ...state,
    loading: false,
    user,
  }));

  readonly createAccount$ = this.effect((formGroup$: Observable<FormGroup>) => {
    return formGroup$.pipe(
      this.responseHandler(
        switchMap((formGroup) =>
          from(
            this.authService.createAccount(formGroup.value as Credentials)
          ).pipe(
            tapResponse((fireUserResponse: any) => {
              const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

              this.facade.storeUserInfo(userInfo);
              this.setUser(userInfo);
              this.authService.sendEmailVerification(
                fireUserResponse.user as User
              );
              formGroup.controls['pass'].disable();
              formGroup.controls['user'].disable();
            }, this.handleError)
          )
        )
      )
    );
  });
}

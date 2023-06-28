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
          this.authService.createAccount(formGroup.value as Credentials).pipe(
            tapResponse((user: User) => {
              const userInfo = deepCopy(user);

              this.setUser(userInfo);
              this.facade.storeUserInfo(userInfo);
              this.authService.sendEmailVerification(user);
              formGroup.controls['pass'].disable();
              formGroup.controls['user'].disable();
            }, this.handleError)
          )
        )
      )
    );
  });
}

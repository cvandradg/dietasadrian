import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { Credentials, deepCopy } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { Observable, switchMap, from, tap, pipe, NEVER } from 'rxjs';

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
      tap(() => {
        this.setError(null);
        this.setLoading(true);
      }),
      switchMap((formGroup) =>
        from(
          this.authService.createAccount(formGroup.value as Credentials)
        ).pipe(
          tapResponse(
            (fireUserResponse: any) => {
              this.setLoading(false);
              const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

              this.facade.storeUserInfo(userInfo);
              this.setUser(userInfo);
              this.authService.sendEmailVerification(
                fireUserResponse.user as User
              );
              formGroup.controls['pass'].disable();
              formGroup.controls['user'].disable();
            },
            (error: FirebaseError) => {
              return this.setError(
                this.errorHelperService.firebaseErrorHandler(error)
              );
            }
          )
        )
      )
    );
  });

  readonly resetVariables$ = this.effect<void>(
    pipe(
      tap({
        next: () => {
          this.setUser(null);
          this.setError(null);
          this.setLoading(false);
        },
        error: () => NEVER,
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { Credentials, deepCopy } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { Observable, switchMap, from, tap } from 'rxjs';

@Injectable()
export class RegisterStore extends ComponentStoreMixinHelper<object> {
  constructor() {
    super({});
  }

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

              console.log('respuesta', userInfo);

              this.facade.storeUserInfo(userInfo);
              this.authService.sendEmailVerification(
                fireUserResponse.user as User
              );
              formGroup.controls['pass'].disable();
              formGroup.controls['user'].disable();
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
    );
  });
}

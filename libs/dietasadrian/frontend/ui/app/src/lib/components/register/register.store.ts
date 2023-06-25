import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { tapResponse } from '@ngrx/component-store';
import { Credentials } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
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
            (userInfo) => {
              this.facade.storeUserInfo(userInfo);
              formGroup.controls['pass'].disable();
              formGroup.controls['user'].disable();
              this.setLoading(false);
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

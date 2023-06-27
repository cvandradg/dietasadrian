import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { FirebaseError } from 'firebase/app';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';

@Injectable()
export class passResetStore extends ComponentStoreMixinHelper<PassResetState> {
  constructor() {
    super({ requested: false });
  }

  readonly requested$ = this.select((state) => state.requested);

  readonly setRequested = this.updater((state, requested: boolean) => ({
    ...state,
    requested: requested,
    error: null,
    loading: false,
  }));

  readonly passReset = this.effect((email$: Observable<string>) =>
    email$.pipe(
      tap(() => {
        this.setLoading(true);
      }),
      switchMap((email) =>
        this.authService.recoverPassword(email).pipe(
          tapResponse(
            () => {
              this.setRequested(true);
            },

            (error: FirebaseError) => {
              return this.setError(
                this.errorHelperService.firebaseErrorHandler(error)
              );
            }
          )
        )
      )
    )
  );
}

export interface PassResetState {
  requested: boolean;
}

import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { SharedStoreFacade } from '@shared-modules';
import { AppError, BaseComponentState } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';

@Injectable()
export class passResetStore extends ComponentStoreMixinHelper<PassResetState> {
  facade = inject(SharedStoreFacade);
  authService = inject(AuthService);
  errorHelperService = inject(ErrorHandlerService);

  constructor() {
    super({ requested: false });
  }

  readonly requested$ = this.select((state) => state.requested);

  readonly setRequested = this.updater((state: any, requested: boolean) => ({
    ...state,
    requested: requested,
    error: null,
    loading: false,
  }));

  readonly passReset = this.effect((email$: Observable<string>) =>
    this.isLoading(email$)?.pipe(
      tap(() => {
        this.setRequested(false);
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
      ),
      map(() => 'response')
    )
  );
}

export interface PassResetState {
  requested: boolean;
}

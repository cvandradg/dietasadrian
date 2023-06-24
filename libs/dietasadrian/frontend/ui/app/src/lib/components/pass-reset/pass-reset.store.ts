import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { SharedStoreFacade } from '@shared-modules';
import { AppError } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { Observable, switchMap, tap } from 'rxjs';

export interface LoginState {
  error: AppError | null;
  loading: boolean;
  requested: boolean;
}

@Injectable()
export class passResetStore extends ComponentStore<LoginState> {
  facade = inject(SharedStoreFacade);
  authService = inject(AuthService);
  errorHelperService = inject(ErrorHandlerService);

  constructor() {
    super({ error: null, loading: false, requested: false });
  }

  readonly error$ = this.select((state) => state.error);
  readonly loading$ = this.select((state) => state.loading);
  readonly requested$ = this.select((state) => state.requested);

  readonly setError = this.updater((state, error: AppError | null) => ({
    ...state,
    error,
  }));

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading: loading,
  }));

  readonly setRequested = this.updater((state, requested: boolean) => ({
    ...state,
    requested: requested,
  }));

  readonly passReset = this.effect((email$: Observable<string>) => {
    return email$.pipe(
      tap(() => {
        this.setRequested(false);
        this.setError(null);
        this.setLoading(true);
      }),
      switchMap((email) =>
        this.authService.recoverPassword(email).pipe(
          tapResponse(
            () => {
              this.setRequested(true);
              this.setLoading(false);
            },

            (error: FirebaseError) => {
              this.setLoading(false);
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

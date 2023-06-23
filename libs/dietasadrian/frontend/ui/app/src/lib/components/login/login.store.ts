import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { Observable, switchMap, tap, EMPTY, catchError } from 'rxjs';

export interface LoginState {
  passResetSpinner: boolean;
  passResetRequested: boolean;
  error: any;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  authService = inject(AuthService);
  errorHelperService = inject(ErrorHandlerService);

  constructor() {
    super({
      passResetSpinner: false,
      passResetRequested: false,
      error: null,
    });
  }

  readonly error$ = this.select((state) => state.error);
  readonly passResetSpinner$ = this.select((state) => state.passResetSpinner);
  readonly passResetRequested$ = this.select(
    (state) => state.passResetRequested
  );

  readonly setPassResetSpinner = this.updater(
    (state, passResetSpinner: boolean) => ({
      ...state,
      passResetSpinner,
    })
  );

  readonly setPassResetRequested = this.updater(
    (state, passResetRequested: boolean) => ({
      ...state,
      passResetRequested,
    })
  );

  readonly setError = this.updater((state, error: { status: boolean; message: string; error: any; } | null) => ({
    ...state,
    error,
  }));

  readonly passReset = this.effect((email$: Observable<string>) => {
    return email$.pipe(
      tap(() => this.setPassResetSpinner(true)),
      switchMap((email) =>
        this.authService.recoverPassword(email).pipe(
          tap({
            next: () => {
              this.setPassResetRequested(true);
              this.setPassResetSpinner(false);
              this.setError(null);
            },
            error: (error) => {
              this.setPassResetSpinner(false);
              return this.setError(
                this.errorHelperService.firebaseErrorHandler(error)
              );
            },
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });
}

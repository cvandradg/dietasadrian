import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { SharedStoreFacade } from '@shared-modules';
import { deepCopy, Credentials, AppError } from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { Observable, switchMap, pipe, from } from 'rxjs';

export interface LoginState {
  error: any;
  loading: boolean;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  router = inject(Router);
  facade = inject(SharedStoreFacade);
  authService = inject(AuthService);
  errorHelperService = inject(ErrorHandlerService);

  constructor() {
    super({ error: null, loading: false });
  }

  readonly error$ = this.select((state) => state.error);
  readonly loading$ = this.select((state) => state.loading);

  readonly setError = this.updater((state, error: AppError | null) => ({
    ...state,
    error,
  }));

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly googleSignin$ = this.effect<void>(
    pipe(
      switchMap(() =>
        from(this.authService.googleSignin()).pipe(
          tapResponse(
            (fireUserResponse: any) => {
              this.setError(null);
              localStorage.setItem('attemptedToLoggedIn', 'true');

              const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

              this.facade.storeUserInfo(userInfo);
              this.router.navigate(['/landing']);
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
    )
  );

  readonly accessAccount$ = this.effect(
    (credentials$: Observable<Credentials>) => {
      return credentials$.pipe(
        switchMap((credentials) =>
          this.authService.auth(credentials).pipe(
            tapResponse(
              ({ user }) => {
                localStorage.setItem('attemptedToLoggedIn', 'true');
                this.router.navigate(['/landing']);
                return this.facade.storeUserInfo({
                  userInfo: user,
                });
              },
              (error: FirebaseError) => {
                this.setError(
                  this.errorHelperService.firebaseErrorHandler(error)
                );
              }
            )
          )
        )
      );
    }
  );
}

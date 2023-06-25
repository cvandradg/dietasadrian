import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { SharedStoreFacade } from '@shared-modules';
import {
  deepCopy,
  Credentials,
  AppError,
  BaseComponentState,
} from '@shared-modules/types/types';
import { FirebaseError } from 'firebase/app';
import { Observable, switchMap, pipe, from, tap, of } from 'rxjs';

@Injectable()
export class LoginStore extends ComponentStoreMixinHelper<object> {
  router = inject(Router);
  facade = inject(SharedStoreFacade);
  authService = inject(AuthService);
  errorHelperService = inject(ErrorHandlerService);

  constructor() {
    super();
  }

  readonly googleSignin$ = this.effect<void>(
    pipe(
      tap(() => {
        this.setError(null);
        this.setLoading(true);
      }),
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
        tap(() => {
          this.setError(null);
          this.setLoading(true);
        }),
        switchMap((credentials) =>
          this.authService.auth(credentials).pipe(
            tapResponse(
              ({ user }) => {
                localStorage.setItem('attemptedToLoggedIn', 'true');
                this.router.navigate(['/landing']);
                this.facade.storeUserInfo({
                  userInfo: user,
                });
                this.setError(null);
                this.setLoading(false);
              },
              (error: FirebaseError) => {
                this.setLoading(false);
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

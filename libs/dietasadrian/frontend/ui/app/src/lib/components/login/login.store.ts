import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { Observable, switchMap, tap, EMPTY, catchError, pipe } from 'rxjs';

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

  readonly setError = this.updater(
    (
      state,
      error: { status: boolean; message: string; error: any } | null
    ) => ({
      ...state,
      error,
    })
  );

  readonly googleSignin$ = this.effect<void>(
    pipe(
      switchMap(() =>
        this.authService.googleSignin().pipe(
          tap({
            next: () => {
              //llamar a guardar el usuario en el global store
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
    )
  );

  readonly accessAccount$ = this.effect(
    (credentials$: Observable<{ user: string; pass: string }>) => {
      return credentials$.pipe(
        switchMap((credentials) =>
          this.authService.auth(credentials).pipe(
            tap({
              next: () => {
                //mandar a guardar en el store el userInfo
              },
              error: (error) => {
                this.setError(
                  this.errorHelperService.firebaseErrorHandler(error)
                );
              },
            }),
            catchError(() => EMPTY)
          )
        )
      );
    }
  );

  //   accessAccount$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.accessAccount),
  //     switchMap((action) =>
  //       this.authService.auth({ user: action.user, pass: action.pass })
  //     ),
  //     map((userInfo: any) => {
  //       localStorage.setItem('attemptedToLoggedIn', 'true');
  //       this.router.navigate(['/landing']);
  //       return actions.storeUserInfo({
  //         userInfo: userInfo.user,
  //       });
  //     }),
  //     catchSwitchMapError((error) =>
  //       actions.actionFailure(
  //         this.errorHelperService.firebaseErrorHandler(error)
  //       )
  //     )
  //   )
  // );

  //   readonly googleSignin$ = this.effectcreateEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.googleSignin),
  //     switchMap(() => this.authService.googleSignin()),
  //     map((fireUserResponse: any) => {
  //       localStorage.setItem('attemptedToLoggedIn', 'true');

  //       const userInfo = deepCopy(fireUserResponse.user.multiFactor.user);

  //       this.router.navigate(['/landing']);
  //       return actions.storeUserInfo({
  //         userInfo,
  //       });
  //     }),
  //     catchSwitchMapError((error) =>
  //       actions.actionFailure(
  //         this.errorHelperService.firebaseErrorHandler(error)
  //       )
  //     )
  //   )
  // );
}

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap, from } from 'rxjs';
import * as SharedStoreActions from './shared-store.actions';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';

@Injectable()
export class SharedStoreEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private errorHelperService = inject(ErrorHandlerService);

  getSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedStoreActions.getSession),
      switchMap(() => this.authService.getUserSession()),
      tap((res) => console.log('content getsessions:,', res)),
      map((userInfo) => {
        return SharedStoreActions.getSessionSuccess({ userInfo });
      }),
      catchError((error) => {
        return of(
          SharedStoreActions.getSessionFailure({
            error: this.errorHelperService.firebaseErrorHandler(error),
          })
        );
      })
    )
  );

  ///EL CODIGIO DE ABAJO PARECE TOTALMENTE FUNCIONAL/////
  ///CLAUDIO del dia revisar si efectivamente esta funcional login, loginComponent deberia de estar usandolo full////
  accessAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedStoreActions.accessAccount),
      switchMap((action) =>
        from(
          this.authService.authPromise({ user: action.user, pass: action.pass })
        ).pipe(
          map((userInfo: any) => {
            console.log('userInfo', userInfo);
            
            return SharedStoreActions.getAccessSuccess({
              userInfo: userInfo.user,
            });
          }),
          catchError((error: any, caught) => {
            console.log('error', error);

            return of(
              SharedStoreActions.getAccessFailure(
                this.errorHelperService.firebaseErrorHandler(error)
              )
            );
          })
        )
      )
    )
  );
}

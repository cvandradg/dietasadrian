import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  Observable,
  startWith,
  filter,
  from,
} from 'rxjs';
import * as actions from './shared-store.actions';
import { AuthService } from '../services/auth/auth-service.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { Router } from '@angular/router';

@Injectable()
export class SharedStoreEffects {
  private router = inject(Router);
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private errorHelperService = inject(ErrorHandlerService);

  getSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getSession),

      switchMap(() => this.authService.getUserSession()),
      map((fireUserResponse: any) => {
        const userInfo = deepCopy(fireUserResponse?.multiFactor.user);
        userInfo?.emailVerified && this.router.navigate(['/landing']);
        return actions.storeUserInfo({
          userInfo,
        });
      }),
      catchSwitchMapError((error) =>
        actions.actionFailure(
          this.errorHelperService.firebaseErrorHandler(error)
        )
      )
    )
  );

  passReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.requestPassReset),
      switchMap((action) => this.authService.recoverPassword(action.email)),
      catchSwitchMapError((error) => {
        if (
          error.code !== 'auth/missing-email' &&
          error.code !== 'auth/invalid-email'
        )
          return;

        return actions.actionFailure(
          this.errorHelperService.firebaseErrorHandler(error)
        );
      })
    )
  );

  hideLoading$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => {
        const validAction = Object.values(actions).some(
          (ObjAction) => ObjAction.type === action.type
        );

        const unWantedToListen =
          action.type !== actions.showLoading.type &&
          action.type !== actions.hideLoading.type;

        return validAction && unWantedToListen;
      }),
      map((action) => {
        if (
          action.type === actions.actionFailure.type ||
          action.type === actions.storeUserInfo.type
        )
          return actions.hideLoading();

        return actions.showLoading();
      })
    )
  );
}

export const catchSwitchMapError =
  (errorAction: (error: any) => any) =>
  <T>(source: Observable<T>) =>
    source.pipe(
      catchError((error, innerSource) =>
        innerSource.pipe(startWith(errorAction(error)))
      )
    );

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj || ''));

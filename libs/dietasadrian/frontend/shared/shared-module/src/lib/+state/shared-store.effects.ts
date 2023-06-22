import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, Observable, startWith } from 'rxjs';
import * as actions from './shared-store.actions';
import { AuthService } from '@services/auth/auth-service.service';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
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
      map((userInfo:any) => {
        userInfo && this.router.navigate(['/landing']);
        return actions.getSessionSuccess({ userInfo: userInfo?.multiFactor.user  });
      }),
      catchSwitchMapError((error) =>
        actions.getSessionFailure(
          this.errorHelperService.firebaseErrorHandler(error)
        )
      )
    )
  );

  accessAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.accessAccount),
      switchMap((action) =>
        this.authService.auth({ user: action.user, pass: action.pass })
      ),
      map((userInfo: any) => {
        this.router.navigate(['/landing']);
        return actions.getAccessSuccess({
          userInfo: userInfo.user,
        });
      }),
      catchSwitchMapError((error) =>
        actions.getAccessFailure(
          this.errorHelperService.firebaseErrorHandler(error)
        )
      )
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

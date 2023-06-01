import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as GeneralAppActions from './general-app.actions';
import * as GeneralAppFeature from './general-app.reducer';


@Injectable()
export class GeneralAppEffects {
  private actions$ = inject(Actions);
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GeneralAppActions.showLoading),
      switchMap(() =>
        of(GeneralAppActions.showLoading())
      ),
      // catchError((error) => {
      //   console.error('Error', error);
      //   return of(GeneralAppActions.loadGeneralAppFailure({ error }));
      // })
    )
  );
}

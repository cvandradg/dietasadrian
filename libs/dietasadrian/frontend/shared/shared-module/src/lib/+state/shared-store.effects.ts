import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as SharedStoreActions from './shared-store.actions';
import * as SharedStoreFeature from './shared-store.reducer';

@Injectable()
export class SharedStoreEffects {
  private actions$ = inject(Actions);

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SharedStoreActions.init),
  //     switchMap(() =>

  //     { 
  //       console.log('effects');
        
  //       return of(SharedStoreActions.init())
  //     }
        
  //     ),
      // catchError((error) => {
      //   console.error('Error', error);
      //   return of(SharedStoreActions.loadSharedStoreFailure({ error }));
      // })
  //   )
  // );
}

import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { Observable, from, switchMap } from 'rxjs';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';

@Injectable()
export class RequestPassResetStore extends ComponentStoreMixinHelper<{
  reseted: boolean;
}> {
  constructor() {
    super({ reseted: false });
  }

  readonly reseted$ = this.select((state) => state.reseted);

  readonly setReseted = this.updater((state, reseted: boolean) => ({
    ...state,
    reseted,
  }));

  readonly passReset$ = this.effect(
    (parameters$: Observable<{ pass: string; oobCode: string }>) =>
      parameters$.pipe(
        this.responseHandler(
          switchMap(({ pass, oobCode }) =>
            from(this.authService.resetPass(oobCode, pass)).pipe(
              tapResponse(() => {
                this.setReseted(true);
                this.facade.signOut();
              }, this.handleError)
            )
          )
        )
      )
  );
}

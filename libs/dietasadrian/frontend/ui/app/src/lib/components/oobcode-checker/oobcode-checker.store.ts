import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { switchMap, from, tap, Observable } from 'rxjs';

@Injectable()
export class OobcodeCheckerStore extends ComponentStoreMixinHelper<object> {
  constructor() {
    super({});
  }

  readonly checkCode$ = this.effect((oobCode$: Observable<string>) => {
    return oobCode$.pipe(
      this.responseHandler(
        switchMap((oobCode) =>
          from(this.authService.checkOobCode(oobCode)).pipe(
            tap(this.oobCodeCheck)
          )
        )
      )
    );
  });

  get oobCodeCheck() {
    return {
      next: (res: any) => {
        switch (res.operation) {
          case 'VERIFY_EMAIL':
            this.router.navigate(['/email-verification'], {
              queryParamsHandling: 'preserve',
            });
            break;

          case 'PASSWORD_RESET':
            this.router.navigate(['/passReset'], {
              queryParamsHandling: 'preserve',
            });
            break;
        }
      },
      error: this.handleError,
    };
  }
}

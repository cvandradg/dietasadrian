import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { switchMap, from, tap, Observable } from 'rxjs';

@Injectable()
export class EmailVerificationStore extends ComponentStoreMixinHelper<object> {
  constructor() {
    super({});
  }

  readonly verifyEmail$ = this.effect((oobCode$: Observable<string>) =>
    oobCode$.pipe(
      this.responseHandler(
        switchMap((oobCode) =>
          from(this.authService.verifyEmail(oobCode)).pipe(
            this.responseHandler(
              switchMap(() =>
                from(this.authService.getCurrentUser()).pipe(
                  tap(this.verifyEmail)
                )
              )
            )
          )
        )
      )
    )
  );

  get verifyEmail() {
    return {
      next: async (userInfo: any) => {
        await userInfo?.multiFactor?.user.reload();

        if (userInfo?.emailVerified) {
          this.facade.storeUserInfo(userInfo);
          this.router.navigate(['/landing']);
          return;
        }

        return this.setError({
          status: true,
          message:
            'El correo no ha sido verificado, inténtalo de nuevo o ponte en contacto con nosotros.',
          error: undefined,
        });
      },

      error: this.handleError,
    };
  }
}

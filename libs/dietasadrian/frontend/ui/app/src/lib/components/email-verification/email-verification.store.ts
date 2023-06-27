import { Injectable } from '@angular/core';
import { ComponentStoreMixinHelper } from '@classes/component-store-helper';
import { FirebaseError } from 'firebase/app';
import { switchMap, from, tap, Observable } from 'rxjs';

@Injectable()
export class EmailVerificationStore extends ComponentStoreMixinHelper<{
  emailVerified: boolean;
}> {
  constructor() {
    super({ emailVerified: false });
  }

  readonly emailVerified$ = this.select((state) => state.emailVerified);

  readonly setEmailVerified = this.updater((state, emailVerified: boolean) => ({
    ...state,
    emailVerified: emailVerified,
    error: null,
    loading: false,
  }));

  readonly verifyEmail$ = this.effect((oobCode$: Observable<string>) =>
    oobCode$.pipe(
      switchMap((oobCode) =>
        from(this.authService.verifyEmail(oobCode)).pipe(
          switchMap(() =>
            from(this.authService.getCurrentUser()).pipe(
              tap({
                next: async (userInfo: any) => {
                  await userInfo?.multiFactor?.user.reload();

                  console.log('userInfo', userInfo);
                  this.facade.storeUserInfo(userInfo);

                  if (!userInfo?.emailVerified)
                    return this.setError({
                      status: true,
                      message:
                        'El correo no ha sido verificado, inténtalo de nuevo o ponte en contacto con nosotros.',
                      error: undefined,
                    });

                  this.setEmailVerified(true);
                  this.router.navigate(['/landing']);
                  return;
                },

                error: (error: FirebaseError) => {
                  return this.setError(
                    this.errorHelperService.firebaseErrorHandler(error)
                  );
                },
              })
            )
          )
        )
      )
    )
  );
}

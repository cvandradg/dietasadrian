import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  Observable,
  startWith,
  mergeMap,
  concatMap,
  tap,
  filter,
} from 'rxjs';
import * as actions from './shared-store.actions';
import { AuthService } from '../services/auth/auth-service.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Injectable()
export class SharedStoreEffects {
  private router = inject(Router);
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private errorHelperService = inject(ErrorHandlerService);
  private store = inject(Store);

  getSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getSession),

      switchMap(() => this.authService.getUserSession()),
      map((fireUserResponse: any) => {
        fireUserResponse && this.router.navigate(['/landing']);

        const userInfo = deepCopy(fireUserResponse?.multiFactor.user);

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

  // accessAccount$ = createEffect(() =>
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

  // googleSignin$ = createEffect(() =>
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

  // showLoading$ = createEffect(() =>
  //   this.actions$.pipe(map(() => actions.showLoading()))
  // );

  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  /**
   * Parece funcional,
   * revisar el effecto de loading mientras se escriben los effects
   * respectivos de cada uno, globals and global y components/store
   * en su component store.
   *
   * Se recomienda dejar el codigo asi, o comentarlo porque no sabemos
   * como vamos a manejar el loading en los component store.
   *
   * Analizar si queremos tener un loading global para todo servicio que se llame
   * o si tener un loading por cada componente con store.
   * Posiblemente queremos ambos, tener un loading global no se escucha tan mal
   * si es para mandar a llamar un effect del global.
   *
   * Tener un loading por cada componente con store, se escucha bien, porque eso hace
   * que indiferentemente donde se llame el componente va a tener su propio loading,
   * si hay multiples componentes vivos y cada uno tiene un spinner por diversas razones
   * tendria sentido que sea un loading por componente.
   *
   * Talvez no hace falta tener un loading global, xq no hay nadie queriendo esperar si esta cargando algo
   * porque si se quisiera informacion del global, que no esta almacenada, el selector traeria null, la unica
   * razon para tener un loading global es si se quiere llamar un servicio y esperar su resolucion para
   * actualizar data de algun key que ya tiene data.
   *
   * Si se maneja loading por componente, podria extender una clase de tipo genericState o algo asi que tiene
   * un key loading, para no definir el loading en cada componente. Tambien podria heredar un effect que
   * escuche cualquier component/store effect para mostrar el loading, y de alguna manera otro para ocultarlo.
   */
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  ///////////////////////////
  hideLoading$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => {
        // console.log('action', action);

        const validAction = Object.values(actions).some(
          (ObjAction) => ObjAction.type === action.type
        );

        const unWantedToListen =
          action.type !== actions.showLoading.type &&
          action.type !== actions.hideLoading.type;

        // console.log('actions array', validAction, notShowLoading);
        return validAction && unWantedToListen;
      }),
      map((action) => {
        // console.log('entra a ejecutar el acction', action);

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

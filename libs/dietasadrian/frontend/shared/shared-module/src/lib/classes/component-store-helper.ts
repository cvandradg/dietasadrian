import { Router } from '@angular/router';
import { AppError } from '../types/types';
import { FirebaseError } from 'firebase/app';
import { Directive, inject } from '@angular/core';
import { OperatorFunction, pipe, tap } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { SharedStoreFacade } from '../+state/shared-store.facade';
import { AuthService } from '../services/auth/auth-service.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';

export interface BaseComponentState extends Object {
  error: AppError | null;
  loading: boolean;
}

/**
 * En algun component store estoy recibiendo el state
 * ese state, sea lo que sea, quiero agregarle los
 * keys de error y loading. No logre agregarlos a lo que
 * sea que me este dando el state, asi que lo que hice
 * temporalmente es esperarlos de ese state, o sea, creer
 * que vienen pero ponerlos opcionales. No se porque funciona,
 * la cosa es que no tienen que ser opcionales del state que
 * vienen si no que tengo que agregarlos a la fuerza a lo que
 * sea que traiga el state.
 *
 * Tomar encuenta que componentStore me pide que el generic
 * que recibe extienda de object.
 */
export interface GenericState extends Object {
  error?: AppError | null;
  loading?: boolean;
}

@Directive()
export class ComponentStoreMixinHelper<
  T extends GenericState
  /*Hay que agregar el error y loading keys,
   para poderlos inicializar aca en el helper 
   sin tenerlos que inicializar en los component stores*/
> extends ComponentStore<T> {
  router = inject(Router);
  authService = inject(AuthService);
  facade = inject(SharedStoreFacade);
  errorHelperService = inject(ErrorHandlerService);

  readonly error$ = this.select((state) => state.error);
  readonly loading$ = this.select((state) => state.loading);

  readonly setError = this.updater((state, error: AppError | null) => ({
    ...state,
    loading: false,
    error,
  }));

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  get handleError() {
    return (error: FirebaseError) => {
      return this.setError(this.errorHelperService.firebaseErrorHandler(error));
    };
  }

  responseHandler(operator: OperatorFunction<any, any>) {
    return pipe(this.onRequest, operator, this.onResponse);
  }

  get onResponse() {
    return tap<any>(() => {
      this.setError(null);
      this.setLoading(false);
    });
  }

  get onRequest() {
    return tap<any>(() => {
      this.setError(null);
      this.setLoading(true);
    });
  }
}

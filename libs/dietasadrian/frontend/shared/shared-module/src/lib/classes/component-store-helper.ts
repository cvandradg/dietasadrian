import { Directive, inject } from '@angular/core';
import { AppError } from '../types/types';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
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
export interface test extends Object {
  error?: AppError | null;
  loading?: boolean;
}

@Directive({
  providers: [],
})
export class ComponentStoreMixinHelper<
  T extends test
> extends ComponentStore<T> {
  router = inject(Router);
  facade = inject(SharedStoreFacade);
  authService = inject(AuthService);
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
    loading: loading,
  }));


}

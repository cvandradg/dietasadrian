import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as actions from './shared-store.actions';
import * as selectors from './shared-store.selectors';
import { generalError } from '@shared-modules/types/types';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreFacade {
  private readonly store = inject(Store);

  showLoader() {
    this.store.dispatch(actions.showLoading());
  }

  hideLoader() {
    this.store.dispatch(actions.hideLoading());
  }

  toggleSidenavbar() {
    this.store.dispatch(actions.toggleSidenavbar());
  }

  getSession() {
    this.store.dispatch(actions.getSession());
  }

  accessAccount(credentials: any) {
    this.store.dispatch(actions.accessAccount(credentials));
  }

  requestPassReset(email: string) {
    this.store.dispatch(actions.requestPassReset({ email }));
  }

  storeUserInfo(userInfo: any) {
    this.store.dispatch(actions.storeUserInfo({ userInfo }));
  }

  setError({ status, message, error }: generalError) {
    this.store.dispatch(actions.actionFailure({ status, message, error }));
  }

  error$ = this.store.pipe(select(selectors.error));
  loading$ = this.store.pipe(select(selectors.loading));
  userInfo$ = this.store.pipe(select(selectors.userInfo));
  showSidenavbar$ = this.store.pipe(select(selectors.toogleSidenavbar));
}

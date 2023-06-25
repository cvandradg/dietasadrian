import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as SharedStoreActions from './shared-store.actions';
import * as SharedStoreFeature from './shared-store.reducer';
import * as SharedStoreSelectors from './shared-store.selectors';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreFacade {
  private readonly store = inject(Store);

  showLoader() {
    this.store.dispatch(SharedStoreActions.showLoading());
  }

  hideLoader() {
    this.store.dispatch(SharedStoreActions.hideLoading());
  }

  showSidenavbar$ = this.store.pipe(
    select(SharedStoreSelectors.toogleSidenavbar)
  );

  toggleSidenavbar() {
    this.store.dispatch(SharedStoreActions.toggleSidenavbar());
  }

  getSession() {
    this.store.dispatch(SharedStoreActions.getSession());
  }

  accessAccount(credentials: any) {
    this.store.dispatch(SharedStoreActions.accessAccount(credentials));
  }

  requestPassReset(email: string) {
    this.store.dispatch(SharedStoreActions.requestPassReset({ email }));
  }

  storeUserInfo(userInfo: any) {
    this.store.dispatch(SharedStoreActions.storeUserInfo({ userInfo: userInfo.userInfo }));
  }

  error$ = this.store.pipe(select(SharedStoreSelectors.selectSharedStoreError));
  userInfo$ = this.store.pipe(select(SharedStoreSelectors.userInfo));
  loading$ = this.store.pipe(
    select(SharedStoreSelectors.selectSharedStoreLoading)
  );

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  // loaded$ = this.store.pipe(
  //   select(SharedStoreSelectors.selectSharedStoreLoaded)
  // );
  // allSharedStore$ = this.store.pipe(
  //   select(SharedStoreSelectors.selectAllSharedStore)
  // );
  // selectedSharedStore$ = this.store.pipe(
  //   select(SharedStoreSelectors.selectEntity)
  // );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  // init() {
  //   this.store.dispatch(SharedStoreActions.initSharedStore());
  // }
}

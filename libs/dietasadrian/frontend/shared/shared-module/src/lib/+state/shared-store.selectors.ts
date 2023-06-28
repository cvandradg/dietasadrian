import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHARED_STORE_FEATURE_KEY,
  SharedStoreState,
} from './shared-store.reducer';

export const selectSharedStoreState = createFeatureSelector<SharedStoreState>(
  SHARED_STORE_FEATURE_KEY
);

export const selectFeature = (state: SharedStoreState) => state.loading;
export const loading = createSelector(
  selectSharedStoreState,
  (state: SharedStoreState) => state.loading
);

export const toogleSidenavbar = createSelector(
  selectSharedStoreState,
  (state: SharedStoreState) => state.toggleSidenavbar
);

export const error = createSelector(
  selectSharedStoreState,
  (state: SharedStoreState) => state.error
);

export const userInfo = createSelector(
  selectSharedStoreState,
  (state: SharedStoreState) => state.userInfo
);

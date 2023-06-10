import { createReducer, on, Action } from '@ngrx/store';

import * as SharedStoreActions from './shared-store.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SharedStoreEntity } from '../+state/shared-store.models';

export const SHARED_STORE_FEATURE_KEY = 'sharedStore';

export interface SharedStoreState {
  loading: boolean;
  toggleSidenavbar: boolean;
}

export const initialSharedStoreState: SharedStoreState = {
  loading: false,
  toggleSidenavbar: true,
};

export interface SharedStorePartialState {
  readonly [SHARED_STORE_FEATURE_KEY]: SharedStoreState;
}

export const sharedStoreAdapter: EntityAdapter<SharedStoreEntity> =
  createEntityAdapter<SharedStoreEntity>();

export const reducer = createReducer(
  initialSharedStoreState,
  on(SharedStoreActions.showLoading, (state) => ({
    ...state,
    loading: true,
  })),
  on(SharedStoreActions.hideLoading, (state) => ({
    ...state,
    loading: false,
  })),
  on(SharedStoreActions.toggleSidenavbar, (state) => ({
    ...state,
    toggleSidenavbar: !state.toggleSidenavbar,
  }))

);

export function sharedStoreReducer(state: SharedStoreState, action: Action) {
  return reducer(state, action);
}

// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { SharedStoreEntity } from './shared-store.models';

// export interface SharedStoreState extends EntityState<SharedStoreEntity> {
//   selectedId?: string | number; // which SharedStore record has been selected
//   loaded: boolean; // has the SharedStore list been loaded
//   error?: string | null; // last known error (if any)
// }

// export interface SharedStorePartialState {
//   readonly [SHARED_STORE_FEATURE_KEY]: SharedStoreState;
// }

// export const sharedStoreAdapter: EntityAdapter<SharedStoreEntity> =
//   createEntityAdapter<SharedStoreEntity>();

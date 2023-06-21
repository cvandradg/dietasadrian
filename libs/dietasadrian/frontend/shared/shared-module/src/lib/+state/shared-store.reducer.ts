import { createReducer, on, Action } from '@ngrx/store';

import * as SharedStoreActions from './shared-store.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SharedStoreEntity } from '../+state/shared-store.models';
import { FirebaseError } from 'firebase/app';

export const SHARED_STORE_FEATURE_KEY = 'sharedStore';

export interface SharedStoreState {
  loading: boolean;
  toggleSidenavbar: boolean;
  userInfo: any;
  error: { status: boolean; message: string; error: any };
}

export const initialSharedStoreState: SharedStoreState = {
  loading: false,
  toggleSidenavbar: true,
  userInfo: {},
  error: { status: false, message: '', error: {} },
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
  })),
  on(SharedStoreActions.getSessionSuccess, (state, { userInfo }) => ({
    ...state,
    loading: false,
    userInfo: userInfo,
  })),
  on(SharedStoreActions.getSessionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(SharedStoreActions.accessAccount, (state, { user, pass }) => ({
    ...state,
    loading: true,
  })),
  on(SharedStoreActions.getAccessSuccess, (state, { userInfo }) => ({
    ...state,
    loading: false,
    userInfo: userInfo,
  })),
  on(
    SharedStoreActions.getAccessFailure,
    (state, { error, message, status }) => {
      console.log('entra al reducer?', error);

      return {
        ...state,
        loading: false,
        error: { error, message, status },
      };
    }
  )
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

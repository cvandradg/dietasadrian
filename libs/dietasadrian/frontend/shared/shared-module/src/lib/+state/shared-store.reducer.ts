import { createReducer, on, Action } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SharedStoreEntity } from '../+state/shared-store.models';
import * as SharedStoreActions from './shared-store.actions';

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
  userInfo: null,
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
    userInfo: userInfo || null,
  })),
  on(SharedStoreActions.storeUserInfo, (state, { userInfo }) => ({
    ...state,
    userInfo,
  })),
  on(SharedStoreActions.actionFailure, (state, { error, message, status }) => ({
    ...state,
    loading: false,
    error: { error, message, status },
  }))
);

export function sharedStoreReducer(state: SharedStoreState, action: Action) {
  return reducer(state, action);
}

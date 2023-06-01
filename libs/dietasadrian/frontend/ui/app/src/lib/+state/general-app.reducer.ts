// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { GeneralAppEntity } from './general-app.models';

import { createReducer, on, Action } from '@ngrx/store';

import * as GeneralAppActions from './general-app.actions';

export const GENERAL_APP_FEATURE_KEY = 'generalApp';

// export interface GeneralAppState extends EntityState<GeneralAppEntity> {
//   selectedId?: string | number; // which GeneralApp record has been selected
//   loaded: boolean; // has the GeneralApp list been loaded
//   error?: string | null; // last known error (if any)
// }

// export const generalAppAdapter: EntityAdapter<GeneralAppEntity> =
//   createEntityAdapter<GeneralAppEntity>();

// export const initialGeneralAppState: GeneralAppState =
//   generalAppAdapter.getInitialState({
//     // set initial required properties
//     loaded: false,
//   });


export interface GeneralAppState {
  loading: boolean
}

export interface GeneralAppPartialState {
  readonly [GENERAL_APP_FEATURE_KEY]: GeneralAppState;
}

export const initialGeneralAppState: GeneralAppState =
  {
    loading: true,
  }


const reducer = createReducer(
  initialGeneralAppState,
  on(GeneralAppActions.showLoading, (state) => {

    console.log('showLoading');
    
    return ({
      ...state,
      loading: true,
    })
  }),
  on(GeneralAppActions.hideLoading, (state) => ({ ...state, loading: false }))
);

export function generalAppReducer(
  state: GeneralAppState | undefined,
  action: Action
) {
  return reducer(state, action);
}

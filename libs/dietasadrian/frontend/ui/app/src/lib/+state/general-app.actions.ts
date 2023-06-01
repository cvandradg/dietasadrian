// import { GeneralAppEntity } from './general-app.models';
// import { createAction, props } from '@ngrx/store';

// export const initGeneralApp = createAction('[GeneralApp Page] Init');

// export const loadGeneralAppSuccess = createAction(
//   '[GeneralApp/API] Load GeneralApp Success',
//   props<{ generalApp: GeneralAppEntity[] }>()
// );

// export const loadGeneralAppFailure = createAction(
//   '[GeneralApp/API] Load GeneralApp Failure',
//   props<{ error: any }>()
// );

import { createAction } from '@ngrx/store';

export const showLoading = createAction('[GeneralApp] showLoading');
export const hideLoading = createAction('[GeneralApp] hideLoading');

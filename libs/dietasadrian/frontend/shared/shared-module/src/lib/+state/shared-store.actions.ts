import { createAction } from '@ngrx/store';

export const showLoading = createAction('[SharedStore Page] showLoading');
export const hideLoading = createAction('[SharedStore Page] hideLoading');


// import { SharedStoreEntity } from './general-app.models';
// import { createAction, props } from '@ngrx/store';

// export const initSharedStore = createAction('[SharedStore Page] Init');

// export const loadSharedStoreSuccess = createAction(
//   '[SharedStore/API] Load SharedStore Success',
//   props<{ SharedStore: SharedStoreEntity[] }>()
// );

// export const loadSharedStoreFailure = createAction(
//   '[SharedStore/API] Load SharedStore Failure',
//   props<{ error: any }>()
// );

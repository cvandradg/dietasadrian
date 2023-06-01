// import {
//   GENERAL_APP_FEATURE_KEY,
//   GeneralAppState,
//   generalAppAdapter,
// } from './general-app.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GENERAL_APP_FEATURE_KEY, GeneralAppState,
} from './general-app.reducer';

// Lookup the 'GeneralApp' feature state managed by NgRx
export const selectGeneralAppState = createFeatureSelector<GeneralAppState>(
  GENERAL_APP_FEATURE_KEY
);

export const selectFeature = (state: GeneralAppState) => state.loading;
 

export const isLoading = createSelector(
  selectGeneralAppState,
  (state: GeneralAppState):boolean => state.loading
);



//////////////////////////////////////////
/////Defaut selectors by Nrwl/Nx//////////
//////////////////////////////////////////

/*


 const { selectAll, selectEntities } = generalAppAdapter.getSelectors();

 export const selectAllGeneralApp = createSelector(
   selectGeneralAppState,
   (state: GeneralAppState) => selectAll(state)
 );

 export const selectGeneralAppLoaded = createSelector(
   selectGeneralAppState,
   (state: GeneralAppState) => state.loaded
 );

 export const selectGeneralAppError = createSelector(
   selectGeneralAppState,
   (state: GeneralAppState) => state.error
 );


 export const selectGeneralAppEntities = createSelector(
   selectGeneralAppState,
   (state: GeneralAppState) => selectEntities(state)
 );

 export const selectSelectedId = createSelector(
   selectGeneralAppState,
   (state: GeneralAppState) => state.selectedId
 );

 export const selectEntity = createSelector(
   selectGeneralAppEntities,
   selectSelectedId,
   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
 );


*/
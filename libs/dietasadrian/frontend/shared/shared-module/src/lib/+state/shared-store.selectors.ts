import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHARED_STORE_FEATURE_KEY,
  SharedStoreState,
} from './shared-store.reducer';

// Lookup the 'SharedStore' feature state managed by NgRx
export const selectSharedStoreState = createFeatureSelector<SharedStoreState>(
  SHARED_STORE_FEATURE_KEY
);

export const selectFeature = (state: SharedStoreState) => state.loading;
export const selectSharedStoreLoading = createSelector(
  selectSharedStoreState,
  (state: SharedStoreState) => state.loading
);

// const { selectAll, selectEntities } = sharedStoreAdapter.getSelectors();

// export const selectSharedStoreLoaded = createSelector(
//   selectSharedStoreState,
//   (state: SharedStoreState) => state.loaded
// );

// export const selectSharedStoreError = createSelector(
//   selectSharedStoreState,
//   (state: SharedStoreState) => state.error
// );

// export const selectAllSharedStore = createSelector(
//   selectSharedStoreState,
//   (state: SharedStoreState) => selectAll(state)
// );

// export const selectSharedStoreEntities = createSelector(
//   selectSharedStoreState,
//   (state: SharedStoreState) => selectEntities(state)
// );

// export const selectSelectedId = createSelector(
//   selectSharedStoreState,
//   (state: SharedStoreState) => state.selectedId
// );

// export const selectEntity = createSelector(
//   selectSharedStoreEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );

// import { SharedStoreEntity } from './shared-store.models';
// import {
//   sharedStoreAdapter,
//   SharedStorePartialState,
//   initialSharedStoreState,
// } from './shared-store.reducer';
// import * as SharedStoreSelectors from './shared-store.selectors';

// describe('SharedStore Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getSharedStoreId = (it: SharedStoreEntity) => it.id;
//   const createSharedStoreEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as SharedStoreEntity);

//   let state: SharedStorePartialState;

//   beforeEach(() => {
//     state = {
//       sharedStore: sharedStoreAdapter.setAll(
//         [
//           createSharedStoreEntity('PRODUCT-AAA'),
//           createSharedStoreEntity('PRODUCT-BBB'),
//           createSharedStoreEntity('PRODUCT-CCC'),
//         ],
//         {
//           ...initialSharedStoreState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         }
//       ),
//     };
//   });

//   describe('SharedStore Selectors', () => {
//     it('selectAllSharedStore() should return the list of SharedStore', () => {
//       const results = SharedStoreSelectors.selectAllSharedStore(state);
//       const selId = getSharedStoreId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('selectEntity() should return the selected Entity', () => {
//       const result = SharedStoreSelectors.selectEntity(
//         state
//       ) as SharedStoreEntity;
//       const selId = getSharedStoreId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('selectSharedStoreLoaded() should return the current "loaded" status', () => {
//       const result = SharedStoreSelectors.selectSharedStoreLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('selectSharedStoreError() should return the current "error" state', () => {
//       const result = SharedStoreSelectors.selectSharedStoreError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

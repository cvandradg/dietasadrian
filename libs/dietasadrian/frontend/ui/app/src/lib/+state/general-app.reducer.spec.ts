import { Action } from '@ngrx/store';

import * as GeneralAppActions from './general-app.actions';
import { GeneralAppEntity } from './general-app.models';
import {
  GeneralAppState,
  initialGeneralAppState,
  generalAppReducer,
} from './general-app.reducer';

describe('GeneralApp Reducer', () => {
  const createGeneralAppEntity = (id: string, name = ''): GeneralAppEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid GeneralApp actions', () => {
    it('loadGeneralAppSuccess should return the list of known GeneralApp', () => {
      const generalApp = [
        createGeneralAppEntity('PRODUCT-AAA'),
        createGeneralAppEntity('PRODUCT-zzz'),
      ];
      const action = GeneralAppActions.loadGeneralAppSuccess({ generalApp });

      const result: GeneralAppState = generalAppReducer(
        initialGeneralAppState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = generalAppReducer(initialGeneralAppState, action);

      expect(result).toBe(initialGeneralAppState);
    });
  });
});

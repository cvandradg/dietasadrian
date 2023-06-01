import { GeneralAppEntity } from './general-app.models';
import {
  generalAppAdapter,
  GeneralAppPartialState,
  initialGeneralAppState,
} from './general-app.reducer';
import * as GeneralAppSelectors from './general-app.selectors';

describe('GeneralApp Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGeneralAppId = (it: GeneralAppEntity) => it.id;
  const createGeneralAppEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GeneralAppEntity);

  let state: GeneralAppPartialState;

  beforeEach(() => {
    state = {
      generalApp: generalAppAdapter.setAll(
        [
          createGeneralAppEntity('PRODUCT-AAA'),
          createGeneralAppEntity('PRODUCT-BBB'),
          createGeneralAppEntity('PRODUCT-CCC'),
        ],
        {
          ...initialGeneralAppState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('GeneralApp Selectors', () => {
    it('selectAllGeneralApp() should return the list of GeneralApp', () => {
      const results = GeneralAppSelectors.selectAllGeneralApp(state);
      const selId = getGeneralAppId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = GeneralAppSelectors.selectEntity(
        state
      ) as GeneralAppEntity;
      const selId = getGeneralAppId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectGeneralAppLoaded() should return the current "loaded" status', () => {
      const result = GeneralAppSelectors.selectGeneralAppLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGeneralAppError() should return the current "error" state', () => {
      const result = GeneralAppSelectors.selectGeneralAppError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

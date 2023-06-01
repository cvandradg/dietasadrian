import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GeneralAppActions from './general-app.actions';
import { GeneralAppEffects } from './general-app.effects';

describe('GeneralAppEffects', () => {
  let actions: Observable<Action>;
  let effects: GeneralAppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        GeneralAppEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GeneralAppEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GeneralAppActions.initGeneralApp() });

      const expected = hot('-a-|', {
        a: GeneralAppActions.loadGeneralAppSuccess({ generalApp: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

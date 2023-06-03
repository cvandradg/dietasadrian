

import { Observable} from 'rxjs';

export abstract class AbstractFirebaseAuthHandler {
  abstract loading$: Observable<boolean>;



}

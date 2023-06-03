import { Injectable } from '@angular/core';
import { AbstractFirebaseAuthHandler } from '@interfaces/AbstractFirebaseAuthHandler.interface';
import { SharedStoreFacade } from '@shared-modules/+state/shared-store.facade';

@Injectable()
export class HandlerService implements AbstractFirebaseAuthHandler {
  loading$ = this.facade.loading$;

  constructor(public facade: SharedStoreFacade) {}
}

import { inject } from '@angular/core';
import { HelperService } from '@helperFunctionsService';
import { tap } from 'rxjs';
import * as _ from 'lodash';
import { MatDialogState } from '@angular/material/dialog';

export const domainGuard = () => {
  const helper = inject(HelperService);
  tap((value: any) => {
    console.log('value', value);
    
    // if (helper.getMatDialog()?.getState() === MatDialogState.OPEN) {
    //   helper.getMatDialog().close();

    //   return false;
    // }

    // return true;
  });
};



  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | boolean
  //   | UrlTree
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree> {
  //      ...guard logic...
  // }




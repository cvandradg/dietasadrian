import { Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HelperService } from '@helperFunctionsService';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { MatDialogState } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private helper: HelperService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.helper.getMatDialog()?.getState() === MatDialogState.OPEN) {
      this.helper.getMatDialog().close();

      return false;
    }

    return true;
  }
}

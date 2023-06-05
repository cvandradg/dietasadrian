import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

import {
  from,
  defer,
  finalize,
  tap,
  take,
  Observable,
  ObservableInput,
  first,
} from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';
import { SharedStoreFacade } from '../../+state/shared-store.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private sharedStoreFacade: SharedStoreFacade
  ) {}

  auth(credentials: { user: string; pass: string }) {
    return this.defer(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.user,
        credentials.pass
      )
    );
  }

  createAccount(credentials: { user: string; pass: string }) {
    return this.defer(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.user,
        credentials.pass
      )
    );
  }

  getCurrentUser() {
    return this.defer(this.firebaseAuth.currentUser);
  }

  getUserSession() {
    return this.defer(this.firebaseAuth.authState);
  }

  sendEmailVerification(userCredentials: any) {
    return this.defer(sendEmailVerification(userCredentials));
  }

  verifyEmail(code: string) {
    return this.defer(this.firebaseAuth.applyActionCode(code));
  }

  checkOobCode(oobCode: string) {
    return this.defer(this.firebaseAuth.checkActionCode(oobCode));
  }

  recoverPassword(email: string) {
    return from(this.firebaseAuth.sendPasswordResetEmail(email));
  }

  resetPass(code: string, pass: string) {
    return this.defer(this.firebaseAuth.confirmPasswordReset(code, pass));
  }

  googleSignin() {
    return this.defer(
      this.firebaseAuth.signInWithPopup(new GoogleAuthProvider())
    );
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  defer(firebaseCall: Promise<unknown> | ObservableInput<any>) {
    return defer(() => {
      this.sharedStoreFacade.showLoader();
      return from(firebaseCall).pipe(first(), this.finalize());
    });
  }

  //Applications is so fast, there is not time to show the spinner, so we add a timeout
  finalize() {
    return finalize(() => {
      setTimeout(() => {
        return this.sharedStoreFacade.hideLoader();
      }, 200);
    });
  }
}

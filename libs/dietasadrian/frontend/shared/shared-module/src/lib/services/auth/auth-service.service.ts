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
} from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';
import { SharedStoreFacade } from '@shared-modules/+state/shared-store.facade';

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

  createAccount(credentials: { userEmail: string; pass: string }) {
    return this.defer(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.userEmail,
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
    return sendEmailVerification(userCredentials);
  }

  verifyEmail(code: string) {
    return this.defer(this.firebaseAuth.applyActionCode(code));
  }

  checkOobCode(oobCode: string) {
    return this.defer(this.firebaseAuth.checkActionCode(oobCode));
  }

  recoverPassword(email: string) {
    return this.defer(this.firebaseAuth.sendPasswordResetEmail(email));
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
      return from(firebaseCall).pipe(take(1), this.finalize());
    });
  }

  finalize() {
    this.sharedStoreFacade.hideLoader();
    return finalize(() => undefined);
  }

  // facebookSignin() {
  //   // return from(this.firebaseAuth.signInWithPopup(new FacebookAuthProvider()));
  //   return from(this.firebaseAuth.signInWithRedirect(new FacebookAuthProvider()));
  // }

  // twitterSignin() {
  //   // return from(this.firebaseAuth.signInWithPopup(new TwitterAuthProvider()));
  //   return from(this.firebaseAuth.signInWithRedirect(new TwitterAuthProvider()));
  // }
}

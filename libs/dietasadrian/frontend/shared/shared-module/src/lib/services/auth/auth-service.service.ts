import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { from } from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {}

  auth(credentials: { user: string; pass: string }) {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.user,
        credentials.pass
      )
    );
  }

  createAccount(credentials: { userEmail: string; pass: string }) {
    return this.firebaseAuth.createUserWithEmailAndPassword(
      credentials.userEmail,
      credentials.pass
    );
  }

  getUserSession() {
    return from(this.firebaseAuth.authState);
  }

  sendEmailVerification(userCredentials: any) {
    return sendEmailVerification(userCredentials);
  }

  verifyEmail(code: string) {
    return from(this.firebaseAuth.applyActionCode(code));
  }

  checkOobCode(oobCode: string) {
    return from(this.firebaseAuth.checkActionCode(oobCode));
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  recoverPassword(email: string) {
    return from(this.firebaseAuth.sendPasswordResetEmail(email));
  }

  resetPass(code: string, pass: string) {
    return from(this.firebaseAuth.confirmPasswordReset(code, pass));
  }

  googleSignin() {
    return from(this.firebaseAuth.signInWithPopup(new GoogleAuthProvider()));
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

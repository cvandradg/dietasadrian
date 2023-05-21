import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { from } from 'rxjs';
import { sendEmailVerification, UserCredential } from 'firebase/auth';

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

  async createAccount(credentials: { userEmail: string; pass: string }) {
    const userCredentials:any = await this.firebaseAuth.createUserWithEmailAndPassword(
      credentials.userEmail,
      credentials.pass
    );

    await sendEmailVerification(userCredentials?.user);

    return userCredentials;
  }

  confirmEmail(code: string) {
    return this.firebaseAuth.applyActionCode(code);
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

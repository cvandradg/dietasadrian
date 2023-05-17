import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
} from '@angular/fire/auth';


import { from, of } from 'rxjs';

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

  recoverPassword(email: string) {
    return from(this.firebaseAuth.sendPasswordResetEmail(email));
  }

  resetPass(code: string, pass: string) {
    return from(this.firebaseAuth.confirmPasswordReset(code, pass));
  }

  googleSignin() {
    console.log('llega?');
    
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


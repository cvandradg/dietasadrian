import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, User } from '@angular/fire/auth';

import { from, of, catchError, NEVER, map } from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';
import { SharedStoreFacade } from '../../+state/shared-store.facade';
import { FirebaseError } from 'firebase/app';

import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { Credentials } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  facade = inject(SharedStoreFacade);
  authService = inject(Auth);
  firebaseAuth = inject(AngularFireAuth);
  errorHelperService = inject(ErrorHandlerService);

  verifyEmail(code: string) {
    return from(this.firebaseAuth.applyActionCode(code));
  }

  checkOobCode(oobCode: string) {
    return this.firebaseAuth.checkActionCode(oobCode);
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  resetPass(code: string, pass: string) {
    return this.firebaseAuth.confirmPasswordReset(code, pass);
  }

  recoverPassword(email: string) {
    return from(this.firebaseAuth.sendPasswordResetEmail(email));
  }

  getCurrentUser() {
    localStorage.setItem('attemptedToLoggedIn', 'true');
    return this.firebaseAuth.currentUser;
  }

  
  getUserSession() {
    if (localStorage.getItem('attemptedToLoggedIn') !== 'true') return of(null);

    localStorage.setItem('attemptedToLoggedIn', 'true');
    return this.firebaseAuth.authState;
  }

  createAccount({ user, pass }: Credentials) {
    localStorage.setItem('attemptedToLoggedIn', 'true');
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(user, pass)
    ).pipe(this.getUser);
  }

  googleSignin() {
    localStorage.setItem('attemptedToLoggedIn', 'true');
    return from(
      this.firebaseAuth.signInWithPopup(new GoogleAuthProvider())
    ).pipe(this.getUser);
  }

  auth({ user, pass }: Credentials) {
    localStorage.setItem('attemptedToLoggedIn', 'true');
    return from(this.firebaseAuth.signInWithEmailAndPassword(user, pass)).pipe(
      this.getUser
    );
  }

  sendEmailVerification(userInfo: User) {
    return from(sendEmailVerification(userInfo as User)).pipe(
      catchError((err: FirebaseError) => {
        this.facade.setError(this.errorHelperService.firebaseErrorHandler(err));
        return NEVER;
      })
    );
  }

  get getUser() {
    return map((response: any) => response.user.multiFactor.user as User);
  }
}

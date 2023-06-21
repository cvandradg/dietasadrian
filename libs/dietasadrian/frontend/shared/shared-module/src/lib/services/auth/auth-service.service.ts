import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';

import {
  from,
  defer,
  finalize,
  ObservableInput,
  first,
  of,
  catchError,
  NEVER,
  Subject,
  filter,
  map,
} from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';
import { SharedStoreFacade } from '../../+state/shared-store.facade';
import { FirebaseError } from 'firebase/app';

import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { generalError } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly error$ = new Subject<generalError>();
  firebaseAuth = inject(AngularFireAuth);
  sharedStoreFacade = inject(SharedStoreFacade);
  errorHelperService = inject(ErrorHandlerService);

  error = { status: false, message: '', error: undefined };

  getCurrentUser() {
    return this.defer(this.firebaseAuth.currentUser);
  }

  sendEmailVerification(userCredentials: User) {
    return this.defer(sendEmailVerification(userCredentials));
  }

  verifyEmail(code: string) {
    return this.defer(this.firebaseAuth.applyActionCode(code));
  }

  checkOobCode(oobCode: string) {
    return this.defer(this.firebaseAuth.checkActionCode(oobCode));
  }

  googleSignin() {
    return this.defer(
      this.firebaseAuth.signInWithPopup(new GoogleAuthProvider())
    );
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  resetPass(code: string, pass: string) {
    return this.defer(this.firebaseAuth.confirmPasswordReset(code, pass)).pipe(
      map(() => true)
    );
  }

  getUserSession() {
    if (localStorage.getItem('attemptedToLoggedIn') !== 'true') {
      return NEVER;
    }

    localStorage.setItem('attemptedToLoggedIn', 'true');
    return this.defer(this.firebaseAuth.authState).pipe(
      filter((emition) => emition !== null)
    );
  }

  authPromise(credentials: { user: string; pass: string }) {
    localStorage.setItem('attemptedToLoggedIn', 'true');
    return this.firebaseAuth.signInWithEmailAndPassword(
      credentials.user,
      credentials.pass
    );
  }

  auth(credentials: { user: string; pass: string }) {
    localStorage.setItem('attemptedToLoggedIn', 'true');
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

  recoverPassword(email: string) {
    return from(this.firebaseAuth.sendPasswordResetEmail(email)).pipe(
      map(() => true),
      catchError((err: any) => {
        if (
          err.code !== 'auth/missing-email' &&
          err.code !== 'auth/invalid-email'
        ) {
          this.error$.next(this.error);
          return of(true);
        }

        this.error$.next(this.errorHelperService.firebaseErrorHandler(err));
        return of(false);
      })
    );
  }

  defer(firebaseCall: Promise<unknown> | ObservableInput<any>) {
    return defer(() => {
      this.sharedStoreFacade.showLoader();
      this.error$.next(this.error);
      return from(firebaseCall).pipe(first(), this.finalize());
    }).pipe(
      catchError((err: FirebaseError) => {
        this.sharedStoreFacade.hideLoader();
        this.error$.next(this.errorHelperService.firebaseErrorHandler(err));

        return NEVER;
      })
    );
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

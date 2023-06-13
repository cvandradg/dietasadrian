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
  throwError,
  concatMap,
  of,
  catchError,
  NEVER,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { sendEmailVerification } from 'firebase/auth';
import { SharedStoreFacade } from '../../+state/shared-store.facade';
import { FirebaseError } from 'firebase/app';

import { ErrorHandlerService } from '@services/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseError$ = new Subject<any>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private sharedStoreFacade: SharedStoreFacade,
    private errorHelperService: ErrorHandlerService
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
    return from(this.firebaseAuth.sendPasswordResetEmail(email)).pipe(
      catchError((err: any) => {
        if (
          err.code !== 'auth/missing-email' &&
          err.code !== 'auth/invalid-email'
        ) {
          console.log('entra al if?');
          this.firebaseError$.next(null);
          return of(true);
        }

        this.firebaseError$.next(
          this.errorHelperService.firebaseErrorHandler(err)
        );
        return of(false);
      })
    );
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
      this.firebaseError$.next(null);
      return from(firebaseCall).pipe(first(), this.finalize());
    }).pipe(
      catchError((err: FirebaseError) => {
        this.sharedStoreFacade.hideLoader();
        this.firebaseError$.next(
          this.errorHelperService.firebaseErrorHandler(err)
        );

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

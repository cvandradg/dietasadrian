import { Directive, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { Subject } from 'rxjs';
import { ErrorHandlerService } from '@shared-modules/services/error-handler/error-handler.service';
import { FirebaseError } from 'firebase/app';

@Directive()
export class Handler {
  destroy = new Subject();

  error = {
    status: false,
    message: '',
  };

  verificationRequired = false;
  successfulReponse = false;

  basicObserver = {
    next: () => {
      this.successfulReponse = true;
    },
    error: this.observerError,
    complete: () => undefined,
  };

  getSessionsObserver = {
    next: async (userInfo: any) => {
      this.clearVariables();

      localStorage.setItem('attemptToLoggedIn', 'true');

      if (!userInfo?.multiFactor?.user) {
        return;
      }

      await userInfo?.multiFactor?.user.reload();

      this.authService.getCurrentUser().subscribe((userInfo2: any) => {
        if (!userInfo2?.emailVerified) {
          this.verificationRequired = true;
          return;
        }

        this.router.navigate(['/landing/dietas/crear']);
      });
    },
    error: this.observerError,
    complete: () => undefined,
  };

  get observerError() {
    return (err: FirebaseError) => {
      this.error = this.errorHelperService.firebaseErrorHandler(err);
    };
  }

  clearVariables() {
    this.error = {
      status: false,
      message: '',
    };

    this.successfulReponse = false;
    this.verificationRequired = false;
  }

  protected router!: Router;
  protected authService!: AuthService;
  protected errorHelperService!: ErrorHandlerService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.authService = injector.get(AuthService);
    this.errorHelperService = injector.get(ErrorHandlerService);
  }
}

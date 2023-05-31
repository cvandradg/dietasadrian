import { ChangeDetectorRef, Directive, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';
import { Subject, finalize } from 'rxjs';

@Directive()
export class Handler {
  error = {
    status: false,
    message: '',
  };

  loading = false;
  successfulReponse = false;
  destroy = new Subject();

  missingMail = false;
  verificationRequired = false;
  loadingRecoverPassword = false;

  basicObserver = {
    next: () => {
      this.successfulReponse = true;
    },
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);
    },
  };

  brandSigninObserver = {
    next: () => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
      this.router.navigate(['/landing/dietas/crear']);
    },
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);
    },
  };

  forgotPasswordObserver = {
    next: () => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
    },
    error: (err: { code: boolean; message: string }) => {
      this.loadingRecoverPassword = false;
      this.error = this.errorHelper.handleError(err);
    },
  };

  loginObserver = {
    next: (UserCredendial: any) => {
      this.clearVariables();
      localStorage.setItem('attemptToLoggedIn', 'true');

      if (!UserCredendial.user._delegate.emailVerified) {
        this.authService.sendEmailVerification(UserCredendial?.user);
        this.verificationRequired = true;
        return;
      }

      this.router.navigate(['/landing/dietas/crear']);
    },
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);
    },
  };

  getSessionsObserver = {
    next: async (userInfo: any) => {
      localStorage.setItem('attemptToLoggedIn', 'true');

      this.clearVariables();

      if (!userInfo?.multiFactor?.user) {
        throw new Error('No user');
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
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);
    },
  };

  codeCheckerObserver = {
    next: (res: { operation: string }) => {
      switch (res.operation) {
        case 'VERIFY_EMAIL':
          this.router.navigate(['/email-verification'], {
            queryParamsHandling: 'preserve',
          });

          break;
        case 'PASSWORD_RESET':
          this.router.navigate(['/passReset'], {
            queryParamsHandling: 'preserve',
          });
          break;
        default:
          break;
      }
    },
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);
    },
  };

  finalize() {
    return finalize(() => {
      this.loading = false;
      this.loadingRecoverPassword = false;
    });
  }

  clearVariables() {
    this.error = {
      status: false,
      message: '',
    };

    this.loading = false;
    this.missingMail = false;
    this.successfulReponse = false;
    this.verificationRequired = false;
    this.loadingRecoverPassword = false;
  }

  protected router!: Router;
  protected authService!: AuthService;
  protected errorHelper!: HelperErrorHandlerService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.authService = injector.get(AuthService);
    this.errorHelper = injector.get(HelperErrorHandlerService);
  }
}

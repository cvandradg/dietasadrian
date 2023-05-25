import { Directive, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';
import { Subject } from 'rxjs';

@Directive()
export class Handler {
  error = {
    status: false,
    message: '',
  };

  loading = false;
  missingMail = false;
  successfulReponse = false;
  verificationRequired = false;
  loadingRecoverPassword = false;

  destroy = new Subject();

  basicObserver = {
    next: () => {
      this.successfulReponse = true;
    },
    error: (err: { code: boolean; message: string }) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);

      this.error = this.errorHelper.handleError(err);
    },
  };

  brandSigninObserver = {
    next: () => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
      this.router.navigate(['/landing/dietas/crear']);
      return 'ok';
    },
    error: (err: { code: boolean; message: string }) => {
      this.error = this.errorHelper.handleError(err);

      return 'err';
    },
    complete: () => {
      return 'complete';
    },
  };

  forgotPasswordObserver = {
    next: () => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
    },
    error: (err: { code: boolean; message: string }) => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
      this.error = this.errorHelper.handleError(err);
    },
  };

  loginObserver = {
    next: (UserCredendial: any) => {
      this.clearVariables();

      if (!UserCredendial.user._delegate.emailVerified) {
        this.authService.sendEmailVerification(UserCredendial);
        this.verificationRequired = true;
        return;
      }

      this.router.navigate(['/landing/dietas/crear']);
      return 'ok';
    },
    error: (err: { code: boolean; message: string }) => {
      this.loading = false;

      this.error = this.errorHelper.handleError(err);
      return 'err';
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

import { Directive, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { Subject } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { FirebaseError } from 'firebase/app';
import { SharedStoreFacade } from '../+state/shared-store.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { validations } from '../types/types';

@Directive()
export class Handler implements OnDestroy {
  router = inject(Router);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  facade = inject(SharedStoreFacade);
  errorHelperService = inject(ErrorHandlerService);
  changeDetectorRef = inject(ChangeDetectorRef);

  loading$ = this.facade.loading$;
  destroy = new Subject();

  loginInputForm = this.formBuilder.group({
    user: validations(Validators.email),
    pass: validations(),
  });

  error = {
    status: false,
    message: '',
  };
  verificationRequired = false;
  successfulReponse = false;

  get observerError() {
    return (err: FirebaseError) => {
      this.error = this.errorHelperService.firebaseErrorHandler(err);
    };
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }

  clearVariables() {
    this.error = {
      status: false,
      message: '',
    };

    this.successfulReponse = false;
    this.verificationRequired = false;
  }
}

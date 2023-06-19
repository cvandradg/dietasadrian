import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { SharedStoreFacade } from '../+state/shared-store.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { validations } from '../types/types';

@Directive({
  providers: []
})
export class firebaseAuthHelper {
  router = inject(Router);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  facade = inject(SharedStoreFacade);
  errorHelperService = inject(ErrorHandlerService);

  loading$ = this.facade.loading$;

  loginInputForm = this.formBuilder.group({
    user: validations(Validators.email),
    pass: validations(),
  });
}

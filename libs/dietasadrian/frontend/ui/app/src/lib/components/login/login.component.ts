import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModuleModule, SharedStoreFacade } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { takeUntil, of } from 'rxjs';
import { Handler } from '@classes/Handler';

import { validations } from '@shared-modules/types/types';
import { Store } from '@ngrx/store';

import { AbstractFirebaseAuthHandler } from '@interfaces/AbstractFirebaseAuthHandler.interface';
import { HandlerService } from '@services/handler/handler.service';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HeaderComponent, SharedModuleModule, RouterModule],
  providers: [
    {
      provide: AbstractFirebaseAuthHandler,
      useClass: HandlerService,
    },
  ],
})
export class LoginComponent extends Handler implements OnInit, OnDestroy {
  loadingRecoverPassword = false;

  loading$ = this.facade.loading$;

  loginInputForm = this.formBuilder.group({
    user: validations(Validators.email),
    pass: validations(),
  });

  constructor(
    private formBuilder: FormBuilder,
    public facade: SharedStoreFacade,
    private ref: ChangeDetectorRef,
    public handler: AbstractFirebaseAuthHandler,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (localStorage.getItem('attemptToLoggedIn') === 'true') this.getSession();
  }

  login() {
    this.clearVariables();
    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .pipe(takeUntil(this.destroy))
      .subscribe(this.loginObserver);
  }

  getSession() {
    this.authService.getUserSession().subscribe(this.getSessionsObserver);
  }

  forgotPassword() {
    this.clearVariables();
    this.loadingRecoverPassword = true;

    this.authService
      .recoverPassword(this.loginInputForm.value.user as string)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.forgotPasswordObserver);
  }

  googleSignin() {
    this.authService
      .googleSignin()
      .pipe(takeUntil(this.destroy))
      .subscribe(this.brandSigninObserver);
  }

  createAccountRedirect() {
    this.router.navigate(['/register']);
  }

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
    error: this.observerError,
    complete: () => undefined,
  };

  forgotPasswordObserver = {
    next: () => {
      this.successfulReponse = true;
      this.loadingRecoverPassword = false;
    },
    error: () => {
      this.loadingRecoverPassword = false;
      return this.observerError;
    },
    complete: () => undefined,
  };

  brandSigninObserver = {
    next: () => {
      this.successfulReponse = true;
      this.router.navigate(['/landing/dietas/crear']);
    },
    error: this.observerError,
    complete: () => undefined,
  };

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

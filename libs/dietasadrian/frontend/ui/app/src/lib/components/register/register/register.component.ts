import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule, SharedStoreFacade } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { ErrorHandlerService } from '@shared-modules/services/error-handler/error-handler.service';
import { Handler } from '@classes/Handler';
import { validations } from '@shared-modules/types/types';
import { takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent, RouterModule],
})
export class RegisterComponent extends Handler implements OnDestroy {
  loading$ = this.facade.loading$;

  buttonEnable = false;
  successAccountCreation = false;
  redirectTimeout = 1;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private facade: SharedStoreFacade,
    private injector: Injector
  ) {
    super(injector);
  }

  loginInputForm = this.formBuilder.group({
    userEmail: validations(Validators.email),
    pass: validations(),
  });

  get isSubmitButtonEnable() {
    return !this.loginInputForm.invalid && this.buttonEnable;
  }

  createAccount() {
    this.clearVariables();
    console.log(this.loginInputForm.value);

    this.authService
      .createAccount(
        this.loginInputForm.value as { userEmail: string; pass: string }
      )
      .pipe(takeUntil(this.destroy))
      .subscribe(this.createAccountObserver);
  }

  createAccountObserver = {
    next: (userInfo: any) => {
      this.clearVariables();

      localStorage.setItem('attemptToLoggedIn', 'true');

      if (!userInfo?.user) {
        return;
      }

      if (!userInfo.user.emailVerified)
        this.authService.sendEmailVerification(userInfo.user).then(() => {
          this.successAccountCreation = true;
        });
    },
    error: this.observerError,
    complete: () => undefined,
  };

  enableButton(isEnable: boolean) {
    this.buttonEnable = isEnable;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent, RouterModule],
})
export class RegisterComponent {
  loading = false;
  error = {
    status: false,
    message: '',
    error: {},
  };
  buttonEnable = false;
  successAccountCreation = false;
  redirectTimeout = 1;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private errorHelper: HelperErrorHandlerService,
    private router: Router
  ) {}

  loginInputForm = this.formBuilder.group({
    userEmail: [
      '',
      [
        Validators.required, // Validators
        Validators.min(5),
        Validators.max(30),
        Validators.email,
      ],
    ],
    pass: [
      '',
      [
        Validators.required, // Validators
        Validators.min(5),
        Validators.max(30),
      ],
    ],
  });

  get isSubmitButtonEnable() {
    return !this.loginInputForm.invalid && this.buttonEnable;
  }

  async createAccount() {
    this.clearVariables();
    this.loading = true;

    await this.authService
      .createAccount(
        this.loginInputForm.value as { userEmail: string; pass: string }
      )
      .then((userCredendial) => {
        this.loading = false;
        this.successAccountCreation = true;
        this.authService.sendEmailVerification(userCredendial);

      })
      .catch((err: { code: boolean; message: string }) => {
        this.loading = false;
        this.error = this.errorHelper.handleError(err);
      });
    // .finally(() => {this.loading = false;}) //It seems that I need a further version of ES, currentl ES02018?
  }

  enableButton(isEnable: boolean) {
    this.buttonEnable = isEnable;
    this.changeDetectorRef.detectChanges();
  }

  clearVariables() {
    this.loading = false;
    this.error = {
      status: false,
      message: '',
      error: {},
    };
    this.buttonEnable = false;
    this.successAccountCreation = false;
  }
}

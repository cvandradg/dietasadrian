import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent],
})
export class RegisterComponent {
  loading = false;
  error = false;
  buttonEnable = false;
  successAccountCreation = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
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
    return !this.loginInputForm.invalid && this.buttonEnable && this.successAccountCreation
    ;
  }

  createAccount() {
    this.loading = true;

    if (this.loginInputForm.invalid) {
      return;
    }

    // this.authService
    // .createAccount(this.loginInputForm.value as { userEmail: string; pass: string })
    // .subscribe({
    //   next: (res) => {
    //     this.loading = false;
    //     this.error = false;
    //     this.successPassReset = true;

    //     return 'ok';
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.error = true;
    //     this.successPassReset = false;
    //     return 'err';
    //   },
    // });

    this.authService
      .createAccount(
        this.loginInputForm.value as { userEmail: string; pass: string }
      )
      .then(
        (res) => {
          console.log('res register', res);
          this.successAccountCreation = true
          this.loading = false;
        },
        (err) => 
        {

          this.loading = false;
          this.error = true;
          console.log('err', err);
        }
      );
  }

  enableButton(isEnable: boolean) {
    this.buttonEnable = isEnable;
    this.changeDetectorRef.detectChanges();
  }
}

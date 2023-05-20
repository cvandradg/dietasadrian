import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, SharedModuleModule],
})
export class RegisterComponent { loading = false;
  error = false;

  successPassReset = false;
  firebaseCode = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
  }

  loginInputForm = this.formBuilder.group({
    UserEmail: [
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
    ]
  });
  
  
  createAccount() {
    this.loading = true;

    if (this.loginInputForm.invalid) {
      return;
    }

    // this.authService
    // .createAccount(this.loginInputForm.value as { user: string; pass: string })
    // .subscribe({
    //   next: (res) => {
    //     this.loading = false;
    //     this.error = false;
    //     this.successPassReset = true;

    //     return 'ok';
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //     this.loading = false;
    //     this.error = true;
    //     this.successPassReset = false;
    //     return 'err';
    //   },
    // });
  }
}
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModuleModule } from '@shared-modules';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HeaderComponent, SharedModuleModule],
})
export class LoginComponent {
  loading = false;
  loadingRecoverPassword = false;
  error = false;
  missingMail = false;
  successMailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginInputForm = this.formBuilder.group({
    user: [
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

  onSubmit() {
    if (this.loginInputForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMailSent = false;
    this.missingMail = false;
    this.error = false;

    this.authService
      .auth(this.loginInputForm.value as { user: string; pass: string })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/landing/dietas/crear']);
          return 'ok';
        },
        error: (err) => {
          this.loading = false;
          this.error = true;
          return 'err';
        },
      });
  }

  forgotPassword() {
    this.loadingRecoverPassword = true;
    this.successMailSent = false;
    this.missingMail = false;
    this.error = false;

    if (this.loginInputForm.value.user === '') {
      this.missingMail = true;
      this.loadingRecoverPassword = false;
      return;
    }

    this.authService
      .recoverPassword(this.loginInputForm.value.user as string)
      .subscribe({
        next: (res) => {
          this.successMailSent = true;
          this.loadingRecoverPassword = false;
          return 'ok';
        },
        error: (err) => {
          this.successMailSent = true;
          this.loadingRecoverPassword = false;
          return 'err';
        },
      });
  }

  googleSignin() {
    this.authService.googleSignin().subscribe({
      next: (res) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log('google res,',res);
        this.router.navigate(['/landing/dietas/crear']);
        return 'ok';
      },
      error: (err) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log(err);
        
        return 'err';
      },
    });
  }

  facebookSignin() {
    this.authService.facebookSignin().subscribe({
      next: (res) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log('fb res,',res);
        this.router.navigate(['/landing/dietas/crear']);
        return 'ok';
      },
      error: (err) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log(err);
        
        return 'err';
      },
    });
  }

  twitterSignin() {
    this.authService.twitterSignin().subscribe({
      next: (res) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log('twitter res,',res);
        this.router.navigate(['/landing/dietas/crear']);
        return 'ok';
      },
      error: (err) => {
        this.successMailSent = true;
        this.loadingRecoverPassword = false;
        console.log(err);
        
        return 'err';
      },
    });
  }
}

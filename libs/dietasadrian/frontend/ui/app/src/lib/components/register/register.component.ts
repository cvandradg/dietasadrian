import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';
import { takeUntil } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
})
export class RegisterComponent extends Handler implements OnInit {
  buttonEnable = true;
  successAccountCreation = false;
  redirectTimeout = 1;
  isPassStrong = false;

  ngOnInit(): void {
    this.loginInputForm.valueChanges.subscribe(() => {
      this.buttonEnable =
        !this.loginInputForm.controls['user'].invalid &&
        !this.successAccountCreation &&
        this.isPassStrong;
    });
  }

  createAccount() {
    this.clearVariables();
    this.buttonEnable = false;

    this.authService
      .createAccount(
        this.loginInputForm.value as { user: string; pass: string }
      )
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (userInfo) => this.createAccountObserver(userInfo),
        error: this.observerError,
      });
  }

  createAccountObserver(userInfo: any) {
    this.clearVariables();
    localStorage.setItem('attemptToLoggedIn', 'true');

    if (!userInfo?.user) {
      return;
    }

    this.successAccountCreation = true;
    this.loginInputForm.controls.pass.disable();
    this.loginInputForm.controls.user.disable();

    if (!userInfo.user.emailVerified)
      this.authService.sendEmailVerification(userInfo.user).subscribe({
        next: () => undefined,
        error: this.observerError,
      });
  }

  enableButton(isEnable: boolean) {
    this.isPassStrong = isEnable;
    this.changeDetectorRef.detectChanges();
  }
}

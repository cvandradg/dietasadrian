import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntil, concatMap } from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
})
export class EmailVerificationComponent extends Handler implements OnInit {
  route = inject(ActivatedRoute);

  firebaseCode = '';
  requiresVerification = false;

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('oobCode')) {
      this.verifyMail();
      return;
    }
  }

  verifyMail() {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

    this.authService
      .verifyEmail(this.firebaseCode)
      .pipe(
        takeUntil(this.destroy),
        concatMap(() => this.authService.getCurrentUser())
      )
      .subscribe({
        next: (res) => this.onGetSessionsObserver(res),
        error: this.observerError,
      });
  }

  async onGetSessionsObserver(userInfo: any) {
    this.clearVariables();

    localStorage.setItem('attemptToLoggedIn', 'true');

    if (!userInfo?.multiFactor?.user) {
      return;
    }

    await userInfo?.multiFactor?.user.reload();

    this.authService.getCurrentUser().subscribe((userInfo2: any) => {
      if (!userInfo2?.emailVerified) {
        this.verificationRequired = true;
        return;
      }

      this.router.navigate(['/landing']);
    });
  }
}

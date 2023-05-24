import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent, RouterModule],
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  firebaseCode = '';
  error = {
    status: false,
    message: '',
  };

  successVerification = false;
  requiresVerification = false;
  destroy = new Subject();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private errorHelper: HelperErrorHandlerService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('oobCode')) {
      this.verifyMail();
      return;
    }

    this.error = {
      status: true,
      message: 'En tu correo encontrarás un link válido de verificación.',
    };
  }

  verifyMail() {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

    this.authService
      .verifyEmail(this.firebaseCode)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: any) => {
          console.log('res login', res);
          this.successVerification = true;
        },
        error: (err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode, errorMessage);

          this.error = this.errorHelper.handleError(err);

          return 'err';
        },
      });
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

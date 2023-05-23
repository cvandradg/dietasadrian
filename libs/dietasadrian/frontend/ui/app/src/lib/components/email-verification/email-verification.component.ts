import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HelperErrorHandlerService } from '@shared-modules/services/helperErrorHandler.service';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent, RouterModule],
})
export class EmailVerificationComponent implements OnInit {
  firebaseCode = '';
  error = {
    status: false,
    message: '',
  };

  successVerification = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private errorHandler: HelperErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

        // this.authService
    //   .sendEmailVerification(createAccountRequest)
    //   .then((res: any) => {
    //     this.successAccountCreation = true;
    //     throw new Error('error en send mail');
    //     this.changeDetectorRef.detectChanges();
    //   })
    //   .catch((err: { code: any; message: any }) => {
    //     this.loading = false;

    //     this.error = this.errorHelper.handleError(err);
    //     console.log('error en send mail', this.error);
    //     this.changeDetectorRef.detectChanges();
    //   });

    this.authService.verifyEmail(this.firebaseCode).subscribe({
      next: (res: any) => {
        console.log('res login', res);
        this.successVerification = true;
      },
      error: (err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);

        this.errorHandler.handleError(err);

        return 'err';
      },
    });
  }
}

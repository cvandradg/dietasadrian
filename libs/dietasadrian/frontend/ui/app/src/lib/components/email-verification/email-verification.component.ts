import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  imports: [CommonModule, SharedModuleModule],
})
export class EmailVerificationComponent implements OnInit {
  firebaseCode = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

    // this.authService.verifyEmail(this.firebaseCode).subscribe({ next: () => {return} });
    this.authService.checkOobCode(this.firebaseCode).subscribe({
      next: (res) => {
        console.log('ress in code verification.',res);
        

        return 'ok';
      },
      error: (err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        return 'err';
      },
    });
  }
}

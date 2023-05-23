import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-oobcode-checker',
  templateUrl: './oobcode-checker.component.html',
  styleUrls: ['./oobcode-checker.component.scss'],
  imports: [CommonModule, SharedModuleModule, SharedModuleModule],
})
export class OobcodeCheckerComponent implements OnInit {
  firebaseCode = '';
  test: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
    this.test = this.route || '';

    this.authService.checkOobCode(this.firebaseCode).subscribe({
      next: (res) => {
        switch (res.operation) {
          case 'VERIFY_EMAIL':
            this.router.navigate(['/email-verification'], {
              queryParamsHandling: 'preserve',
            });

            break;
          case 'PASSWORD_RESET':
            this.router.navigate(['/passReset'], {
              queryParamsHandling: 'preserve',
            });
            break;
          default:
            break;
        }

        return 'ok';
      },
      error: (err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log('err in code verification.', errorCode, errorMessage);

        return 'err';
      },
    });
  }
}

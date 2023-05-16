import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  imports: [CommonModule, SharedModuleModule],
})
export class PassResetComponent implements OnInit{

  loading = false;
  error = false;

  successPassReset = false;
  firebaseCode = '';


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || ''
    
  }

  loginInputForm = this.formBuilder.group({
    pass: [
      '',
      [
        Validators.required, // Validators
        Validators.min(5),
        Validators.max(30),
      ],
    ],
  });

  resetPassword() {
    this.loading = true;

    if (this.loginInputForm.invalid) {
      return;
    }

    this.authService.resetPass(this.firebaseCode, this.loginInputForm.value.pass as string)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.error = false;
          this.successPassReset = true;
          
          return 'ok';
        },
        error: (err) => {
          console.log('err', err);
          this.loading = false;
          this.error = true;
          this.successPassReset = false;


          return 'err';
        },
      });
  }
}

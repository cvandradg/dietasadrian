import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';
import { SharedModuleModule } from '@shared-modules';
import { takeUntil } from 'rxjs';
import { FirebaseError } from 'firebase/app';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, RouterModule],
})
export class PassResetComponent extends Handler implements OnInit {
  route = inject(ActivatedRoute);

  buttonEnable = false;

  successPassReset = false;
  firebaseCode = '';

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
  }

  resetPassword() {
    this.clearVariables();
    if (this.loginInputForm.invalid) {
      return;
    }

    this.authService
      .resetPass(this.firebaseCode, this.loginInputForm.value.pass as string)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.error.status = false;
          this.successPassReset = true;
        },
        error: (err: FirebaseError) => {
          this.successPassReset = false;
          this.observerError(err);
        },
      });
  }

  get isSubmitButtonEnable() {
    return !this.loginInputForm.invalid && this.buttonEnable;
  }

  enableButton(isEnable: boolean) {
    this.buttonEnable = isEnable;
    this.changeDetectorRef.detectChanges();
  }
}

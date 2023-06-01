import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Injector,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';
import { SharedModuleModule } from '@shared-modules';
import { takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  imports: [CommonModule, SharedModuleModule, RouterModule],
})
export class PassResetComponent extends Handler implements OnInit, OnDestroy {
  buttonEnable = false;

  successPassReset = false;
  firebaseCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
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

    this.authService
      .resetPass(this.firebaseCode, this.loginInputForm.value.pass as string)
      .pipe(this.finalize(), takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.error.status = false;
          this.successPassReset = true;

          return 'ok';
        },
        error: (err) => {
          console.log('err', err);
          this.loading = false;
          this.error = this.errorHelper.handleError(err);
          this.successPassReset = false;

          return 'err';
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

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

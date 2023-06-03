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
import { SharedModuleModule, SharedStoreFacade } from '@shared-modules';
import { ErrorHandlerService } from '@shared-modules/services/error-handler/error-handler.service';
import { takeUntil } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { validations } from '@shared-modules/types/types';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  imports: [CommonModule, SharedModuleModule, RouterModule],
})
export class PassResetComponent extends Handler implements OnInit, OnDestroy {
  loading$ = this.facade.loading$;
  buttonEnable = false;

  successPassReset = false;
  firebaseCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private errorHelper: ErrorHandlerService,
    private facade: SharedStoreFacade,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
  }

  loginInputForm = this.formBuilder.group({
    pass: validations(),
  });

  resetPassword() {
    if (this.loginInputForm.invalid) {
      return;
    }

    this.authService
      .resetPass(this.firebaseCode, this.loginInputForm.value.pass as string)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          this.error.status = false;
          this.successPassReset = true;
        },
        error: (err: FirebaseError) => {
          console.log('err', err);
          this.error = this.errorHelper.firebaseErrorHandler(err);
          this.successPassReset = false;
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

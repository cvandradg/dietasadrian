import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Handler } from '@classes/Handler';
import { SharedModuleModule } from '@shared-modules';
import { combineLatest, map, Subject, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, RouterModule],
})
export class PassResetComponent extends Handler {
  route = inject(ActivatedRoute);
  onPassReset$ = new Subject<any>();

  isPassStrong$ = new Subject<boolean>();

  isValidPassword$ = this.loginInputForm.valueChanges.pipe(
    map(() => !this.loginInputForm.controls.pass.invalid)
  );

  enableButton$ = combineLatest([
    this.isValidPassword$,
    this.isPassStrong$,
  ]).pipe(
    map(([isValidPassword, isPassStrong]) => isValidPassword && isPassStrong)
  );

  passReset$ = this.onPassReset$.pipe(
    switchMap(() =>
      this.authService.resetPass(
        this.route.snapshot.queryParamMap.get('oobCode') || '',
        this.loginInputForm.value.pass as string
      )
    )
  );
}

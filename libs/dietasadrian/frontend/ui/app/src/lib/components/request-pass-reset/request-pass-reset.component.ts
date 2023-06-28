import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { SharedModuleModule } from '@shared-modules';
import { combineLatest, map, Subject, switchMap } from 'rxjs';
import { RequestPassResetStore } from './request-pass-reset.store';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-request-pass-reset',
  templateUrl: './request-pass-reset.component.html',
  styleUrls: ['./request-pass-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, RouterModule],
  providers: [RequestPassResetStore],
})
export class RequestPassResetComponent extends firebaseAuthHelper implements OnInit {
  code = ''
  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('oobCode') || ''
  }
  route = inject(ActivatedRoute);
  compStore = inject(RequestPassResetStore)
  
  // onPassReset$ = new Subject<any>();

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

  // passReset$ = this.onPassReset$.pipe(
  //   switchMap(() =>
  //     this.authService.resetPass(
  //       this.route.snapshot.queryParamMap.get('oobCode') || '',
  //       this.loginInputForm.value.pass as string
  //     )
  //   )
  // );
}

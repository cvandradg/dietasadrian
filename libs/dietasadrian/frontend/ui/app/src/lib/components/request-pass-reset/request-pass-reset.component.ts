import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Subject } from 'rxjs';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { RequestPassResetStore } from './request-pass-reset.store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-request-pass-reset',
  templateUrl: './request-pass-reset.component.html',
  styleUrls: ['./request-pass-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, RouterModule],
  providers: [provideComponentStore(RequestPassResetStore)],
})
export class RequestPassResetComponent extends firebaseAuthHelper {
  compStore = inject(RequestPassResetStore);

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
}

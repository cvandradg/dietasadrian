import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterStore } from './register.store';
import { Subject, map, combineLatest } from 'rxjs';
import { SharedModuleModule } from '@shared-modules';
import { NavbarComponent } from '../navbar/navbar.component';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
  providers: [RegisterStore],
})
export class RegisterComponent extends firebaseAuthHelper {
  readonly registerStore = inject(RegisterStore);

  isPassStrong$ = new Subject<boolean>();

  isValidUser$ = this.loginInputForm.valueChanges.pipe(
    map(() => !this.loginInputForm.controls.user.invalid)
  );

  enableButton$ = combineLatest([this.isValidUser$, this.isPassStrong$]).pipe(
    map(([isValidUser, isPassStrong]) => isValidUser && isPassStrong)
  );
}

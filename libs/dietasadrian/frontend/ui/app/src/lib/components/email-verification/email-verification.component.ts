import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { provideComponentStore } from '@ngrx/component-store';
import { EmailVerificationStore } from './email-verification.store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
  providers: [provideComponentStore(EmailVerificationStore)],
})
export class EmailVerificationComponent extends firebaseAuthHelper {
  emailVerificationStore = inject(EmailVerificationStore);
}

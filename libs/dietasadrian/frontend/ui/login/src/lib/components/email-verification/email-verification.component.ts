import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { provideComponentStore } from '@ngrx/component-store';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { EmailVerificationStore } from './email-verification.store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '@shared-modules/components/navbar/navbar.component';

@Component({
  standalone: true,
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  selector: 'dietas-adrian-nx-workspace-email-verification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(EmailVerificationStore)],
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
})
export class EmailVerificationComponent extends firebaseAuthHelper {
  emailVerificationStore = inject(EmailVerificationStore);
}

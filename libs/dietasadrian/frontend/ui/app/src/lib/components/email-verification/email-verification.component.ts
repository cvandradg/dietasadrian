import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmailVerificationStore } from './email-verification.store';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
  providers: [EmailVerificationStore],
})
export class EmailVerificationComponent
  extends firebaseAuthHelper
  implements OnInit
{
  route = inject(ActivatedRoute);
  emailVerificationStore = inject(EmailVerificationStore);

  ngOnInit(): void {
    this.emailVerificationStore.verifyEmail$(
      this.route.snapshot.queryParamMap.get('oobCode') || ''
    );
  }
}

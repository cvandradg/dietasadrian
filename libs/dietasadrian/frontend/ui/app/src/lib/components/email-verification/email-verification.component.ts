import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { takeUntil, concatMap } from 'rxjs';
import { Handler } from '@classes/Handler';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  imports: [CommonModule, SharedModuleModule, HeaderComponent, RouterModule],
})
export class EmailVerificationComponent
  extends Handler
  implements OnInit, OnDestroy
{
  firebaseCode = '';

  requiresVerification = false;

  constructor(
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('oobCode')) {
      this.verifyMail();
      return;
    }

    this.error.status = true;
    this.error.message =
      'En tu correo encontrarás un link válido de verificación.';
  }

  verifyMail() {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

    this.authService
      .verifyEmail(this.firebaseCode)
      .pipe(takeUntil(this.destroy),
      concatMap (res => this.authService.getCurrentUser()))
      .subscribe(this.getSessionsObserver);
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

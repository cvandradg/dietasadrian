import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Handler } from '@classes/Handler';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, NavbarComponent, RouterModule],
})
export class EmailVerificationComponent extends Handler {
  route = inject(ActivatedRoute);

  verifyMail$ = this.authService
    .verifyEmail(this.route.snapshot.queryParamMap.get('oobCode') || '')
    .pipe(
      switchMap(() => this.authService.getCurrentUser()),
      map(async (userInfo: any) => {
        await userInfo?.multiFactor?.user.reload();

        if (!userInfo?.emailVerified)
          return this.authService.error$.next({
            status: true,
            message:
              'El correo no ha sido verificado, inténtalo de nuevo o ponte en contacto con nosotros.',
            error: undefined,
          });

        this.router.navigate(['/landing']);
        return '';
      })
    );
}

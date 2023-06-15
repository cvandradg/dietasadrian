import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { map } from 'rxjs';
import { Handler } from '@classes/Handler';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-oobcode-checker',
  templateUrl: './oobcode-checker.component.html',
  styleUrls: ['./oobcode-checker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, SharedModuleModule],
})
export class OobcodeCheckerComponent extends Handler {
  route = inject(ActivatedRoute);

  checkOobCode$ = this.authService
    .checkOobCode(this.route.snapshot.queryParamMap.get('oobCode') || '')
    .pipe(
      map((res: any) => {
        switch (res.operation) {
          case 'VERIFY_EMAIL':
            this.router.navigate(['/email-verification'], {
              queryParamsHandling: 'preserve',
            });
            break;

          case 'PASSWORD_RESET':
            this.router.navigate(['/passReset'], {
              queryParamsHandling: 'preserve',
            });
            break;
        }
      })
    );
}

import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { takeUntil } from 'rxjs';
import { Handler } from '@classes/Handler';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-oobcode-checker',
  templateUrl: './oobcode-checker.component.html',
  styleUrls: ['./oobcode-checker.component.scss'],
  imports: [CommonModule, SharedModuleModule, SharedModuleModule],
})
export class OobcodeCheckerComponent
  extends Handler
  implements OnInit, OnDestroy
{
  firebaseCode = '';

  constructor(private route: ActivatedRoute, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.firebaseCode = this.route.snapshot.queryParamMap.get('oobCode') || '';

    this.authService
      .checkOobCode(this.firebaseCode)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.codeCheckerObserver);
  }

  codeCheckerObserver = {
    next: (res: any) => {
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
        default:
          break;
      }
    },
    error: this.observerError,
    complete: () => undefined,
  };

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

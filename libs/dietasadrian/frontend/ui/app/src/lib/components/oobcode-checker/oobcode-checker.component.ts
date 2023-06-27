import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { OobcodeCheckerStore } from './oobcode-checker.store';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-oobcode-checker',
  templateUrl: './oobcode-checker.component.html',
  styleUrls: ['./oobcode-checker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, SharedModuleModule],
  providers: [OobcodeCheckerStore],
})
export class OobcodeCheckerComponent
  extends firebaseAuthHelper
  implements OnInit
{
  route = inject(ActivatedRoute);
  oobCodeCheckerStore = inject(OobcodeCheckerStore);

  ngOnInit(): void {
    console.log('hola', this.route.snapshot.queryParamMap.get('oobCode') || '');
    
    this.oobCodeCheckerStore.checkCode$(
      this.route.snapshot.queryParamMap.get('oobCode') || ''
    );
  }
}

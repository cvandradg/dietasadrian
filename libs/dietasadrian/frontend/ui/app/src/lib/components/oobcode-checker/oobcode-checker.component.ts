import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { firebaseAuthHelper } from '@classes/firebaseAuthHelper';
import { OobcodeCheckerStore } from './oobcode-checker.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-oobcode-checker',
  templateUrl: './oobcode-checker.component.html',
  styleUrls: ['./oobcode-checker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule, SharedModuleModule],
  providers: [provideComponentStore(OobcodeCheckerStore)],
})
export class OobcodeCheckerComponent extends firebaseAuthHelper {
  oobCodeCheckerStore = inject(OobcodeCheckerStore);
}

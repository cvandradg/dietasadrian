import { CommonModule } from '@angular/common';
import { MODULES } from '@shared-modules/exports/export-modules';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-tertiary-animated-button',
  templateUrl: './tertiary-animated-button.component.html',
  styleUrls: ['./tertiary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TertiaryAnimatedButtonComponent {
  @Output() submitEvent = new EventEmitter<never>();

  @Input() small = false;
  @Input() buttonText = 'Some Small Text';
  @Input() fontawesomeIcon: IconProp = ['fas', 'user'];

  onSubmit() {
    this.submitEvent.emit();
  }
}

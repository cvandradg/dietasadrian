import { CommonModule } from '@angular/common';
import { MODULES } from '../../exports/export-modules';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-secondary-animated-button',
  templateUrl: './secondary-animated-button.component.html',
  styleUrls: ['./secondary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
})
export class SecondaryAnimatedButtonComponent {
  @Output() submitEvent = new EventEmitter<never>();

  @Input() small = false;
  @Input() buttonText = 'Some Text';
  @Input() fontawesomeIcon: IconProp = ['fas', 'user'];

  onSubmit() {
    this.submitEvent.emit();
  }
}

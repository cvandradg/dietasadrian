import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '@shared-modules/exports/export-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-secondary-animated-button',
  templateUrl: './secondary-animated-button.component.html',
  styleUrls: ['./secondary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
})
export class SecondaryAnimatedButtonComponent {
  @Output() submitEvent = new EventEmitter<any>();
  @Input() buttonText!: string

  onClickEvent() {
    this.submitEvent.emit()
  }
}

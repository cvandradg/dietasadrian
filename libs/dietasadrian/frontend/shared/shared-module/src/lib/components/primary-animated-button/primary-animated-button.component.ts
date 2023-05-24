import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '@shared-modules/exports/export-modules';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-primary-animated-button',
  templateUrl: './primary-animated-button.component.html',
  styleUrls: ['./primary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
})
export class PrimaryAnimatedButtonComponent {
  
  @Output() submitEvent = new EventEmitter<any>();
  @Input() loading = false;
  @Input() enable = false;
  @Input()
  buttonText!: string;

  onSubmit() {
    this.submitEvent.emit();
  }
}

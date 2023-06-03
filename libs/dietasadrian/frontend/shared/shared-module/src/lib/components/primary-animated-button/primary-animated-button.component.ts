import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../exports/export-modules';
import { Observer } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-primary-animated-button',
  templateUrl: './primary-animated-button.component.html',
  styleUrls: ['./primary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
})
export class PrimaryAnimatedButtonComponent {
  @Output() submitEvent = new EventEmitter<never>();
  @Input() loading = false;
  @Input() enable = false;
  @Input()
  buttonText!: string;

  onSubmit() {
    this.submitEvent.emit();
  }
}
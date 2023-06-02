import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODULES } from '../../exports/export-modules';
import { Store } from '@ngrx/store';
import { hideLoading, showLoading } from '../../+state/shared-store.actions';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-primary-animated-button',
  templateUrl: './primary-animated-button.component.html',
  styleUrls: ['./primary-animated-button.component.scss'],
  imports: [CommonModule, MODULES],
})
export class PrimaryAnimatedButtonComponent implements OnInit {

  constructor(private store:Store) { }

  ngOnInit(): void {
return
  }
  
  @Output() submitEvent = new EventEmitter<any>();
  @Input() loading = false;
  @Input() enable = false;
  @Input()
  buttonText!: string;

  onSubmit() {
    this.submitEvent.emit();
  }
}

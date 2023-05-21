import {
  Component,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-strength-meter',
  templateUrl: './strength-meter.component.html',
  styleUrls: ['./strength-meter.component.scss'],
  imports: [CommonModule],
})
export class StrengthMeterComponent implements OnInit, OnChanges {
  @Input() password = '';
  @Output() enableButton = new EventEmitter<boolean>();

  result = '';
  symbols = /[$-/:-?{-~!"^_@`[\]]+/;
  lowerLetters = /[a-z]+/;
  upperLetters = /[A-Z]+/;
  numbers = /[0-9]+/;
  passLength = {
    test: (pass: string) => {
      return pass.length >= 5;
    },
  };

  validationFlags = [
    this.symbols,
    this.lowerLetters,
    this.upperLetters,
    this.numbers,
    this.passLength,
  ];

  ngOnInit(): void {
    console.log(this.symbols);
  }

  ngOnChanges(changes: any): void {

    this.passStrengthMeter(changes?.password?.currentValue);
  }

  passStrengthMeter(pass: string): 'debil' | 'media' | 'fuerte' {
    const result = this.validationFlags.filter((regexFlags: any) => {

      if (regexFlags.test(pass)) {
        return true;
      }

      return false;
    });


    if (result.length <= 2) {
      this.result = 'debil';
      this.isButtonEnable(false);
      return 'debil';
    }

    if (result.length <= 4) {
      this.result = 'media';

      this.isButtonEnable(false);
      return 'media';
    }

    this.isButtonEnable(true);
    this.result = 'fuerte';
    return 'fuerte';
  }

  isButtonEnable(isEnable: boolean): void {
    this.enableButton.emit(isEnable);
  }
}

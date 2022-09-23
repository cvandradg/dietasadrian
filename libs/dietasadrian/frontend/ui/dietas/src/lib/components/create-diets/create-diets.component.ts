import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

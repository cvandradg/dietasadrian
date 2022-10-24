import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dietas-adrian-nx-workspace-my-diets',
  templateUrl: './my-diets.component.html',
  styleUrls: ['./my-diets.component.scss'],
})
export class MyDietsComponent {
  
}

@NgModule({
  imports: [CommonModule],
  declarations: [MyDietsComponent],
  exports: [MyDietsComponent],
})
export class MyDietsComponentModule {}

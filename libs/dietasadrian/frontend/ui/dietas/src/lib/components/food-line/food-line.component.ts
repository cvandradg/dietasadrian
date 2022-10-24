import {
  Component,
  Input,
  NgModule,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';

@Component({
  selector: 'dietas-adrian-nx-workspace-food-line',
  templateUrl: './food-line.component.html',
  styleUrls: ['./food-line.component.scss'],
})
export class FoodLineComponent {
  @Input()
  foodLine: any;

  @Output() foodLineChange = new EventEmitter<any>();
  @Output() deleteFoodLine = new EventEmitter<any>();

  deleteIngredient() {
    this.foodLine.ingredients.splice(0, 1);
  }

  addIngredient() {
    this.foodLine.ingredients.push('pollo 100g');
  }

  deleteLine(foodLineId: string) {
    this.deleteFoodLine.emit({ foodLineId });
  }
}

@NgModule({
  imports: [CommonModule, SharedModuleModule],
  declarations: [FoodLineComponent],
  exports: [FoodLineComponent],
})
export class FoodLineComponentModule {}

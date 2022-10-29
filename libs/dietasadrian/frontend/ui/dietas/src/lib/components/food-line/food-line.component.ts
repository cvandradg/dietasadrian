import {
  Component,
  Input,
  NgModule,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { HelperService } from '@helperFunctionsService';

@Component({
  selector: 'dietas-adrian-nx-workspace-food-line',
  templateUrl: './food-line.component.html',
  styleUrls: ['./food-line.component.scss'],
})
export class FoodLineComponent implements OnInit {
  @Input()
  foodLine: any;

  @Output() foodLineChange = new EventEmitter<any>();
  @Output() deleteFoodLine = new EventEmitter<any>();

  constructor(private helper: HelperService) {}

  ngOnInit(): void {
    this.addIngredient();
  }

  deleteIngredient() {
    this.foodLine.ingredients.splice(0, 1);
  }

  addIngredient() {
    this.helper
      .openAddIngredientDialog()
      .afterClosed()
      .subscribe((result: any) => {
        if(!result){
          return
        }
        
        return this.foodLine.ingredients.push(`${result.ingredient} ${result.quantity}`)});
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

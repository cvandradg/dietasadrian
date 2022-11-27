import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '@interfaces';
import { SharedModuleModule } from '@shared-modules';
import { FoodLineComponent } from '../food-line/food-line.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { HelperService } from '@helperFunctionsService';
import { v4 as uuidv4 } from 'uuid';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModuleModule, FoodLineComponent],

  selector: 'dietas-adrian-nx-workspace-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  @Input()
  meal!: Meal;

  @Input()
  index!: number;

  @Output()
  deleteMeal = new EventEmitter<any>();

  @Input()
  screenSize!: number;

  constructor(private helper: HelperService) {}

  onDeleteFoodLine($event: any) {
    this.helper
      .openConfirmationDialog('Desea borrar la linea?')
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (!confirm) {
          return;
        }

        const FOOD_ID_INDEX = this.helper.findIndex(
          this.meal.foodLines,
          $event.foodLineId
        );

        this.meal.foodLines.splice(FOOD_ID_INDEX, 1);
      });
  }

  delete() {
    this.helper
      .openConfirmationDialog('Desea borrar la comida?')
      .afterClosed()
      .subscribe((confirm: boolean) => {
        return confirm ? this.deleteMeal.emit({ mealId: this.meal.id }) : false;
      });
  }

  addFoodLine() {
    if (this.ifaLineIsEmpty(this.meal.foodLines)) {
      return;
    }

    this.meal.foodLines.push({
      id: uuidv4(),
      position: this.meal.foodLines.length,
      ingredients: [],
    });
  }

  ifaLineIsEmpty(array: any[]) {
    return array.slice().some((lines: any) => lines.ingredients.length === 0);
  }

  //Material design needed
  linesDrop(event: any): void {
    moveItemInArray(
      this.meal.foodLines,
      event.previousIndex,
      event.currentIndex
    );
  }
}

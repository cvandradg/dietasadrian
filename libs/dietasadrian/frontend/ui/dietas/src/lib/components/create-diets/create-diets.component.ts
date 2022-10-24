import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ConfirmationDialogComponent,
  SharedModuleModule,
} from '@shared-modules';
import { v4 as uuidv4 } from 'uuid';
import { findIndex } from '@helperFunctions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FoodLineComponentModule } from '../food-line/food-line.component';

export interface IngredientLine {
  id: string;
  position: number;
  ingredients: string[];
}

export interface Meal {
  id: string;
  position: number;
  foodLines: any;
}

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent {
  constructor(public dialog: MatDialog, public overlay: Overlay) {}

  meals: Meal[] = [
    {
      id: uuidv4(),
      position: 0,
      foodLines: [
        {
          id: uuidv4(),
          position: 0,
          ingredients: ['pollo 100g'],
        },
      ],
    },
  ];

  addFoodLine(mealId: string) {
    const MEAL_ID_INDEX = findIndex(this.meals, mealId);

    if (this.ifaLineIsEmpty(this.meals[MEAL_ID_INDEX].foodLines)) {
      return;
    }

    this.meals[MEAL_ID_INDEX].foodLines.push({
      id: uuidv4(),
      position: this.meals[MEAL_ID_INDEX].foodLines.length,
      ingredients: [],
    });
  }

  addMeal() {
    const uuid = uuidv4();

    this.meals.push({
      id: uuid,
      position: this.meals.length,
      foodLines: [],
    });

    this.addFoodLine(uuid);
  }

  deleteMeal(mealIndex: number) {
    this.openDialog('Desea borrar la comida?')
      .afterClosed()
      .subscribe((confirm: boolean) =>
        confirm ? this.meals.splice(mealIndex, 1) : false
      );
  }

  onDeleteFoodLine(mealId: string, $event: any) {
    this.openDialog('Desea borrar la linea?')
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (!confirm) {
          return;
        }

        const { MEAL_ID_INDEX, FOOD_ID_INDEX } = this.getMealLineIndex(
          mealId,
          $event.foodLineId
        );

        this.meals[MEAL_ID_INDEX].foodLines.splice(FOOD_ID_INDEX, 1);
      });
  }

  //Desied type CdkDragDrop<string[]>
  //Material design needed
  mealsDrop(event: any) {
    moveItemInArray(this.meals, event.previousIndex, event.currentIndex);
  }

  //Material design needed
  linesDrop(event: any, mealId: string): void {
    const MEAL_ID_INDEX = findIndex(this.meals, mealId);

    moveItemInArray(
      this.meals[MEAL_ID_INDEX].foodLines,
      event.previousIndex,
      event.currentIndex
    );
  }

  openDialog(message: string): MatDialogRef<any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        width: '250px',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        message,
      },
    });
  }

  ifaLineIsEmpty(array: any[]) {
    return array.slice().some((lines: any) => lines.ingredients.length === 0);
  }

  getMealLineIndex(mealId: string, foodLineId: string) {
    const MEAL_ID_INDEX = findIndex(this.meals, mealId);
    const FOOD_ID_INDEX = findIndex(
      this.meals[MEAL_ID_INDEX].foodLines,
      foodLineId
    );

    return { MEAL_ID_INDEX, FOOD_ID_INDEX };
  }
}

@NgModule({
  imports: [CommonModule, SharedModuleModule, FoodLineComponentModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

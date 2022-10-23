import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';
import { v4 as uuidv4 } from 'uuid';
import { findIndex } from '@helperFunctions';

export interface Fruit {
  name: string;
}

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

    this.meals[MEAL_ID_INDEX].foodLines.push({
      id: uuidv4(),
      position: this.meals[MEAL_ID_INDEX].foodLines.length,
      ingredients: [],
    });
  }

  deleteFoodLine(mealId: string, foodLineId: string) {
    const { MEAL_ID_INDEX, FOOD_ID_INDEX } = this.getMealLineIndex(
      mealId,
      foodLineId
    );

    this.meals[MEAL_ID_INDEX].foodLines.splice(FOOD_ID_INDEX, 1);
  }

  addIngredient(mealId: string, foodLineId: string) {
    const { MEAL_ID_INDEX, FOOD_ID_INDEX } = this.getMealLineIndex(
      mealId,
      foodLineId
    );

    this.meals[MEAL_ID_INDEX].foodLines[FOOD_ID_INDEX].ingredients.push(
      'pollo 100g'
    );
  }

  addMeal() {
    this.meals.push({
      id: uuidv4(),
      position: this.meals.length,
      foodLines: [],
    });
  }

  deleteMeal(index: number) {
    this.meals.splice(index, 1);
  }

  deleteIngredient(
    mealId: string,
    foodLineId: string,
    ingredientIndex: number
  ) {
    const { MEAL_ID_INDEX, FOOD_ID_INDEX } = this.getMealLineIndex(
      mealId,
      foodLineId
    );

    this.meals[MEAL_ID_INDEX].foodLines[FOOD_ID_INDEX].ingredients.splice(
      ingredientIndex,
      1
    );
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

  //Material design needed
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
  imports: [CommonModule, SharedModuleModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

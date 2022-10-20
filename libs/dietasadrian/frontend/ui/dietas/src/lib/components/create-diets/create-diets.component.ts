import { Component, NgModule } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';
import { v4 as uuidv4 } from 'uuid';

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
          ingredients: ['pollo 100g']
        }
      ]
    }
  ];

  addFoodLine(mealId: string) {
    const MEAL_ID_INDEX = this.meals.findIndex((meal) => meal.id === mealId);

    this.meals[MEAL_ID_INDEX].foodLines.push({
      id: uuidv4(),
      position: this.meals[MEAL_ID_INDEX].foodLines.length,
      ingredients: [],
    });
  }

  addIngredient(mealId: string, foodLineId: string) {
    const MEAL_ID_INDEX = this.meals.findIndex((meal) => meal.id === mealId);

    const FOOD_ID_INDEX = this.meals[MEAL_ID_INDEX].foodLines.findIndex(
      (foodLine: any) => foodLine.id === foodLineId
    );

    this.meals[MEAL_ID_INDEX].foodLines[FOOD_ID_INDEX].ingredients.push(
      'pollo 100g'
    );

    console.log('meals,',this.meals);

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
    const MEAL_ID_INDEX = this.meals.findIndex((meal) => meal.id === mealId);

    const FOOD_ID_INDEX = this.meals[MEAL_ID_INDEX].foodLines.findIndex(
      (foodLine: any) => foodLine.id === foodLineId
    );

    this.meals[MEAL_ID_INDEX].foodLines[FOOD_ID_INDEX].ingredients.splice(
      ingredientIndex,
      1
    );

    
  }

  //Desied type CdkDragDrop<string[]>
  drop(event: any) {
    moveItemInArray(this.meals, event.previousIndex, event.currentIndex);
  }
}

@NgModule({
  imports: [CommonModule, SharedModuleModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

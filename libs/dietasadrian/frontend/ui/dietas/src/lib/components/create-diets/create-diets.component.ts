import { Component, NgModule, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';
import { v4 as uuidv4 } from 'uuid';
import { HelperService } from '@helperFunctionsService';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MealComponentModule } from '../meal/meal.component';

export interface IngredientLine {
  id: string;
  position: number;
  ingredients: string[];
}

export interface Meal {
  name: string;
  id: string;
  position: number;
  foodLines: any;
}

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    public overlay: Overlay,
    private helper: HelperService
  ) {}


  meals: Meal[] = [];

  ngOnInit(): void {
    this.addMeal()
  }

  addMeal() {
    this.meals.push({
      name: `Comida ${ this.meals.length + 1 }`,
      id: uuidv4(),
      position: this.meals.length,
      foodLines: [],
    });
  }

  onDeleteMeal($event: any) {
    const MEAL_ID_INDEX = this.helper.findIndex(this.meals, $event);

    this.meals.splice(MEAL_ID_INDEX, 1);
  }

  //Desied type CdkDragDrop<string[]>
  //Material design needed
  mealsDrop(event: any) {
    moveItemInArray(this.meals, event.previousIndex, event.currentIndex);
  }
}

@NgModule({
  imports: [CommonModule, SharedModuleModule, MealComponentModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

import { Component, NgModule } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent {
  meals = ['Episode I - The Phantom Menace'];

  foodLines: Fruit[] = [{ name: 'pollo' }];

  ingredients: string[] = ['pollo 100g'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.foodLines.push({ name: value });
    }

    // Clear the input value
    event.chipInput?.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.foodLines.indexOf(fruit);

    if (index >= 0) {
      this.foodLines.splice(index, 1);
    }
  }

  addFoodLine() {
    this.foodLines.push({ name: 'pollo' });
  }

  addIngredient() {
    this.ingredients.push('pollo 100g');
  }

  addMeal() {
    this.meals.push('random movie');
  }

  deleteMeal(index: number) {
    this.meals.splice(index, 1);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
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

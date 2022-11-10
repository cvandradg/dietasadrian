import { Component, HostListener, NgModule, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';
import { v4 as uuidv4 } from 'uuid';
import { HelperService, debounce } from '@helperFunctionsService';
import { Overlay } from '@angular/cdk/overlay';
import { MealComponentModule } from '../meal/meal.component';
import { Meal } from '@interfaces';

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent implements OnInit {
  meals: Meal[] = [];

  screenSize = 0;

  constructor(public overlay: Overlay, private helper: HelperService) {}

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event: any) {
    this.screenSize = event.target.innerWidth;
  }

  addMeal() {
    this.meals.push({
      name: `Comida ${this.meals.length + 1}`,
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

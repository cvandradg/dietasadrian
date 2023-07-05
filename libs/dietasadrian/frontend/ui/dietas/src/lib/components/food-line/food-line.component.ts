import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { HelperService } from '@helperFunctionsService';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-food-line',
  templateUrl: './food-line.component.html',
  styleUrls: ['./food-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule],
})
export class FoodLineComponent {
  helper = inject(HelperService)

  @Input()
  foodLine: any;

  @Output() foodLineChange = new EventEmitter<any>();
  @Output() deleteFoodLine = new EventEmitter<any>();

  deleteIngredient() {
    this.foodLine.ingredients.splice(0, 1);
  }

  addIngredient() {
    this.helper
      .openAddIngredientDialog()
      .afterClosed()
      .subscribe((result: any) => {
        if (!result) {
          return;
        }

        return this.foodLine.ingredients.push(
          `${result.ingredient} ${result.quantity}`
        );
      });
  }

  deleteLine(foodLineId: string) {
    this.deleteFoodLine.emit({ foodLineId });
  }

  drop(event: CdkDragDrop<any[]>, ingredients: any[]) {
    moveItemInArray(ingredients, event.previousIndex, event.currentIndex);
  }
}

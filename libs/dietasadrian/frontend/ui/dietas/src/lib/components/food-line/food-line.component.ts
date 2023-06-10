import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '@shared-modules';
import { HelperService } from '@helperFunctionsService';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dietas-adrian-nx-workspace-food-line',
  templateUrl: './food-line.component.html',
  styleUrls: ['./food-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SharedModuleModule],
})
export class FoodLineComponent implements OnDestroy {
  @Input()
  foodLine: any;

  @Output() foodLineChange = new EventEmitter<any>();
  @Output() deleteFoodLine = new EventEmitter<any>();

  destroy = new Subject();

  constructor(private helper: HelperService) {}

  deleteIngredient() {
    this.foodLine.ingredients.splice(0, 1);
  }

  addIngredient() {
    this.helper
      .openAddIngredientDialog()
      .afterClosed()
      .pipe(takeUntil(this.destroy))
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

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.complete();
  }
}

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, } from '@angular/cdk/drag-drop';
import { SharedModuleModule } from '@shared-modules';

@Component({
  selector: 'dietas-adrian-nx-workspace-create-diets',
  templateUrl: './create-diets.component.html',
  styleUrls: ['./create-diets.component.scss'],
})
export class CreateDietsComponent {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode I - The Phantom Menace',


  ];

  //Desied type CdkDragDrop<string[]>
  drop(event: any) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}

@NgModule({
  imports: [CommonModule, SharedModuleModule],
  declarations: [CreateDietsComponent],
  exports: [CreateDietsComponent],
})
export class CreateDietsComponentModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodLineComponent } from './food-line.component';

describe('FoodLineComponent', () => {
  let component: FoodLineComponent;
  let fixture: ComponentFixture<FoodLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

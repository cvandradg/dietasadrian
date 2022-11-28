import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalCompositionComponent } from './nutritional-composition.component';

describe('NutritionalCompositionComponent', () => {
  let component: NutritionalCompositionComponent;
  let fixture: ComponentFixture<NutritionalCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionalCompositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionalCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

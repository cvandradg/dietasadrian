import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDietsComponent } from './create-diets.component';

describe('CreateDietsComponent', () => {
  let component: CreateDietsComponent;
  let fixture: ComponentFixture<CreateDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDietsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

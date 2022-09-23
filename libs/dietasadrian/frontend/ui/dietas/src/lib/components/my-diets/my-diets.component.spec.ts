import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDietsComponent } from './my-diets.component';

describe('MyDietsComponent', () => {
  let component: MyDietsComponent;
  let fixture: ComponentFixture<MyDietsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDietsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

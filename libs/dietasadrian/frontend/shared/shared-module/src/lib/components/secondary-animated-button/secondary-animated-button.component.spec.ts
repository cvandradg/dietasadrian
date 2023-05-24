import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryAnimatedButtonComponent } from './secondary-animated-button.component';

describe('SecondaryAnimatedButtonComponent', () => {
  let component: SecondaryAnimatedButtonComponent;
  let fixture: ComponentFixture<SecondaryAnimatedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryAnimatedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryAnimatedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

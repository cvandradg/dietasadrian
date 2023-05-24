import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryAnimatedButtonComponent } from './primary-animated-button.component';

describe('PrimaryAnimatedButtonComponent', () => {
  let component: PrimaryAnimatedButtonComponent;
  let fixture: ComponentFixture<PrimaryAnimatedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryAnimatedButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryAnimatedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

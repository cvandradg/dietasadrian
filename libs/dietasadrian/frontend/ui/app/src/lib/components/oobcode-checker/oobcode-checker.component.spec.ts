import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OobcodeCheckerComponent } from './oobcode-checker.component';

describe('OobcodeCheckerComponent', () => {
  let component: OobcodeCheckerComponent;
  let fixture: ComponentFixture<OobcodeCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OobcodeCheckerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OobcodeCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

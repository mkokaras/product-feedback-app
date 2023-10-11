import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedbackComponent } from './create-feedback.component';
import { Store } from '@ngrx/store';

describe('CreateFeedbackComponent', () => {
  let component: CreateFeedbackComponent;
  let fixture: ComponentFixture<CreateFeedbackComponent>;

  beforeEach(async () => {
    const store = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [CreateFeedbackComponent],
      providers: [{ provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

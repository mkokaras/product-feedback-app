import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFeedbackComponent } from './edit-feedback.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Feedback } from '@core/models';
import { db } from '@core/config';
import * as fromFeedback from '../../store/feedback.reducers';
import { selectFeedback } from '../../store/feedback.selectors';

describe('EditFeedbackComponent', () => {
  let component: EditFeedbackComponent;
  let fixture: ComponentFixture<EditFeedbackComponent>;
  let store!: MockStore;
  let mockFeedbackSelector: MemoizedSelector<
    fromFeedback.State,
    Feedback | null
  >;
  const initialState = { feedback: db.productRequests[0] };

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    const activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' }),
      },
    };

    await TestBed.configureTestingModule({
      imports: [EditFeedbackComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFeedbackComponent);

    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    mockFeedbackSelector = store.overrideSelector(
      selectFeedback,
      db.productRequests[0]
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

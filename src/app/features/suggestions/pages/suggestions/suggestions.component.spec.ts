import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionsComponent } from './suggestions.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromSuggestions from '../../store/suggestions.reducers';

describe('SuggestionsComponent', () => {
  let component: SuggestionsComponent;
  let fixture: ComponentFixture<SuggestionsComponent>;
  let store: MockStore;

  const initialState: fromSuggestions.State = {
    suggestions: [],
    toggleSort: false,
    currSortOption: 'most upvotes',
    currCategory: 'all',
    statusCounts: {
      planned: 0,
      suggestion: 0,
      live: 0,
      'in-progress': 0,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

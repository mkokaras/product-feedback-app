import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SuggestionsEffects } from './suggestions.effects';
import {
  fetchCategoryCounts,
  fetchSuggestions,
  startCreateSuggestion,
  startEditSuggestion,
  upvoteSuggestion,
  viewRoadmap,
  viewSuggestionDetails,
} from './suggestions.actions';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { Router } from '@angular/router';
import { db } from '@core/config';
import { Feedback } from '@core/models';

describe('Suggestions Effects', () => {
  let effects: any;
  let actions$: Observable<Action>;
  let feedbackService: any;
  let router: any;

  beforeEach(async () => {
    actions$ = new Observable<Action>();
    const feedbackServiceSpy = jasmine.createSpyObj('FeedbackService', [
      'getAllFeedbacks',
      'getAllCategoryCounts',
      'updateOneFeedback',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        SuggestionsEffects,
        { provide: FeedbackService, useValue: feedbackServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(SuggestionsEffects);
    feedbackService = TestBed.inject(FeedbackService);
    router = TestBed.inject(Router);
  });
  it('should fetch suggestions', () => {
    actions$ = of({ type: fetchSuggestions.type });

    const suggestions = db.productRequests.filter(
      (feedback) => feedback.status === 'suggestion'
    );

    feedbackService.getAllFeedbacks.and.returnValue(of([...suggestions]));

    effects.fetchSuggestions.subscribe((result: any) => {
      const { suggestions: fetchedSuggestions, type } = result;

      expect(fetchedSuggestions.length).toBe(suggestions.length);

      expect(type).toBe('[Suggestions] Store Suggestions');
    });
  });
  it('should fetch category counts', () => {
    actions$ = of({ type: fetchCategoryCounts.type });

    const counts = db.productRequests.reduce(
      (acc, curr) => {
        if (curr.status === 'planned') {
          acc.planned++;
        }

        if (curr.status === 'live') {
          acc.live++;
        }

        if (curr.status === 'suggestion') {
          acc.suggestion++;
        }

        if (curr.status === 'in-progress') {
          acc['in-progress']++;
        }

        return acc;
      },
      { planned: 0, live: 0, 'in-progress': 0, suggestion: 0 }
    );

    feedbackService.getAllCategoryCounts.and.returnValue(of({ ...counts }));

    effects.fetchCategoryCounts.subscribe((result: any) => {
      const { counts: fetchedCount, type } = result;

      expect(fetchedCount).toEqual(counts);

      expect(type).toBe('[Suggestions] Store Categoru Counts');
    });
  });
  it('should upvote suggestion', () => {
    actions$ = of({ type: upvoteSuggestion.type });

    const suggestion = db.productRequests.filter(
      (feedback) => feedback.status === 'suggestion'
    )[0];

    feedbackService.updateOneFeedback.and.returnValue(
      of({ ...suggestion, upvotes: suggestion.upvotes + 1 })
    );

    effects.upvoteSuggestion.subscribe((result: any) => {
      const { suggestion: fetchedSuggestion, type } = result;

      expect(fetchedSuggestion.upvotes).toEqual(suggestion.upvotes + 1);

      expect(type).toBe('[Suggestions] Set Suggestion');
    });
  });
  it('should nav to create suggestion', () => {
    actions$ = of({ type: startCreateSuggestion.type });

    effects.navToCreateSuggestion.subscribe();

    expect(router.navigate).toHaveBeenCalledWith(['/feedback/create']);
  });

  it('should nav to edit suggestion', () => {
    const suggestion = db.productRequests.filter(
      (feedback) => feedback.status === 'suggestion'
    )[0];

    actions$ = of({ type: startEditSuggestion.type, id: suggestion.id });

    effects.navToEditSuggestion.subscribe();

    expect(router.navigate).toHaveBeenCalledWith([
      '/feedback',
      suggestion.id,
      'edit',
    ]);
  });
  it('should nav to suggestion details', () => {
    const suggestion = db.productRequests.filter(
      (feedback) => feedback.status === 'suggestion'
    )[0];

    actions$ = of({ type: viewSuggestionDetails.type, id: suggestion.id });

    effects.navToSuggestionDetails.subscribe();

    expect(router.navigate).toHaveBeenCalledWith(['/feedback', suggestion.id]);
  });
  it('should nav to roadmap', () => {
    actions$ = of({ type: viewRoadmap.type });

    effects.navToRoadmap.subscribe();

    expect(router.navigate).toHaveBeenCalledWith(['/roadmap']);
  });
});

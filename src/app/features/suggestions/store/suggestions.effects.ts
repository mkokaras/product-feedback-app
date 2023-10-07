import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SuggestionsActions from './suggestions.actions';
import { EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SuggestionsEffects {
  fetchSuggestions = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.fetchSuggestions),
      switchMap(() =>
        this.feedbackService.getAllFeedbacks('suggestion').pipe(
          map((suggestions) =>
            SuggestionsActions.storeSuggestions({ suggestions })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  fetchCategoryCounts = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.fetchCategoryCounts),
      switchMap(() =>
        this.feedbackService.getAllCategoryCounts().pipe(
          map((counts) => SuggestionsActions.storeCategoryCounts({ counts })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  upvoteSuggestion = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.upvoteSuggestion),
      switchMap(({ id, votes }) =>
        this.feedbackService.updateOneFeedback(id, { upvotes: votes }).pipe(
          map((suggestion) => SuggestionsActions.setSuggestion({ suggestion })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  navToCreateSuggestion = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuggestionsActions.startCreateSuggestion),
        tap(() => this.router.navigate(['/feedback/create']))
      ),
    { dispatch: false }
  );

  navToEditSuggestion = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuggestionsActions.startEditSuggestion),
        tap(({ id }) => this.router.navigate(['/feedback', id, 'edit']))
      ),
    { dispatch: false }
  );

  navToSuggestionDetails = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuggestionsActions.viewSuggestionDetails),
        tap(({ id }) => this.router.navigate(['/feedback', id]))
      ),
    { dispatch: false }
  );

  navToRoadmap = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuggestionsActions.viewRoadmap),
        tap(() => this.router.navigate(['/roadmap']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}
}

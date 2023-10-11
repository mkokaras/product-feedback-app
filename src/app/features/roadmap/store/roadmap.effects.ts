import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FeedbackActions from './roadmap.actions';
import { EMPTY, catchError, combineLatest, map, switchMap } from 'rxjs';
import { Feedback } from '@core/models';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RoadmapEffects {
  fetchAllFeedbacks = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.fetchFeedbacks),
      switchMap(() =>
        combineLatest([
          this.feedbackService.getAllFeedbacks('planned'),
          this.feedbackService.getAllFeedbacks('live'),
          this.feedbackService.getAllFeedbacks('in-progress'),
        ]).pipe(
          map(([planned, live, progress]) =>
            FeedbackActions.storeFeedbacks({
              feedbacks: [...planned, ...live, ...progress],
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService
  ) {}
}

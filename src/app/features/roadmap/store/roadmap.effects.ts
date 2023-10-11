import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RoadmapActions from './roadmap.actions';
import { EMPTY, catchError, combineLatest, map, switchMap, tap } from 'rxjs';
import { Feedback } from '@core/models';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RoadmapEffects {
  fetchAllFeedbacks = createEffect(() =>
    this.actions$.pipe(
      ofType(RoadmapActions.fetchFeedbacks),
      switchMap(() =>
        combineLatest([
          this.feedbackService.getAllFeedbacks('planned'),
          this.feedbackService.getAllFeedbacks('live'),
          this.feedbackService.getAllFeedbacks('in-progress'),
        ]).pipe(
          map(([planned, live, progress]) =>
            RoadmapActions.storeFeedbacks({
              feedbacks: [...planned, ...live, ...progress],
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  navToCreateFeedback = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoadmapActions.startCreateFeedback),
        tap(() => {
          this.router.navigate(['/feedback/create']);
        })
      ),
    { dispatch: false }
  );

  navToEditFeedback = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoadmapActions.startEditFeedback),
        tap(({ id }) => {
          console.log('called feedback');
          this.router.navigate(['/feedback', id, 'edit']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}
}

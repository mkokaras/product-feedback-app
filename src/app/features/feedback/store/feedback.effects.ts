import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FeedbackActions from './feedback.actions';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { EMPTY, catchError, delay, map, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import * as AppActions from 'src/app/store/app.actions';

@Injectable()
export class FeedbackEffects {
  createFeedback = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedbackActions.createFeedback),
        switchMap(({ feedback }) =>
          this.feedbackService.createOneFeedback(feedback).pipe(
            map(() => {
              return AppActions.goBack();
            }),
            catchError(() => {
              console.log('err');
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: true }
  );

  fetchFeedback = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.fetchFeedback),

      switchMap(({ id }) =>
        this.feedbackService.getOneFeedback(id).pipe(
          map((feedback) => FeedbackActions.storeFeedback({ feedback })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateFeedback = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.updateFeedback),
      switchMap(({ id, feedback }) =>
        this.feedbackService.updateOneFeedback(id, feedback).pipe(
          map(() => AppActions.goBack()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteFeedback = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.deleteFeedback),
      tap((id) => console.log(id)),
      switchMap(({ id }) =>
        this.feedbackService.deleteOneFeedback(id).pipe(
          map(() => AppActions.goBack()),
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

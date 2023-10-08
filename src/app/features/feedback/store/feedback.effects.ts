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
          this.feedback.createOneFeedback(feedback).pipe(
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

  constructor(private actions$: Actions, private feedback: FeedbackService) {}
}

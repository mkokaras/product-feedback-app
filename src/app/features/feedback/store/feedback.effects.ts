import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FeedbackActions from './feedback.actions';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import {
  EMPTY,
  catchError,
  delay,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Injectable } from '@angular/core';
import * as AppActions from 'src/app/store/app.actions';
import { CommentService } from '@core/services/comment/comment.service';
import { selectUser } from 'src/app/store/user.selectors';
import { Store } from '@ngrx/store';

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

  upvoteFeedback = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.upvoteFeedback),
      switchMap(({ id, upvotes }) =>
        this.feedbackService.updateOneFeedback(id, { upvotes }).pipe(
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

  createComment = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.createComment),
      switchMap(({ comment, feedbackId, user }) =>
        this.commentService
          .createOneComment(feedbackId, { content: comment, user: user })
          .pipe(
            map((comment) => FeedbackActions.storeComment({ comment })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService,
    private commentService: CommentService
  ) {}
}

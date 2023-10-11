import { Feedback } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const fetchFeedbacks = createAction('[Roadmap] Fetch feedbacks');

export const storeFeedbacks = createAction(
  '[Roadmap] Store feedbacks',
  props<{
    feedbacks: Feedback[];
  }>()
);

export const startCreateFeedback = createAction(
  '[Roadmap] Start Create  Feedback'
);

export const startEditFeedback = createAction(
  '[Roadmap] Start Edit Feedback',
  props<{ id: number }>()
);

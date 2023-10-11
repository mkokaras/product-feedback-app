import { Feedback } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const fetchFeedbacks = createAction('[Roadmap] Fetch feedbacks');

export const storeFeedbacks = createAction(
  '[Roadmap] Store feedbacks',
  props<{
    feedbacks: Feedback[];
  }>()
);

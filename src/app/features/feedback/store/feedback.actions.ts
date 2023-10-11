import { Feedback } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const createFeedback = createAction(
  '[Feeback] Create feedback',
  props<{ feedback: Partial<Feedback> }>()
);

export const fetchFeedback = createAction(
  '[Feeback] Fetch feedback',
  props<{ id: number }>()
);

export const storeFeedback = createAction(
  '[Feedback] Store feedback',
  props<{ feedback: Feedback }>()
);

export const updateFeedback = createAction(
  '[Feedback] Update Feedback',
  props<{ id: number; feedback: Partial<Feedback> }>()
);

export const deleteFeedback = createAction(
  '[Feedback] Delete Feedback',
  props<{ id: number }>()
);

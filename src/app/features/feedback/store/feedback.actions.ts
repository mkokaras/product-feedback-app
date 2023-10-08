import { Feedback } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const createFeedback = createAction(
  '[Feeback] Create feedback',
  props<{ feedback: Partial<Feedback> }>()
);

import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectFeedbackState = (state: AppState) => state.feedbacks;

export const selectFeedback = createSelector(
  selectFeedbackState,
  (state) => state.feedback
);

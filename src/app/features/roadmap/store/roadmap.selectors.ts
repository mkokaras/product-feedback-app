import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectRoadmapState = (state: AppState) => state.roadmap;

export const selectFeedbacks = createSelector(
  selectRoadmapState,
  (state) => state.feedbacks
);

export const selectPlannedFeedbacks = createSelector(selectFeedbacks, (state) =>
  state.filter((feedback) => feedback.status === 'planned')
);
export const selectLiveFeedbacks = createSelector(selectFeedbacks, (state) =>
  state.filter((feedback) => feedback.status === 'live')
);
export const selectProgressFeedbacks = createSelector(
  selectFeedbacks,
  (state) => state.filter((feedback) => feedback.status === 'in-progress')
);

export const selectPlannedFeedbacksCount = createSelector(
  selectPlannedFeedbacks,
  (state) => state.length
);

export const selectProgressFeedbacksCount = createSelector(
  selectProgressFeedbacks,
  (state) => state.length
);

export const selectLiveFeedbacksCount = createSelector(
  selectLiveFeedbacks,
  (state) => state.length
);

import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from '../features/suggestions/store/suggestions.reducers';
import * as fromFeedback from '../features/feedback/store/feedback.reducers';
import * as fromRoadMap from '../features/roadmap/store/roadmap.reducers';
export interface AppState {
  suggestions: fromSuggestions.State;
  feedbacks: fromFeedback.State;
  roadmap: fromRoadMap.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.suggestionsReducer,
  feedbacks: fromFeedback.feedbackReducer,
  roadmap: fromRoadMap.roadMapReducer,
};

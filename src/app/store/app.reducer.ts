import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from '../features/suggestions/store/suggestions.reducers';
import * as fromFeedback from '../features/feedback/store/feedback.reducers';
import * as fromRoadMap from '../features/roadmap/store/roadmap.reducers';
import * as fromUser from './user.reducer';

export interface AppState {
  suggestions: fromSuggestions.State;
  feedbacks: fromFeedback.State;
  roadmap: fromRoadMap.State;
  user: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.suggestionsReducer,
  feedbacks: fromFeedback.feedbackReducer,
  roadmap: fromRoadMap.roadMapReducer,
  user: fromUser.userReducer,
};

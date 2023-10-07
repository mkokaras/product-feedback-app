import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from '../features/suggestions/store/suggestions.reducers';

export interface AppState {
  suggestions: fromSuggestions.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.suggestionsReducer,
};

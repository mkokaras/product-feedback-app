import { Feedback, SuggestionSortOption } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import * as SuggestionActions from './suggestions.actions';

export interface State {
  suggestions: Feedback[];
  toggleSort: boolean;
  currSortOption: SuggestionSortOption;
  currCategory: string;
  statusCounts: { [key in Feedback['status']]: number };
}

const initialState: State = {
  suggestions: [],
  toggleSort: false,
  currSortOption: 'most upvotes',
  currCategory: 'all',
  statusCounts: {
    live: 0,
    suggestion: 0,
    'in-progress': 0,
    planned: 0,
  },
};

export const suggestionsReducer = createReducer(
  initialState,
  on(SuggestionActions.storeSuggestions, (state, { suggestions }) => {
    return { ...state, suggestions };
  }),
  on(
    SuggestionActions.setSuggestion,
    (state, { suggestion: newSuggestion }) => {
      const suggestions = [...state.suggestions];

      const idx = suggestions.findIndex(
        (suggestion) => suggestion.id === newSuggestion.id
      );

      suggestions[idx] = { ...suggestions[idx], ...newSuggestion };

      return { ...state, suggestions };
    }
  ),
  on(SuggestionActions.toggleSort, (state) => ({
    ...state,
    toggleSort: !state.toggleSort,
  })),
  on(SuggestionActions.setSortOption, (state, { option }) => ({
    ...state,
    currSortOption: option,
  })),
  on(SuggestionActions.setCategory, (state, { category }) => ({
    ...state,
    currCategory: category,
  })),
  on(SuggestionActions.storeCategoryCounts, (state, { counts }) => ({
    ...state,
    statusCounts: { ...counts },
  }))
);

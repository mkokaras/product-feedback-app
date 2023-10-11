import { db } from '@core/config';
import {
  setCategory,
  setSortOption,
  setSuggestion,
  storeCategoryCounts,
  storeSuggestions,
  toggleSort,
} from './suggestions.actions';
import * as fromSuggestions from './suggestions.reducers';
import { Feedback } from '@core/models';

describe('Suggestions Reducers', () => {
  let suggestions = db.productRequests.filter((f) => f.status === 'suggestion');

  beforeEach(() => {
    suggestions = db.productRequests.filter((f) => f.status === 'suggestion');
  });

  describe('unknown action', () => {
    it('should return default state', () => {
      const { initialState } = fromSuggestions;

      const action = {
        type: 'Unknown',
      };

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
  describe('storeSuggestions action', () => {
    it('should store all suggestions', () => {
      const { initialState } = fromSuggestions;

      const newState: fromSuggestions.State = {
        ...initialState,
        suggestions: [...suggestions],
      };

      const action = storeSuggestions({ suggestions });

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(initialState);
    });
  });
  describe('setSuggestions action', () => {
    it('should set suggestion', () => {
      const { initialState } = fromSuggestions;

      const filledState: fromSuggestions.State = {
        ...initialState,
        suggestions: [...suggestions],
      };

      const newSuggestion: Partial<Feedback> = {
        title: 'Updated suggestion',
      };

      const newState: fromSuggestions.State = {
        ...initialState,
        suggestions: [
          { ...suggestions[0], ...newSuggestion },
          ...suggestions.slice(1),
        ],
      };

      const action = setSuggestion({ suggestion: newState.suggestions[0] });

      const state = fromSuggestions.suggestionsReducer(filledState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(filledState);

      expect(state.suggestions[0].title).toBe('Updated suggestion');
    });
  });
  describe('toggleSort action', () => {
    it('should toggle sort', () => {
      const { initialState } = fromSuggestions;

      const newState: fromSuggestions.State = {
        ...initialState,
        toggleSort: true,
      };

      const action = toggleSort();

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(initialState);
    });
  });
  describe('setSortOption action', () => {
    it('should set sort option', () => {
      const { initialState } = fromSuggestions;

      const newState: fromSuggestions.State = {
        ...initialState,
        currSortOption: 'least comments',
      };

      const action = setSortOption({ option: 'least comments' });

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(initialState);
    });
  });
  describe('setCategory action', () => {
    it('should set category', () => {
      const { initialState } = fromSuggestions;

      const newState: fromSuggestions.State = {
        ...initialState,
        currCategory: 'UX',
      };

      const action = setCategory({ category: 'UX' });

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(initialState);
    });
  });
  describe('storeCategoryCounts action', () => {
    it('should store status counters', () => {
      const { initialState } = fromSuggestions;

      const newState: fromSuggestions.State = {
        ...initialState,
        statusCounts: {
          'in-progress': 10,
          live: 7,
          suggestion: 5,
          planned: 3,
        },
      };

      const action = storeCategoryCounts({
        counts: {
          'in-progress': 10,
          live: 7,
          suggestion: 5,
          planned: 3,
        },
      });

      const state = fromSuggestions.suggestionsReducer(initialState, action);

      expect(state).toEqual(newState);

      expect(state).not.toBe(initialState);
    });
  });
});

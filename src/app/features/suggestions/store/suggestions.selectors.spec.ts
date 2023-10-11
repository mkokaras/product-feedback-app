import { db } from '@core/config';
import { AppState } from 'src/app/store/app.reducer';
import * as fromSuggestions from './suggestions.selectors';

describe('Suggestion Selectors', () => {
  const suggestions = db.productRequests.filter(
    (f) => f.status === 'suggestion'
  );

  const initialState: AppState = {
    suggestions: {
      suggestions: [...suggestions],
      toggleSort: false,
      currSortOption: 'most upvotes',
      currCategory: 'all',
      statusCounts: {
        suggestion: 0,
        planned: 0,
        'in-progress': 0,
        live: 0,
      },
    },
    feedbacks: {
      feedback: null,
    },
    roadmap: {
      feedbacks: [],
    },
  };

  it('should select suggestions state', () => {
    const result = fromSuggestions.selectSuggestions(initialState);

    expect(result).toEqual(initialState.suggestions);
  });

  it('should select suggestions list', () => {
    const result = fromSuggestions.selectSuggestionList.projector(
      initialState.suggestions
    );

    expect(result.length).toBe(suggestions.length);
  });

  it('should select toggle sort', () => {
    const result = fromSuggestions.selectToggleSort.projector(
      initialState.suggestions
    );

    expect(result).toBe(false);
  });

  it('should select curr category', () => {
    const result = fromSuggestions.selectCurrCategory.projector(
      initialState.suggestions
    );

    expect(result).toBe('all');
  });

  it('should select categories', () => {
    const result = fromSuggestions.selectCategories.projector(
      initialState.suggestions.suggestions
    );

    expect(result).toEqual(['all', 'enhancement', 'feature', 'bug']);
  });

  it('should select status counts', () => {
    const result = fromSuggestions.selectStatusCounts.projector(
      initialState.suggestions
    );

    expect(result).toEqual({
      suggestion: 0,
      planned: 0,
      'in-progress': 0,
      live: 0,
    });
  });

  it('should select curr sort option', () => {
    const result = fromSuggestions.selectCurrSortOption.projector(
      initialState.suggestions
    );

    expect(result).toBe('most upvotes');
  });
});

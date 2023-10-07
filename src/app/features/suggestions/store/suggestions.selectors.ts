import { createSelector } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

export const selectSuggestions = (state: fromApp.AppState) => state.suggestions;

export const selectSuggestionList = createSelector(
  selectSuggestions,
  (state) => state.suggestions
);

export const selectToggleSort = createSelector(
  selectSuggestions,
  (state) => state.toggleSort
);

export const selectCurrSortOption = createSelector(
  selectSuggestions,
  (state) => state.currSortOption
);

export const selectCurrCategory = createSelector(
  selectSuggestions,
  (state) => state.currCategory
);

export const selectCategories = createSelector(
  selectSuggestionList,
  (suggestions) => [
    ...new Set(
      suggestions.reduce(
        (acc, curr) => {
          acc.push(curr.category);
          return acc;
        },
        ['all']
      )
    ),
  ]
);

export const selectStatusCounts = createSelector(
  selectSuggestions,
  (state) => state.statusCounts
);

import { Feedback, SuggestionSortOption } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const toggleSort = createAction('[Suggestions] UI Toggle Sort');

export const setSortOption = createAction(
  '[Suggestions] UI Set Sort Option',
  props<{ option: SuggestionSortOption }>()
);

export const setCategory = createAction(
  '[Suggestions] UI Set Category',
  props<{ category: string }>()
);

export const fetchSuggestions = createAction('[Suggestions] Fetch Suggestions');

export const fetchCategoryCounts = createAction(
  '[Suggestions] Fetch Category Counts'
);

export const storeCategoryCounts = createAction(
  '[Suggestions] Store Categoru Counts',
  props<{ counts: { [key in Feedback['status']]: number } }>()
);

export const storeSuggestions = createAction(
  '[Suggestions] Store Suggestions',
  props<{ suggestions: Feedback[] }>()
);

export const upvoteSuggestion = createAction(
  '[Suggestions] Upvote Suggestion',
  props<{ id: number; votes: number }>()
);

export const setSuggestion = createAction(
  '[Suggestions] Set Suggestion',
  props<{ suggestion: Feedback }>()
);

export const startCreateSuggestion = createAction(
  '[Suggestions] Start Create Suggestion'
);

export const startEditSuggestion = createAction(
  '[Suggestions] Start Edit Suggestion',
  props<{ id: number }>()
);

export const viewSuggestionDetails = createAction(
  '[Suggestions] View Suggestion Details',
  props<{ id: number }>()
);

export const viewRoadmap = createAction('[Suggestions] View Roadmap');

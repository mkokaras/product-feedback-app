import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

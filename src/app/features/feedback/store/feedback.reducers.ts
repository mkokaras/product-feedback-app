import { Feedback } from '@core/models';
import { createReducer } from '@ngrx/store';

export interface State {
  feedback: Feedback | null;
}

const initialState: State = {
  feedback: null,
};

export const feedbackReducer = createReducer(initialState);

import { Feedback } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import * as FeedbackActions from './feedback.actions';

export interface State {
  feedback: Feedback | null;
}

const initialState: State = {
  feedback: null,
};

export const feedbackReducer = createReducer(
  initialState,
  on(FeedbackActions.storeFeedback, (state, { feedback }) => {
    console.log('feedback');
    return { ...state, feedback };
  })
);

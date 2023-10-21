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
    return { ...state, feedback };
  }),
  on(FeedbackActions.storeComment, (state, { comment }) => {
    if (!state.feedback) return { ...state };

    const feedback = { ...state.feedback };

    const comments = [...(state.feedback?.comments ?? [])];

    console.log(comments);

    comments.push(comment);

    return { ...state, feedback: { ...feedback, comments } };
  })
);

import { Feedback } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import * as RoadmapActions from './roadmap.actions';

export interface State {
  feedbacks: Feedback[];
}

const initialState: State = {
  feedbacks: [],
};

export const roadMapReducer = createReducer(
  initialState,
  on(RoadmapActions.storeFeedbacks, (state, { feedbacks }) => {
    return {
      ...state,
      feedbacks,
    };
  })
);

import { User } from '@core/models';
import { createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.storeUser, (state, { user }) => {
    return { ...state, user };
  })
);

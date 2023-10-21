import { User } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const fetchUser = createAction('[User] Fetch User');

export const storeUser = createAction(
  '[User] Store User',
  props<{ user: User }>()
);

import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  fetchUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(() =>
        this.userService.getOneUser().pipe(
          map((user) => UserActions.storeUser({ user })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

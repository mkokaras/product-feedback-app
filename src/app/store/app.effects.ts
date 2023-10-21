import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from './app.actions';
import { tap } from 'rxjs';
import { UserService } from '@core/services/user/user.service';

@Injectable()
export class AppEffects {
  goBack = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.goBack),
        tap(() => window.history.back())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

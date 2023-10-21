import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as UserActions from './store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'product-feedback-app-code';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(UserActions.fetchUser());
  }
}

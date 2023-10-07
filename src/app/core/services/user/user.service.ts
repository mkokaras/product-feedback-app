import { Injectable } from '@angular/core';
import { db } from '@core/config';
import { User } from '@core/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getOneUser(): Observable<User> {
    return of(db.currentUser);
  }
}

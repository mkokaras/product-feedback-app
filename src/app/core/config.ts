import * as data from '../../data.json';
import { Feedback, User } from './models';

export const db = { ...data } as {
  currentUser: User;
  productRequests: Feedback[];
};

import { Injectable, OnInit } from '@angular/core';
import { db } from '@core/config';
import { Feedback } from '@core/models';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor() {}

  createOneFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
    const id = db.productRequests.length + 1;

    const newFeedback = { ...new Feedback(id), ...feedback };

    db.productRequests.push({ ...newFeedback });

    return of(newFeedback);
  }

  updateOneFeedback(
    id: number,
    feedback: Partial<Feedback>
  ): Observable<Feedback> {
    const selectedIdx = db.productRequests.findIndex(
      (feedback) => feedback.id === id
    );

    if (selectedIdx < 0) return EMPTY;

    db.productRequests[selectedIdx] = {
      ...db.productRequests[selectedIdx],
      ...feedback,
    };

    return of(db.productRequests[selectedIdx]);
  }

  getOneFeedback(id: number): Observable<Feedback> {
    const selected = db.productRequests.find((feedback) => feedback.id === id);

    if (!selected) return EMPTY;

    return of(selected);
  }

  getAllFeedbacks(filterBy: Feedback['status']): Observable<Feedback[]> {
    return of(
      db.productRequests.filter(
        (feedback: Feedback) => feedback.status === filterBy
      )
    );
  }

  getAllCategoryCounts(): Observable<{ [key in Feedback['status']]: number }> {
    const requests = db.productRequests;

    const count = requests.reduce(
      (acc, curr) => {
        console.log(curr.status);
        if (curr.status === 'planned') {
          acc.planned++;
        }

        if (curr.status === 'live') {
          acc.live++;
        }

        if (curr.status === 'suggestion') {
          acc.suggestion++;
        }

        if (curr.status === 'in-progress') {
          acc['in-progress']++;
        }

        return acc;
      },
      { planned: 0, live: 0, 'in-progress': 0, suggestion: 0 }
    );

    return of(count);
  }

  deleteOneFeedback(id: number): Observable<void> {
    const idx = db.productRequests.findIndex((feedback) => feedback.id === id);

    if (idx < 0) return EMPTY;

    db.productRequests.splice(idx, 1);

    return EMPTY;
  }
}

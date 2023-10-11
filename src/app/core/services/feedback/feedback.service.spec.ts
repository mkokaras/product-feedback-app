import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { db } from '@core/config';
import { combineLatest, map } from 'rxjs';
import { Feedback } from '@core/models';

const MOCK_DATA = { ...db };

describe('FeedbackService', () => {
  let service: FeedbackService;
  let feedback: Feedback;
  let feedbacks: Feedback[];

  beforeEach(() => {
    feedback = { ...MOCK_DATA.productRequests[0] };
    feedbacks = [...MOCK_DATA.productRequests];

    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create feedback', () => {
    const id = MOCK_DATA.productRequests.length + 1;

    const newFeedback = { ...feedback, id };

    service.createOneFeedback(newFeedback).subscribe((feedback) => {
      expect(feedback).toBeTruthy();
      expect(feedback).toEqual(newFeedback);
    });
  });
  it('should update feedback', () => {
    const id = feedback.id;

    const newFeedback = { title: 'Update feedback' };

    service.updateOneFeedback(id, newFeedback).subscribe((feedback) => {
      expect(feedback).toBeTruthy();
      expect(feedback.title).toBe(newFeedback.title);
    });
  });

  it('should get feedback', () => {
    const id = feedback.id;

    service.getOneFeedback(id).subscribe((fetchedFeedback) => {
      expect(fetchedFeedback).toEqual(feedback);
    });
  });

  it('should get all suggestion feedbacks', () => {
    const suggestions = feedbacks.filter(
      (feedback) => feedback.status === 'suggestion'
    );
    const planned = feedbacks.filter(
      (feedback) => feedback.status === 'planned'
    );
    const inProgress = feedbacks.filter(
      (feedback) => feedback.status === 'in-progress'
    );
    const live = feedbacks.filter((feedback) => feedback.status === 'live');

    combineLatest([
      service.getAllFeedbacks('suggestion'),
      service.getAllFeedbacks('planned'),
      service.getAllFeedbacks('in-progress'),
      service.getAllFeedbacks('live'),
    ])
      .pipe(
        map(([arr1, arr2, arr3, arr4]) => [...arr1, ...arr2, ...arr3, ...arr4])
      )
      .subscribe((allFeedbacks) => {
        expect(allFeedbacks.length).toBe(
          suggestions.length + planned.length + inProgress.length + live.length
        );
      });
  });
});

// const

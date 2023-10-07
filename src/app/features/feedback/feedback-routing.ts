import { Route } from '@angular/router';

export const FEEDBACK_ROUTES: Route[] = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/feedback-detail/feedback-detail.component').then(
        (comp) => comp.FeedbackDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/feedback-detail/feedback-detail.component').then(
        (comp) => comp.FeedbackDetailComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/feedback-detail/feedback-detail.component').then(
        (comp) => comp.FeedbackDetailComponent
      ),
  },
];

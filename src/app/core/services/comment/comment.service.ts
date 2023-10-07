import { Injectable } from '@angular/core';
import { db } from '@core/config';
import { Comment, Feedback } from '@core/models';
import { Observable, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  createOneComment(
    feedbackId: number,
    comment: Partial<Comment>
  ): Observable<Comment> {
    const feedback = this.getFeedback(feedbackId);

    const id = (feedback.comments?.length ?? 0) + 1;

    const newComment = { ...new Comment(id), ...comment };

    feedback.comments?.push(newComment);

    return of(newComment);
  }

  updateOneComment(
    feedbackId: number,
    id: number,
    comment: Partial<Comment>
  ): Observable<Comment> {
    const feedback = this.getFeedback(feedbackId);

    const selected = feedback.comments?.find((comment) => comment.id === id);

    if (!selected) return EMPTY;

    Object.assign(selected, comment);

    return of(selected);
  }

  getOneComment(feedbackId: number, id: number): Observable<Comment> {
    const feedback = this.getFeedback(feedbackId);

    const selected = feedback.comments?.find((comment) => comment.id === id);

    if (!selected) return EMPTY;

    return of(selected);
  }

  getAllComments(feedbackId: number): Observable<Comment[]> {
    const feedback = this.getFeedback(feedbackId);

    return of(feedback.comments ?? []);
  }

  deleteOneComment(feedbackId: number, id: number): Observable<void> {
    const feedback = this.getFeedback(feedbackId);

    const idx =
      feedback.comments?.findIndex((comment) => comment.id === id) ?? -1;

    if (idx < 0) return EMPTY;

    feedback.comments?.splice(idx, 1);

    return EMPTY;
  }

  private getFeedback(id: number): Feedback {
    const feedback = db.productRequests.find((feedback) => feedback.id === id);

    if (!feedback) {
      throw 'no feedback';
    }

    return feedback;
  }
}

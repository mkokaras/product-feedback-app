import { Injectable } from '@angular/core';
import { db } from '@core/config';
import { Feedback, Reply, Comment } from '@core/models';
import { Observable, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  constructor() {}

  createOneReply(
    feedbackId: number,
    commentId: number,
    reply: Reply
  ): Observable<Reply> {
    const comment = this.getComment(feedbackId, commentId);

    comment.replies?.push(reply);

    return of(reply);
  }

  private getComment(feedbackId: number, id: number): Comment {
    const feedback = db.productRequests.find(
      (feedback) => feedback.id === feedbackId
    );

    const comment = feedback?.comments?.find((comment) => comment.id === id);

    if (!comment) {
      throw 'no feedback';
    }

    return comment;
  }
}

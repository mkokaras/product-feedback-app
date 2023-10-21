import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StencilButton } from 'packages/stencil-library/dist/components/stencil-button';
import { WebComponentsModule } from 'src/libs/web-components.module';
import { UpvoteComponent } from '@shared/components/upvote/upvote.component';
import { CommentsComponent } from '@shared/components/comments/comments.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterModule,
} from '@angular/router';
import { Comment, Feedback, User } from '@core/models';
import { Observable, map, take } from 'rxjs';
import * as FeedbackActions from '../../store/feedback.actions';
import * as fromFeedback from '../../store/feedback.selectors';
import * as AppActions from 'src/app/store/app.actions';
import * as RoadmapActions from 'src/app/features/roadmap/store/roadmap.actions';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAX_COMMENT_LENGTH } from '@core/config';
import * as fromUser from 'src/app/store/user.selectors';

@Component({
  selector: 'app-feedback-detail',
  standalone: true,
  imports: [
    CommonModule,
    WebComponentsModule,
    UpvoteComponent,
    CommentsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss'],
})
export class FeedbackDetailComponent {
  feedback$!: Observable<Feedback | null>;
  user$!: Observable<User | null>;
  id!: number;
  commentFormGroup!: FormGroup;
  MAX_COMMENT_LENGTH = MAX_COMMENT_LENGTH;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.store.dispatch(FeedbackActions.fetchFeedback({ id: this.id }));

    this.feedback$ = this.store.select(fromFeedback.selectFeedback);

    this.user$ = this.store.select(fromUser.selectUser);

    this.commentFormGroup = new FormGroup({
      comment: new FormControl('', [
        Validators.maxLength(250),
        Validators.required,
      ]),
    });

    // this.commentFormGroup
    //   .get('comment')
    //   ?.valueChanges.subscribe((comment: string) => {

    //   });
  }

  onBack() {
    this.store.dispatch(AppActions.goBack());
  }

  onEditFeedback() {
    RoadmapActions.startEditFeedback({ id: this.id });
  }

  onUpvoteFeedback(upvotes: number) {
    this.store.dispatch(
      FeedbackActions.upvoteFeedback({ id: this.id, upvotes })
    );
  }

  onAddComment() {
    const comment = this.commentFormGroup.get('comment')?.value as string;

    this.commentFormGroup.reset({
      comment: '',
    });

    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      this.store.dispatch(
        FeedbackActions.createComment({
          comment,
          feedbackId: this.id,
          user: user,
        })
      );
    });
  }
}

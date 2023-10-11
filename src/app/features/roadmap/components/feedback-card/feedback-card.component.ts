import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feedback } from '@core/models';
import { CommentsComponent } from '@shared/components/comments/comments.component';
import { UpvoteComponent } from '@shared/components/upvote/upvote.component';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [CommonModule, CommentsComponent, UpvoteComponent],
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackCardComponent {
  @Input() feedback!: Feedback;
  @Output() upvoteChange = new EventEmitter<{ id: number; votes: number }>();

  onUpvoteChange(id: number, votes: number) {
    this.upvoteChange.emit({ id, votes });
    // this.store.dispatch(SuggestionActions.upvoteSuggestion({ id, votes }));
  }
}

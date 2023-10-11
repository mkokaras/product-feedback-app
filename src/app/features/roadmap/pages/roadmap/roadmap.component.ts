import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponentsModule } from 'src/libs/web-components.module';
import { Observable } from 'rxjs';
import { Feedback } from '@core/models';
import { FeedbackCardComponent } from '../../components/feedback-card/feedback-card.component';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRoadmap from '../../store/roadmap.selectors';
import * as RoadmapActions from '../../store/roadmap.actions';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, WebComponentsModule, FeedbackCardComponent],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent implements OnInit {
  planned$!: Observable<Feedback[]>;
  inProgress$!: Observable<Feedback[]>;
  live$!: Observable<Feedback[]>;
  plannedCount$!: Observable<number>;
  inProgresCount$!: Observable<number>;
  liveCount$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(RoadmapActions.fetchFeedbacks());

    this.planned$ = this.store.select(fromRoadmap.selectPlannedFeedbacks);

    this.inProgress$ = this.store.select(fromRoadmap.selectProgressFeedbacks);

    this.live$ = this.store.select(fromRoadmap.selectLiveFeedbacks);

    this.plannedCount$ = this.store.select(
      fromRoadmap.selectPlannedFeedbacksCount
    );

    this.inProgresCount$ = this.store.select(
      fromRoadmap.selectProgressFeedbacksCount
    );

    this.liveCount$ = this.store.select(fromRoadmap.selectLiveFeedbacksCount);
  }

  onGoBack() {}

  onCreateFeedback() {}
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '@core/services/feedback/feedback.service';
import { Feedback, SuggestionSortOption } from '@core/models';
import { UpvoteComponent } from '@shared/components/upvote/upvote.component';
import { CommentsComponent } from '@shared/components/comments/comments.component';
import { SortByDropdownComponent } from '@shared/components/sort-by-dropdown/sort-by-dropdown.component';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSuggestions from '../../store/suggestions.selectors';
import * as SuggestionActions from '../../store/suggestions.actions';
import { SortByPipe } from '@shared/pipes/sort-by.pipe';
import { FilterByCategoryPipe } from '@shared/pipes/filter-by-category.pipe';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [
    CommonModule,
    UpvoteComponent,
    CommentsComponent,
    SortByDropdownComponent,
    SortByPipe,
    FilterByCategoryPipe,
  ],
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent {
  feedbacks$!: Observable<Feedback[]>;
  toggleSort$!: Observable<boolean>;
  currentSortOption$!: Observable<SuggestionSortOption>;
  currentCategory$!: Observable<string>;
  categories$!: Observable<string[]>;
  statusCounts$!: Observable<{ [key in Feedback['status']]: number }>;

  options: SuggestionSortOption[] = [
    'most upvotes',
    'least upvotes',
    'most comments',
    'least comments',
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(SuggestionActions.fetchSuggestions());

    this.store.dispatch(SuggestionActions.fetchCategoryCounts());

    this.feedbacks$ = this.store.select(fromSuggestions.selectSuggestionList);

    this.toggleSort$ = this.store.select(fromSuggestions.selectToggleSort);

    this.currentSortOption$ = this.store.select(
      fromSuggestions.selectCurrSortOption
    );

    this.categories$ = this.store.select(fromSuggestions.selectCategories);

    this.currentCategory$ = this.store.select(
      fromSuggestions.selectCurrCategory
    );

    this.statusCounts$ = this.store.select(fromSuggestions.selectStatusCounts);
  }

  onChange(id: number, votes: number) {
    this.store.dispatch(SuggestionActions.upvoteSuggestion({ id, votes }));
  }

  onEdit(event: Event, id: number) {
    event.preventDefault();

    this.store.dispatch(SuggestionActions.startEditSuggestion({ id }));
  }

  onViewComments(event: Event, id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.store.dispatch(SuggestionActions.viewSuggestionDetails({ id }));
  }

  onViewRoadMap(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.store.dispatch(SuggestionActions.viewRoadmap());
  }

  onCreateFeedback() {
    this.store.dispatch(SuggestionActions.startCreateSuggestion());
  }

  onToggleSort() {
    this.store.dispatch(SuggestionActions.toggleSort());
  }

  onChangeSortOption(event: any) {
    this.store.dispatch(SuggestionActions.setSortOption({ option: event }));
  }

  onSelectCategory(category: string) {
    this.store.dispatch(SuggestionActions.setCategory({ category }));
  }
}

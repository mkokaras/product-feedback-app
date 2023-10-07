import { Pipe, PipeTransform } from '@angular/core';
import { Feedback, SuggestionSortOption } from '@core/models';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortByPipe implements PipeTransform {
  transform(feedbacks: Feedback[], sortBy: SuggestionSortOption): Feedback[] {
    const newFeedbacks = [...feedbacks];

    if (sortBy === 'most upvotes') {
      newFeedbacks.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));

      return [...newFeedbacks];
    }

    if (sortBy === 'least upvotes') {
      return [...newFeedbacks.sort((a, b) => (a.upvotes > b.upvotes ? 1 : -1))];
    }

    if (sortBy === 'most comments') {
      return [
        ...newFeedbacks.sort((a, b) =>
          (a.comments?.length ?? 0) > (b.comments?.length ?? 0) ? -1 : 1
        ),
      ];
    }

    if (sortBy === 'least comments') {
      return [
        ...newFeedbacks.sort((a, b) =>
          (a.comments?.length ?? 0) > (b.comments?.length ?? 0) ? 1 : -1
        ),
      ];
    }

    return newFeedbacks;
  }
}

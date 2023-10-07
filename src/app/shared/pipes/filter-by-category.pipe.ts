import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from '@core/models';

@Pipe({
  name: 'filterByCategory',
  standalone: true,
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(feebacks: Feedback[], category: string): Feedback[] {
    if (category === 'all') return feebacks;
    return feebacks.filter((feedback) => feedback.category === category);
  }
}

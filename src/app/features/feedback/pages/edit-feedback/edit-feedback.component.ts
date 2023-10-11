import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as FeedbackActions from '../../store/feedback.actions';
import * as AppActions from 'src/app/store/app.actions';
import { CategoryDropdownComponent } from '../../components/category-dropdown/category-dropdown.component';
import * as fromFeedback from '../../store/feedback.selectors';
import { Subscription, take } from 'rxjs';
import { Feedback } from '@core/models';
import { ActivatedRoute } from '@angular/router';
import { WebComponentsModule } from 'src/libs/web-components.module';

@Component({
  selector: 'app-edit-feedback',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryDropdownComponent,
    WebComponentsModule,
  ],
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.scss'],
})
export class EditFeedbackComponent {
  categories = ['feature', 'uI', 'ux', 'enhancement', 'bug'];
  status: Feedback['status'][] = [
    'in-progress',
    'live',
    'planned',
    'suggestion',
  ];
  toggleCategoryDropdown: boolean = false;
  toggleStatusDropdown: boolean = false;
  form!: FormGroup;
  id!: number;
  sub!: Subscription;
  title!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') ?? 0);

    this.store.dispatch(
      FeedbackActions.fetchFeedback({
        id: this.id,
      })
    );

    this.sub = this.store
      .select(fromFeedback.selectFeedback)
      .subscribe((feedback) => {
        this.title = feedback?.title ?? '';
        this.form = new FormGroup({
          title: new FormControl(feedback?.title, Validators.required),
          category: new FormControl(feedback?.category, Validators.required),
          description: new FormControl(
            feedback?.description,
            Validators.required
          ),
          status: new FormControl(feedback?.status, Validators.required),
        });
      });
  }

  onGoBack() {
    this.store.dispatch(AppActions.goBack());
  }

  onSubmit() {
    this.store.dispatch(
      FeedbackActions.updateFeedback({
        id: this.id,
        feedback: this.form.value,
      })
    );
  }

  onCancel() {
    this.store
      .select(fromFeedback.selectFeedback)
      .pipe(take(1))
      .subscribe((feedback) => {
        this.form.reset({
          title: feedback?.title,
          category: feedback?.category,
          description: feedback?.description,
          status: feedback?.status,
        });
      });
  }

  onDelete() {
    this.store.dispatch(FeedbackActions.deleteFeedback({ id: this.id }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

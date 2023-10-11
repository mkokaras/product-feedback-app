import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryDropdownComponent } from '../../components/category-dropdown/category-dropdown.component';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as FeedbackActions from '../../store/feedback.actions';
import * as AppActions from 'src/app/store/app.actions';
import { WebComponentsModule } from 'src/libs/web-components.module';

@Component({
  selector: 'app-create-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategoryDropdownComponent],
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss'],
})
export class CreateFeedbackComponent {
  categories = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  toggleDropdown: boolean = false;
  form!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('Feature', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onGoBack() {
    this.store.dispatch(AppActions.goBack());
  }

  onSubmit() {
    this.store.dispatch(
      FeedbackActions.createFeedback({ feedback: this.form.value })
    );
  }

  onCancel() {
    this.form.reset({
      title: '',
      category: 'Feature',
      description: '',
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class UpvoteComponent {
  @Input() upvotes!: number;
  @Input() inline: boolean = false;
  @Output() upvoteChange = new EventEmitter<number>();

  subscription!: Subscription;
  upvoteControl!: FormControl;

  ngOnInit() {
    this.upvoteControl = new FormControl(this.upvotes);

    this.subscription = this.upvoteControl.valueChanges.subscribe((value) => {
      this.upvoteChange.emit(value);
    });
  }

  onUpvote(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const value = this.upvoteControl.value + 1;

    this.upvoteControl.setValue(value);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

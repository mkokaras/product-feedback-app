import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-tab.component.html',
  styleUrls: ['./dropdown-tab.component.scss'],
})
export class DropdownTabComponent {
  @Input() options: string[] = [];
  @Input() currOption!: string;
  @Output() changeSortOption = new EventEmitter<string>();

  onChangeSortOption(option: string) {
    this.changeSortOption.emit(option);
  }
}

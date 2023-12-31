import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownTabComponent } from '../dropdown-tab/dropdown-tab.component';

@Component({
  selector: 'app-sort-by-dropdown',
  templateUrl: './sort-by-dropdown.component.html',
  styleUrls: ['./sort-by-dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, DropdownTabComponent],
})
export class SortByDropdownComponent {
  @Input() options: string[] = [];
  @Input() currOption!: string;
  @Input() isOpen: boolean = false;
  @Output() openDropdown = new EventEmitter();
  @Output() changeSortOption = new EventEmitter<string>();

  onChangeSortOption(option: string) {
    this.changeSortOption.emit(option);
  }
}

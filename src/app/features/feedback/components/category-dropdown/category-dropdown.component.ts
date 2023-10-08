import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTabComponent } from '@shared/components/dropdown-tab/dropdown-tab.component';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownTabComponent],
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss'],
})
export class CategoryDropdownComponent {
  @Input() options: string[] = [];
  @Input() currOption!: string;
  @Input() isOpen: boolean = false;
  @Output() openDropdown = new EventEmitter();
  @Output() changeSortOption = new EventEmitter<string>();

  onChangeSortOption(option: string) {
    this.changeSortOption.emit(option);
  }
}

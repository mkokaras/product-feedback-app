import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { SortByDropdownComponent } from '@shared/components/sort-by-dropdown/sort-by-dropdown.component';

export const actionsData = {
  openDropdown: action('openDropdown'),
  changeSortOption: action('changeSortOption'),
};

const meta: Meta<SortByDropdownComponent> = {
  title: 'SortByDropdown',
  component: SortByDropdownComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: SortByDropdownComponent) => ({
    props: {
      ...args,
      openDropdown: actionsData.openDropdown,
      changeSortOption: actionsData.changeSortOption,
    },
  }),
};

export default meta;
type Story = StoryObj<SortByDropdownComponent>;

export const Default: Story = {
  args: {
    options: [],
    currOption: '',
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    options: [
      'Most upvotes',
      'Least upvotes',
      'Most comments',
      'Least comments',
    ],
    currOption: 'Most upvotes',
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    options: [
      'Most upvotes',
      'Least upvotes',
      'Most comments',
      'Least comments',
    ],
    currOption: 'Most upvotes',
    isOpen: false,
  },
};

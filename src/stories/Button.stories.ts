import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { SortByDropdownComponent } from '@shared/components/sort-by-dropdown/sort-by-dropdown.component';

export const actionsData = {
  changeSortOption: action('changeSortOption'),
  openDropdown: action('openDropdown'),
};

const meta: Meta<SortByDropdownComponent> = {
  title: 'sort-dropdown',
  component: SortByDropdownComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: SortByDropdownComponent) => ({
    props: {
      ...args,
      changeSortOption: actionsData.changeSortOption,
      openDropdown: actionsData.openDropdown,
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
    currOption: 'Most uvpotes',
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
    currOption: 'Most uvpotes',
    isOpen: false,
  },
};

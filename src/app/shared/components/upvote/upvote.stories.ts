import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { UpvoteComponent } from '@shared/components/upvote/upvote.component';

export const actionsData = {
  upvoteChange: action('upvoteChange'),
};

const meta: Meta<UpvoteComponent> = {
  title: 'Upvote',
  component: UpvoteComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: UpvoteComponent) => ({
    props: {
      ...args,
      upvoteChange: actionsData.upvoteChange,
    },
  }),
};

export default meta;
type Story = StoryObj<UpvoteComponent>;

export const Default: Story = {
  args: {
    upvotes: 0,
  },
};

export const Normal: Story = {
  args: {
    upvotes: 100,
  },
};

export const Closed: Story = {
  args: {
    upvotes: 200,
  },
};

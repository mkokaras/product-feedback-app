import type { Meta, StoryObj } from '@storybook/angular';

import { CommentsComponent } from '@shared/components/comments/comments.component';

const meta: Meta<CommentsComponent> = {
  title: 'Comment',
  component: CommentsComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: CommentsComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;

type Story = StoryObj<CommentsComponent>;

export const Default: Story = {
  args: {
    commentCount: 0,
  },
};

export const Normal: Story = {
  args: {
    commentCount: 100,
  },
};

export const BigNumber: Story = {
  args: {
    commentCount: 300000,
  },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FzLoadingOverlay from './FzLoadingOverlay.vue';

const meta = {
  title: 'Layout/FzLoadingOverlay',
  component: FzLoadingOverlay,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean', description: 'Controls overlay visibility' },
    message: { control: 'text', description: 'Loading text shown after delay' },
    delay: { control: 'number', description: 'Delay before showing content (ms)' },
  },
} satisfies Meta<typeof FzLoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isLoading: true,
    message: 'Loading...',
    delay: 300,
  },
};

export const Hidden: Story = {
  args: {
    isLoading: false,
  },
};

export const CustomMessage: Story = {
  args: {
    isLoading: true,
    message: 'Saving changes...',
  },
};

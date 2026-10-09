import type { Meta, StoryObj } from '@storybook/vue3';
import FzPagination from './FzPagination.vue';

const meta = {
  title: 'Navigation/FzPagination',
  component: FzPagination,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'Current page (v-model). Default: 1' },
    length: { control: 'number', description: 'Total number of pages (required)' },
    disabled: { control: 'boolean', description: 'Disable both arrows' },
    color: { control: 'text', description: 'Theme color applied to the arrows' },
    prevLabel: { control: 'text', description: 'aria-label of the previous arrow. Default: "Página anterior"' },
    nextLabel: { control: 'text', description: 'aria-label of the next arrow. Default: "Próxima página"' },
    prevIcon: { control: 'text', description: 'Previous arrow icon (mdi-*). Default: "mdi-chevron-left"' },
    nextIcon: { control: 'text', description: 'Next arrow icon (mdi-*). Default: "mdi-chevron-right"' },
  },
} satisfies Meta<typeof FzPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: 1,
    length: 5,
  },
};

export const Middle: Story = {
  args: {
    modelValue: 3,
    length: 5,
  },
};

export const LastPage: Story = {
  args: {
    modelValue: 5,
    length: 5,
  },
};

export const Colored: Story = {
  args: {
    modelValue: 2,
    length: 4,
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 3,
    length: 5,
    disabled: true,
  },
};

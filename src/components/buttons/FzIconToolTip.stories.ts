import type { Meta, StoryObj } from '@storybook/vue3';
import FzIconToolTip from './FzIconToolTip.vue';

const meta = {
  title: 'Buttons/FzIconToolTip',
  component: FzIconToolTip,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', description: 'MDI icon name' },
    tooltip: { control: 'text', description: 'Tooltip text shown on hover' },
    color: { control: 'color', description: 'Icon and tooltip color' },
    asButton: { control: 'boolean', description: 'Render as v-btn instead of v-icon' },
    disabled: { control: 'boolean' },
    disabledTooltip: { control: 'text', description: 'Tooltip shown when disabled' },
  },
} satisfies Meta<typeof FzIconToolTip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'mdi-pencil',
    tooltip: 'Edit',
    color: 'primary',
  },
};

export const AsButton: Story = {
  args: {
    icon: 'mdi-pencil',
    tooltip: 'Click to edit',
    asButton: true,
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'mdi-delete',
    tooltip: 'Delete',
    color: 'error',
    disabled: true,
  },
};

export const DisabledWithReason: Story = {
  args: {
    icon: 'mdi-delete',
    tooltip: 'Delete',
    color: 'error',
    disabled: true,
    disabledTooltip: 'You do not have permission to delete',
  },
};

export const CustomColor: Story = {
  args: {
    icon: 'mdi-content-save',
    tooltip: 'Save changes',
    color: 'success',
  },
};

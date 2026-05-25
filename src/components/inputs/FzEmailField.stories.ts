import type { Meta, StoryObj } from '@storybook/vue3';
import FzEmailField from './FzEmailField.vue';

const meta = {
  title: 'Inputs/FzEmailField',
  component: FzEmailField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    requiredMessage: { control: 'text' },
    invalidMessage: { control: 'text' },
    maxlength: { control: 'number' },
  },
} satisfies Meta<typeof FzEmailField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email' },
};

export const Required: Story = {
  args: { label: 'Email (required)', required: true },
};

export const Disabled: Story = {
  args: { modelValue: 'user@example.com', label: 'Email', disabled: true },
};

export const CustomErrorMessages: Story = {
  args: {
    label: 'Email',
    required: true,
    requiredMessage: 'Please enter your email',
    invalidMessage: 'Invalid email format',
  },
};

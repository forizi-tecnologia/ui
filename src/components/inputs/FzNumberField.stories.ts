import type { Meta, StoryObj } from '@storybook/vue3';
import FzNumberField from './FzNumberField.vue';

const meta = {
  title: 'Inputs/FzNumberField',
  component: FzNumberField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number' },
    label: { control: 'text' },
    decimalPlaces: { control: 'number' },
    allowNegative: { control: 'boolean' },
    disabled: { control: 'boolean' },
    max: { control: 'number' },
    min: { control: 'number' },
  },
} satisfies Meta<typeof FzNumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Integer: Story = {
  args: { modelValue: 0, label: 'Quantity', decimalPlaces: 0 },
};

export const Decimal: Story = {
  args: { modelValue: 0, label: 'Weight (kg)', decimalPlaces: 2 },
};

export const Disabled: Story = {
  args: { modelValue: 42, label: 'Quantity', disabled: true, decimalPlaces: 0 },
};

export const AllowNegative: Story = {
  args: { modelValue: 0, label: 'Temperature', decimalPlaces: 1, allowNegative: true },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FzMoneyField from './FzMoneyField.vue';

const meta = {
  title: 'Inputs/FzMoneyField',
  component: FzMoneyField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'v-model value' },
    label: { control: 'text' },
    currency: { control: 'text', description: 'ISO 4217 currency code' },
    locale: { control: 'text' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    persistentHint: { control: 'boolean' },
    max: { control: 'number' },
    min: { control: 'number' },
  },
} satisfies Meta<typeof FzMoneyField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: 0,
    label: 'Price',
    currency: 'BRL',
    locale: 'pt-BR',
  },
};

export const WithValue: Story = {
  args: {
    modelValue: 1549.9,
    label: 'Amount',
    currency: 'BRL',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 250.75,
    label: 'Price (disabled)',
    disabled: true,
  },
};

export const MaxValue: Story = {
  args: {
    modelValue: 0,
    label: 'Price (max $1000)',
    max: 1000,
  },
};

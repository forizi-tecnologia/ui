import type { Meta, StoryObj } from '@storybook/vue3';
import FzZipCodeField from './FzZipCodeField.vue';

const meta = {
  title: 'Inputs/FzZipCodeField',
  component: FzZipCodeField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: '8-digit zip code (unmasked)' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
  },
} satisfies Meta<typeof FzZipCodeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Zip Code' },
};

export const Disabled: Story = {
  args: { modelValue: '01001000', label: 'Zip Code', disabled: true },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FzPhoneField from './FzPhoneField.vue';

const meta = {
  title: 'Inputs/FzPhoneField',
  component: FzPhoneField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Raw digits (unmasked)' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    icon: { control: 'text', description: 'MDI icon name' },
  },
} satisfies Meta<typeof FzPhoneField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Phone' },
};

export const WithValue: Story = {
  args: { modelValue: '11999999999', label: 'Phone' },
};

export const CellphoneIcon: Story = {
  args: { label: 'Mobile', icon: 'mdi-cellphone' },
};

export const Disabled: Story = {
  args: { modelValue: '11999999999', label: 'Phone', disabled: true },
};

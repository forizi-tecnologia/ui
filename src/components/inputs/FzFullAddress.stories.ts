import type { Meta, StoryObj } from '@storybook/vue3';
import FzFullAddress from './FzFullAddress.vue';

const meta = {
  title: 'Inputs/FzFullAddress',
  component: FzFullAddress,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    disabledFields: { control: 'boolean', description: 'Lock auto-filled fields after CEP lookup' },
  },
} satisfies Meta<typeof FzFullAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PreFilled: Story = {
  args: {
    modelValue: {
      zipCode: '01001000',
      street: 'Praça da Sé',
      number: '1',
      complement: 'Centro',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP',
    },
  },
};

export const LockAfterCep: Story = {
  args: { disabledFields: true },
};

export const FullyDisabled: Story = {
  args: {
    disabled: true,
    modelValue: {
      zipCode: '01001000',
      street: 'Praça da Sé',
      city: 'São Paulo',
      state: 'SP',
    },
  },
};

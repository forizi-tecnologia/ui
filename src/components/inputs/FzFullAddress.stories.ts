import type { Meta, StoryObj } from '@storybook/vue3';
import FzFullAddress from './FzFullAddress.vue';

const meta = {
  title: 'Inputs/FzFullAddress',
  component: FzFullAddress,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { description: 'v-model bound address object (Partial<Address>). Fields: zipCode, street, number, complement, neighborhood, city, state.' },
    disabled: { control: 'boolean', description: 'Disable all address fields' },
    disabledFields: { control: 'boolean', description: 'Lock auto-completed fields (street, neighborhood, city, state) after a CEP is found via lookup' },
    labels: { description: 'Override individual field labels: { zipCode, street, number, complement, neighborhood, city, state }. Defaults in pt-BR.' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
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

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
    rules: { description: 'Per-field custom validation rules: { zipCode, street, number, complement, neighborhood, city, state } — each an array of ValidationRule.' },
    maxlength: { description: 'Per-field maximum length. Defaults: CEP 9, logradouro 200, número 20, complemento 100, bairro 100, cidade 100, estado 2.' },
    counter: { control: 'boolean', description: 'Show the character counter on the text fields' },
    required: { control: 'boolean', description: 'Add a required rule to every field except complemento' },
    requiredMessage: { control: 'text', description: 'Custom message for empty required fields. Default: "<label> é obrigatório"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error messages area on every field. "auto" hides it until there are messages. Default: "auto"' },
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

export const WithCounter: Story = {
  args: { counter: true },
};

export const Required: Story = {
  args: { required: true },
};

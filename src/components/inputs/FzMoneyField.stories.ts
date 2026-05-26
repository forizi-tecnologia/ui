import type { Meta, StoryObj } from '@storybook/vue3';
import FzMoneyField from './FzMoneyField.vue';

const meta = {
  title: 'Inputs/FzMoneyField',
  component: FzMoneyField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'v-model bound numeric value' },
    label: { control: 'text', description: 'Field label text' },
    currency: { control: 'text', description: 'ISO 4217 currency code (e.g. BRL, USD, EUR)' },
    locale: { control: 'text', description: 'Locale for number formatting (e.g. pt-BR, en-US). Default: "pt-BR"' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    persistentHint: { control: 'boolean', description: 'Keep hint visible even when field is not focused' },
    max: { control: 'number', description: 'Maximum allowed value' },
    min: { control: 'number', description: 'Minimum allowed value' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
  },
} satisfies Meta<typeof FzMoneyField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: 0,
    label: 'Preço',
    currency: 'BRL',
    locale: 'pt-BR',
  },
};

export const WithValue: Story = {
  args: {
    modelValue: 1549.9,
    label: 'Valor',
    currency: 'BRL',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 250.75,
    label: 'Preço (desabilitado)',
    disabled: true,
  },
};

export const MaxValue: Story = {
  args: {
    modelValue: 0,
    label: 'Preço (máx R$ 1.000)',
    max: 1000,
  },
};

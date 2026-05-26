import type { Meta, StoryObj } from '@storybook/vue3';
import FzNumberField from './FzNumberField.vue';

const meta = {
  title: 'Inputs/FzNumberField',
  component: FzNumberField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'v-model bound numeric value' },
    label: { control: 'text', description: 'Field label text' },
    rules: { description: 'Array of custom validation rules. Each receives the formatted string and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    persistentHint: { control: 'boolean', description: 'Keep hint visible even when field is not focused' },
    decimalPlaces: { control: 'number', description: 'Number of decimal places. 0 = integer only. Default: 0' },
    locale: { control: 'text', description: 'Locale for number formatting (e.g. pt-BR, en-US). Default: "pt-BR"' },
    allowNegative: { control: 'boolean', description: 'Allow negative values. Default: true' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    max: { control: 'number', description: 'Maximum allowed value. Default: 999000000' },
    min: { control: 'number', description: 'Minimum allowed value. Default: undefined (no limit)' },
  },
} satisfies Meta<typeof FzNumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Integer: Story = {
  args: { modelValue: 0, label: 'Quantidade', decimalPlaces: 0 },
};

export const Decimal: Story = {
  args: { modelValue: 0, label: 'Peso (kg)', decimalPlaces: 2 },
};

export const Disabled: Story = {
  args: { modelValue: 42, label: 'Quantidade', disabled: true, decimalPlaces: 0 },
};

export const AllowNegative: Story = {
  args: { modelValue: 0, label: 'Temperatura', decimalPlaces: 1, allowNegative: true },
};

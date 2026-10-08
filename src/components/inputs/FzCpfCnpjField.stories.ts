import type { Meta, StoryObj } from '@storybook/vue3';
import FzCpfCnpjField from './FzCpfCnpjField.vue';

const meta = {
  title: 'Inputs/FzCpfCnpjField',
  component: FzCpfCnpjField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model bound value, unmasked and uppercase (e.g. "12ABC34501DE35")' },
    label: { control: 'text', description: 'Field label text. Default: "CPF/CNPJ"' },
    rules: { description: 'Array of custom validation rules. Each receives the value and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    required: { control: 'boolean', description: 'Whether the field is required for validation' },
    validateOnBlur: { control: 'boolean', description: 'Validate only on blur (true) or on every input change (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Custom error message when required field is empty. Default: "CPF/CNPJ é obrigatório"' },
    invalidMessage: { control: 'text', description: 'Custom error message for an invalid document. Default: "CPF/CNPJ inválido"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error messages area. "auto" hides it until there are messages. Default: "auto"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
  },
} satisfies Meta<typeof FzCpfCnpjField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'CPF/CNPJ' },
};

export const ValidCpf: Story = {
  args: { label: 'CPF', modelValue: '11144477735' },
};

export const ValidNumericCnpj: Story = {
  args: { label: 'CNPJ', modelValue: '11222333000181' },
};

export const ValidAlphanumericCnpj: Story = {
  args: { label: 'CNPJ alfanumérico', modelValue: '12ABC34501DE35' },
};

export const Required: Story = {
  args: { label: 'CPF/CNPJ (required)', required: true },
};

export const Disabled: Story = {
  args: { label: 'CPF/CNPJ', modelValue: '11144477735', disabled: true },
};

export const CustomErrorMessages: Story = {
  args: {
    label: 'CPF/CNPJ',
    required: true,
    requiredMessage: 'Informe o documento',
    invalidMessage: 'Documento inválido',
  },
};

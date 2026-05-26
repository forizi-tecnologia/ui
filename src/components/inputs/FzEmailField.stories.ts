import type { Meta, StoryObj } from '@storybook/vue3';
import FzEmailField from './FzEmailField.vue';

const meta = {
  title: 'Inputs/FzEmailField',
  component: FzEmailField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model bound email value' },
    label: { control: 'text', description: 'Field label text. Default: "Email"' },
    rules: { description: 'Array of custom validation rules. Each receives the value and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    required: { control: 'boolean', description: 'Whether the field is required for validation' },
    validateOnBlur: { control: 'boolean', description: 'Validate only on blur (true) or on every input change (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Custom error message when required field is empty. Default: "Email é obrigatório"' },
    invalidMessage: { control: 'text', description: 'Custom error message for invalid email format. Default: "Formato de e-mail inválido"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    maxlength: { control: 'number', description: 'Maximum character length. Default: 100' },
  },
} satisfies Meta<typeof FzEmailField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email' },
};

export const Required: Story = {
  args: { label: 'Email (required)', required: true },
};

export const Disabled: Story = {
  args: { modelValue: 'user@example.com', label: 'Email', disabled: true },
};

export const CustomErrorMessages: Story = {
  args: {
    label: 'Email',
    required: true,
    requiredMessage: 'Por favor, informe seu e-mail',
    invalidMessage: 'Formato de e-mail inválido',
  },
};

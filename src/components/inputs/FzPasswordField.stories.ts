import type { Meta, StoryObj } from '@storybook/vue3';
import FzPasswordField from './FzPasswordField.vue';

const meta = {
  title: 'Inputs/FzPasswordField',
  component: FzPasswordField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model bound password value' },
    label: { control: 'text', description: 'Field label text. Default: "Senha"' },
    rules: { description: 'Array of custom validation rules. Each receives the value and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    required: { control: 'boolean', description: 'Require a non-empty value' },
    validateOnBlur: { control: 'boolean', description: 'Validate on blur (true) or on every input change (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Custom error message when required and empty. Default: "Senha é obrigatória"' },
    minlength: { control: 'number', description: 'Minimum number of characters. 0 disables the check. Default: 0' },
    minlengthMessage: { control: 'text', description: 'Custom error message for the minlength rule. Default: "Senha deve ter ao menos N caracteres"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
    maxlength: { control: 'number', description: 'Maximum character length' },
    autocomplete: { control: 'text', description: 'Autocomplete hint for the browser. Default: "current-password"' },
    showIcon: { control: 'text', description: 'Icon shown when the password is hidden. Default: "mdi-eye-outline"' },
    hideIcon: { control: 'text', description: 'Icon shown when the password is visible. Default: "mdi-eye-off-outline"' },
    toggleFocusable: { control: 'boolean', description: 'Include the toggle icon in the tab order. Default: false, so Tab moves to the next field (e.g. confirm password)' },
    showLabel: { control: 'text', description: 'Accessible label when the password is hidden. Default: "Mostrar senha"' },
    hideLabel: { control: 'text', description: 'Accessible label when the password is visible. Default: "Ocultar senha"' },
  },
} satisfies Meta<typeof FzPasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Senha' },
};

export const Required: Story = {
  args: { label: 'Senha', required: true },
};

export const WithMinlength: Story = {
  args: { label: 'Senha', required: true, minlength: 8, hint: 'Mínimo de 8 caracteres' },
};

export const WithValue: Story = {
  args: { label: 'Senha', modelValue: 'super-secret' },
};

export const Disabled: Story = {
  args: { label: 'Senha', modelValue: 'super-secret', disabled: true },
};

export const CustomMessages: Story = {
  args: {
    label: 'Senha',
    required: true,
    minlength: 8,
    requiredMessage: 'Informe uma senha',
    minlengthMessage: 'Sua senha é muito curta',
  },
};

export const ToggleFocusable: Story = {
  args: {
    label: 'Senha (ícone focável via Tab)',
    toggleFocusable: true,
  },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FzPhoneField from './FzPhoneField.vue';

const meta = {
  title: 'Inputs/FzPhoneField',
  component: FzPhoneField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model bound raw digits (unmasked). The mask is applied for display only.' },
    label: { control: 'text', description: 'Field label text. Default: "Telefone"' },
    rules: { description: 'Array of custom validation rules. Each receives the unmasked value and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    icon: { control: 'text', description: 'MDI icon name for the prepend-inner slot. Default: "mdi-phone-outline"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
  },
} satisfies Meta<typeof FzPhoneField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Telefone' },
};

export const WithValue: Story = {
  args: { modelValue: '11999999999', label: 'Telefone' },
};

export const CellphoneIcon: Story = {
  args: { label: 'Celular', icon: 'mdi-cellphone' },
};

export const Disabled: Story = {
  args: { modelValue: '11999999999', label: 'Telefone', disabled: true },
};

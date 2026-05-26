import type { Meta, StoryObj } from '@storybook/vue3';
import FzZipCodeField from './FzZipCodeField.vue';

const meta = {
  title: 'Inputs/FzZipCodeField',
  component: FzZipCodeField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'v-model bound 8-digit CEP (unmasked). The #####-### mask is applied for display only.' },
    label: { control: 'text', description: 'Field label text. Default: "CEP"' },
    rules: { description: 'Array of custom validation rules. Each receives the unmasked value and returns true or an error string.' },
    disabled: { control: 'boolean', description: 'Disable the input' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    'update:modelValue': { description: 'Emitted when the unmasked CEP value changes', table: { category: 'Events' } },
    'zip-code-found': { description: 'Emitted when a valid CEP is found via ViaCEP API. Payload: ZipCodeResponse with street, neighborhood, city, state, zipCode, complement.', table: { category: 'Events' } },
    'zip-code-not-found': { description: 'Emitted when the CEP is not found or the API request fails', table: { category: 'Events' } },
  },
} satisfies Meta<typeof FzZipCodeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'CEP' },
};

export const Disabled: Story = {
  args: { modelValue: '01001000', label: 'CEP', disabled: true },
};

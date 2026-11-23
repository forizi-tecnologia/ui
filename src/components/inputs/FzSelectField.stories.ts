import type { Meta, StoryObj } from '@storybook/vue3';
import FzSelectField from './FzSelectField.vue';

const items = [
  { title: 'Alimentação', value: 'food' },
  { title: 'Transporte', value: 'transport' },
  { title: 'Moradia', value: 'housing' },
  { title: 'Lazer', value: 'leisure' },
];

const meta = {
  title: 'Inputs/FzSelectField',
  component: FzSelectField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Selected value (string, number, null or an array when multiple)' },
    label: { control: 'text', description: 'Field label. Default: ""' },
    items: { control: 'object', description: 'Options list (strings or objects). Default: []' },
    itemTitle: { control: 'text', description: 'Property used as the visible label. Default: "title"' },
    itemValue: { control: 'text', description: 'Property used as the value. Default: "value"' },
    rules: { description: 'Custom validation rules appended after the built-in required rule' },
    disabled: { control: 'boolean', description: 'Disable the field' },
    hint: { control: 'text', description: 'Helper text below the field' },
    persistentHint: { control: 'boolean', description: 'Keep the hint visible when the field is not focused. Default: false' },
    required: { control: 'boolean', description: 'Empty value fails validation when true' },
    validateOnBlur: { control: 'boolean', description: 'Resolve validation on blur (true) or on every change (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Custom required message. Default: "<Label> é obrigatório" or "Campo obrigatório"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify field density. Default: "comfortable"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error area. Default: "auto"' },
    clearable: { control: 'boolean', description: 'Show a clear button. Default: false' },
    multiple: { control: 'boolean', description: 'Allow multiple selections. The model becomes an array. Default: false' },
  },
} satisfies Meta<typeof FzSelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Categoria', items },
};

export const WithValue: Story = {
  args: { label: 'Categoria', items, modelValue: 'transport' },
};

export const Required: Story = {
  args: { label: 'Categoria', items, required: true },
};

export const CustomErrorMessages: Story = {
  args: {
    label: 'Categoria',
    items,
    required: true,
    requiredMessage: 'Escolha uma categoria',
    rules: [(value: unknown) => value === 'food' ? true : 'Selecione Alimentação para continuar'],
  },
};

export const Disabled: Story = {
  args: { label: 'Categoria', items, modelValue: 'food', disabled: true },
};

export const Clearable: Story = {
  args: { label: 'Categoria', items, modelValue: 'food', clearable: true },
};

export const Multiple: Story = {
  args: { label: 'Categorias', items, multiple: true, modelValue: ['food', 'transport'] },
};

export const VariantOverride: Story = {
  args: { label: 'Categoria', items, variant: 'outlined', density: 'compact' },
};

import type { Meta, StoryObj } from '@storybook/vue3';
import FzChipsSelect from './FzChipsSelect.vue';

const OPTIONS = [
  { title: 'São Paulo', value: 'SP' },
  { title: 'Rio de Janeiro', value: 'RJ' },
  { title: 'Minas Gerais', value: 'MG' },
  { title: 'Paraná', value: 'PR' },
  { title: 'Santa Catarina', value: 'SC' },
  { title: 'Rio Grande do Sul', value: 'RS' },
];

const meta = {
  title: 'Inputs/FzChipsSelect',
  component: FzChipsSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { description: 'v-model bound array of selected values' },
    items: { description: 'List of options. Plain strings/numbers or objects with itemTitle/itemValue keys.' },
    itemTitle: { control: 'text', description: 'Object key used as the option label. Default: "title"' },
    itemValue: { control: 'text', description: 'Object key used as the option value. Default: "value"' },
    label: { control: 'text', description: 'Field label text' },
    rules: { description: 'Array of custom validation rules applied to the selected values array' },
    disabled: { control: 'boolean', description: 'Disable the field' },
    hint: { control: 'text', description: 'Hint text displayed below the field' },
    required: { control: 'boolean', description: 'Require at least one selected value' },
    validateOnBlur: { control: 'boolean', description: 'Validate on blur (true) or on every change (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Custom error message when required and empty. Default: "Selecione ao menos um item"' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error messages area. "auto" hides it until there are messages. Default: "auto"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
    maxVisibleChips: { control: 'number', description: 'Maximum number of chips shown before collapsing into a "+N" chip. Undefined shows all.' },
    hideSelected: { control: 'boolean', description: 'Hide already-selected options from the menu and remove the selection checkbox. Default: true' },
    clearOnSelect: { control: 'boolean', description: 'Clear the typed search after selecting an option. Default: true' },
    noDataText: { control: 'text', description: 'Message shown when no option matches. Default: "Nenhum item encontrado"' },
    chipColor: { control: 'text', description: 'Vuetify color applied to the chips. Default: "primary"' },
    chipVariant: { control: 'select', options: ['flat', 'text', 'elevated', 'tonal', 'outlined', 'plain'], description: 'Vuetify variant applied to the chips. Default: "tonal"' },
  },
} satisfies Meta<typeof FzChipsSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Estados',
    items: OPTIONS,
  },
};

export const WithValues: Story = {
  args: {
    label: 'Estados',
    items: OPTIONS,
    modelValue: ['SP', 'RJ', 'MG'],
  },
};

export const MaxVisibleChips: Story = {
  args: {
    label: 'Estados (máx. 2)',
    items: OPTIONS,
    modelValue: ['SP', 'RJ', 'MG', 'PR', 'SC'],
    maxVisibleChips: 2,
  },
};

export const Required: Story = {
  args: {
    label: 'Estados (obrigatório)',
    items: OPTIONS,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Estados',
    items: OPTIONS,
    modelValue: ['SP', 'RJ'],
    disabled: true,
  },
};

export const StringItems: Story = {
  args: {
    label: 'Tecnologias',
    items: ['Vue', 'TypeScript', 'Vuetify', 'Vite'],
    modelValue: ['Vue', 'Vite'],
  },
};

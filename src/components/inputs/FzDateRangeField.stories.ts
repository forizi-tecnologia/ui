import type { Meta, StoryObj } from '@storybook/vue3';
import FzDateRangeField from './FzDateRangeField.vue';

const meta = {
  title: 'Inputs/FzDateRangeField',
  component: FzDateRangeField,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { description: 'v-model bound date range object { start: string | null, end: string | null } with ISO dates (yyyy-mm-dd)' },
    labelStart: { control: 'text', description: 'Start field label. Default: "Data inicial"' },
    labelEnd: { control: 'text', description: 'End field label. Default: "Data final"' },
    format: { control: 'select', options: ['dd/mm/yyyy', 'yyyy-mm-dd'], description: 'Display format and input mask. Default: "dd/mm/yyyy"' },
    locale: { control: 'select', options: ['pt-BR', 'en'], description: 'Language for month names and weekday initials. Default: "pt-BR"' },
    disabled: { control: 'boolean', description: 'Disable both date fields' },
    hint: { control: 'text', description: 'Persistent helper text displayed below each field' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
    min: { control: 'text', description: 'Minimum selectable date (global) as ISO string. null = unbounded' },
    max: { control: 'text', description: 'Maximum selectable date (global) as ISO string. null = unbounded' },
    separator: { control: 'text', description: 'Text between start and end fields. Default: "até"' },
    rules: { description: 'Array of custom validation rules applied to both fields' },
    required: { control: 'boolean', description: 'Empty values fail validation when true' },
    validateOnBlur: { control: 'boolean', description: 'Validate on blur (true) or on every input (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Override for the required validation message' },
    invalidMessage: { control: 'text', description: 'Override for the invalid date message' },
    rangeInvalidMessage: { control: 'text', description: 'Override for the range validation message. Default: "Data inicial não pode ser maior que a data final"' },
  },
} satisfies Meta<typeof FzDateRangeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
  },
};

export const WithValues: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
    modelValue: { start: '2026-07-01', end: '2026-07-10' },
  },
};

export const IsoFormat: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
    format: 'yyyy-mm-dd',
    modelValue: { start: '2026-07-01', end: '2026-07-10' },
  },
};

export const MinMax: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
    min: '2026-07-01',
    max: '2026-07-31',
    hint: 'Período entre 01/07/2026 e 31/07/2026',
  },
};

export const Disabled: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
    modelValue: { start: '2026-07-15', end: '2026-07-20' },
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    labelStart: 'Data inicial',
    labelEnd: 'Data final',
    required: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    labelStart: 'Início',
    labelEnd: 'Fim',
    separator: 'a',
  },
};

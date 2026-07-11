import type { Meta, StoryObj } from '@storybook/vue3';
import FzDatePicker from './FzDatePicker.vue';

const meta = {
  title: 'Inputs/FzDatePicker',
  component: FzDatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Selected date as canonical ISO string (yyyy-mm-dd), regardless of the display format' },
    format: { control: 'select', options: ['dd/mm/yyyy', 'yyyy-mm-dd'], description: 'Display format and input mask. Does not affect v-model. Default: "dd/mm/yyyy"' },
    locale: { control: 'select', options: ['pt-BR', 'en'], description: 'Language for month names and weekday initials. Default: "pt-BR"' },
    label: { control: 'text', description: 'Field label text. Default: "Data"' },
    placeholder: { control: 'text', description: 'Custom placeholder. Defaults to the format hint (e.g. "dd/mm/aaaa")' },
    disabled: { control: 'boolean', description: 'Disable the field and the calendar trigger' },
    hint: { control: 'text', description: 'Persistent helper text displayed below the field' },
    required: { control: 'boolean', description: 'Empty value fails validation when true' },
    validateOnBlur: { control: 'boolean', description: 'Resolve validation on blur (true) or on every input (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Override for the required validation message' },
    invalidMessage: { control: 'text', description: 'Override for the invalid/out-of-range validation message' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
    hideDetails: { control: 'boolean', description: 'Hide the hint and error messages area. Default: false' },
    min: { control: 'text', description: 'Minimum selectable date as ISO string. null = unbounded' },
    max: { control: 'text', description: 'Maximum selectable date as ISO string. null = unbounded' },
    icon: { control: 'text', description: 'Calendar trigger icon (mdi-*). Default: "mdi-calendar"' },
    todayLabel: { control: 'text', description: 'Label of the "today" shortcut button. Defaults to "Hoje" (pt-BR) or "Today" (en)' },
    width: { control: 'number', description: 'Calendar dropdown width in pixels. Default: 400' },
    height: { control: 'number', description: 'Calendar dropdown height in pixels. Default: 400' },
  },
} satisfies Meta<typeof FzDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Data',
  },
};

export const IsoFormat: Story = {
  args: {
    label: 'Data (ISO)',
    format: 'yyyy-mm-dd',
    modelValue: '2026-07-08',
  },
};

export const EnglishLocale: Story = {
  args: {
    label: 'Date',
    locale: 'en',
    modelValue: '2026-07-08',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Data de nascimento',
    modelValue: '1990-05-20',
  },
};

export const Required: Story = {
  args: {
    label: 'Data (obrigatória)',
    required: true,
  },
};

export const MinMax: Story = {
  args: {
    label: 'Data (julho de 2026)',
    min: '2026-07-01',
    max: '2026-07-31',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Data (desabilitado)',
    modelValue: '2026-07-08',
    disabled: true,
  },
};

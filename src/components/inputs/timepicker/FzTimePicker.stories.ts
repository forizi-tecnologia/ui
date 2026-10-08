import type { Meta, StoryObj } from '@storybook/vue3';
import FzTimePicker from './FzTimePicker.vue';

const meta = {
  title: 'Inputs/FzTimePicker',
  component: FzTimePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Selected time as canonical 24h string (HH:mm), regardless of the display mode' },
    use24Hour: { control: 'boolean', description: 'true shows/masks 24h (HH:mm). false switches to 12h with an AM/PM wheel. Does not affect v-model. Default: true' },
    minuteStep: { control: 'number', description: 'Minute wheel granularity (e.g. 5 → 00, 05, 10...). Invalid values fall back to 1. Default: 1' },
    label: { control: 'text', description: 'Field label text. Default: "Hora"' },
    placeholder: { control: 'text', description: 'Custom placeholder. Defaults to "hh:mm" (24h) or "hh:mm AM/PM" (12h)' },
    disabled: { control: 'boolean', description: 'Disable the field and the picker trigger' },
    hint: { control: 'text', description: 'Persistent helper text displayed below the field' },
    required: { control: 'boolean', description: 'Empty value fails validation when true' },
    validateOnBlur: { control: 'boolean', description: 'Resolve validation on blur (true) or on every input (false). Default: true' },
    requiredMessage: { control: 'text', description: 'Override for the required validation message' },
    invalidMessage: { control: 'text', description: 'Override for the invalid validation message' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify text field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify text field density. Default: "comfortable"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error messages area. "auto" hides it until there are messages. Default: "auto"' },
    fieldWidth: { control: 'text', description: 'Field width. Default: "160px"' },
    icon: { control: 'text', description: 'Trigger icon (mdi-*). Default: "mdi-clock-outline"' },
    width: { control: 'number', description: 'Picker dropdown width in pixels. Defaults to 180 (24h) or 240 (12h)' },
    height: { control: 'number', description: 'Wheel viewport height in pixels. Default: 160' },
    itemHeight: { control: 'number', description: 'Wheel item height in pixels. Default: 32' },
    menuLocation: { control: 'text', description: 'Vuetify menu location. Default: "top right"' },
    menuOrigin: { control: 'text', description: 'Vuetify menu origin. Default: "auto"' },
    hourLabel: { control: 'text', description: 'Accessible label for the hour wheel. Default: "Hora"' },
    minuteLabel: { control: 'text', description: 'Accessible label for the minute wheel. Default: "Minuto"' },
    meridiemLabel: { control: 'text', description: 'Accessible label for the AM/PM wheel. Default: "Período"' },
  },
} satisfies Meta<typeof FzTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Hora',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Horário de início',
    modelValue: '14:30',
  },
};

export const TwelveHour: Story = {
  args: {
    label: 'Horário (12h)',
    use24Hour: false,
    modelValue: '14:30',
  },
};

export const MinuteStep: Story = {
  args: {
    label: 'Hora (passo de 15 min)',
    minuteStep: 15,
  },
};

export const Required: Story = {
  args: {
    label: 'Hora (obrigatória)',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Hora (desabilitada)',
    modelValue: '09:00',
    disabled: true,
  },
};

export const CustomMenuLocation: Story = {
  args: {
    label: 'Location custom (bottom end)',
    menuLocation: 'bottom end',
  },
};

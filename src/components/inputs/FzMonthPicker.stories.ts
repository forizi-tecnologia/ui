import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FzMonthPicker from './FzMonthPicker.vue';

const meta = {
  title: 'Inputs/FzMonthPicker',
  component: FzMonthPicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Canonical value as yyyy-mm, regardless of the display format' },
    label: { control: 'text', description: 'Field label. Default: "Mês"' },
    locale: { control: 'select', options: ['pt-BR', 'en'], description: 'Month names and aria labels language. Default: "pt-BR"' },
    format: { control: 'select', options: ['mm/yyyy', 'yyyy-mm'], description: 'Display format. Does not affect v-model. Default: "mm/yyyy"' },
    min: { control: 'text', description: 'Minimum selectable month (yyyy-mm, inclusive)' },
    max: { control: 'text', description: 'Maximum selectable month (yyyy-mm, inclusive)' },
    disabled: { control: 'boolean', description: 'Disable the field and the menu' },
    required: { control: 'boolean', description: 'Empty value fails validation when true' },
    validateOnBlur: { control: 'boolean', description: 'Resolve isValid on blur. Default: true' },
    requiredMessage: { control: 'text', description: 'Custom required message' },
    rules: { description: 'Custom validation rules appended after the built-in required rule' },
    variant: { control: 'select', options: ['underlined', 'outlined', 'filled', 'plain', 'solo'], description: 'Vuetify field variant. Default: "underlined"' },
    density: { control: 'select', options: ['default', 'comfortable', 'compact'], description: 'Vuetify field density. Default: "comfortable"' },
    hideDetails: { control: 'select', options: [true, false, 'auto'], description: 'Hide the hint and error area. Default: "auto"' },
    fieldWidth: { control: 'text', description: 'Field width. Default: "160px"' },
    menuLocation: { control: 'text', description: 'Vuetify menu location. Default: "top right"' },
    menuOrigin: { control: 'text', description: 'Vuetify menu origin. Default: "auto"' },
  },
} satisfies Meta<typeof FzMonthPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderPicker = (args: Record<string, unknown>) => ({
  components: { FzMonthPicker },
  setup() {
    const value = ref((args.modelValue as string | undefined) ?? '');

    return { args, value };
  },
  template: `
    <div class="d-flex flex-column ga-2">
      <FzMonthPicker v-bind="args" v-model="value" />
      <span class="text-body-2 text-medium-emphasis">v-model: {{ value || '(empty)' }}</span>
    </div>
  `,
});

export const Default: Story = {
  args: { label: 'Mês' },
  render: renderPicker,
};

export const WithValue: Story = {
  args: { label: 'Mês de referência', modelValue: '2026-11' },
  render: renderPicker,
};

export const IsoFormat: Story = {
  args: { label: 'Mês (ISO)', modelValue: '2026-11', format: 'yyyy-mm' },
  render: renderPicker,
};

export const EnglishLocale: Story = {
  args: { label: 'Month', modelValue: '2026-11', locale: 'en' },
  render: renderPicker,
};

export const MinMax: Story = {
  args: { label: 'Mês (mar–set/2026)', modelValue: '2026-06', min: '2026-03', max: '2026-09' },
  render: renderPicker,
};

export const Disabled: Story = {
  args: { label: 'Mês', modelValue: '2026-11', disabled: true },
  render: renderPicker,
};

export const Required: Story = {
  args: { label: 'Mês de referência', required: true },
  render: renderPicker,
};

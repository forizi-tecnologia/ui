import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FzMonthStepper from './FzMonthStepper.vue';

const meta = {
  title: 'Navigation/FzMonthStepper',
  component: FzMonthStepper,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Canonical value as yyyy-mm' },
    locale: { control: 'select', options: ['pt-BR', 'en'], description: 'Month names and aria labels language. Default: "pt-BR"' },
    min: { control: 'text', description: 'Minimum reachable month (yyyy-mm, inclusive)' },
    max: { control: 'text', description: 'Maximum reachable month (yyyy-mm, inclusive)' },
    disabled: { control: 'boolean', description: 'Disable both arrows' },
    arrows: { control: 'boolean', description: 'Show the previous/next arrows. Default: true' },
    allowFuture: { control: 'boolean', description: 'When false, blocks navigating past the current month. Default: true' },
  },
} satisfies Meta<typeof FzMonthStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderStepper = (initialValue: string, props: Record<string, unknown> = {}) => () => ({
  components: { FzMonthStepper },
  setup() {
    const value = ref(initialValue);

    return { value, props };
  },
  template: `
    <div class="d-flex flex-column ga-2">
      <FzMonthStepper v-model="value" v-bind="props" />
      <span class="text-body-2 text-medium-emphasis">v-model: {{ value }}</span>
    </div>
  `,
});

export const Default: Story = {
  render: renderStepper('2026-11'),
};

export const MiddleOfYear: Story = {
  render: renderStepper('2026-06'),
};

export const MinMax: Story = {
  render: renderStepper('2026-06', { min: '2026-03', max: '2026-09' }),
};

export const EnglishLocale: Story = {
  render: renderStepper('2026-11', { locale: 'en' }),
};

export const Disabled: Story = {
  render: renderStepper('2026-11', { disabled: true }),
};

export const NoArrows: Story = {
  render: renderStepper('2026-11', { arrows: false }),
};

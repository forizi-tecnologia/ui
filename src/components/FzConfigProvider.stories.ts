import type { Meta, StoryObj } from '@storybook/vue3';
import FzConfigProvider from './FzConfigProvider.vue';
import FzPhoneField from './inputs/FzPhoneField.vue';
import FzEmailField from './inputs/FzEmailField.vue';
import FzMoneyField from './inputs/FzMoneyField.vue';

const meta = {
  title: 'Layout/FzConfigProvider',
  component: FzConfigProvider,
  tags: ['autodocs'],
  argTypes: {
    defaults: {
      description: 'Default props for all Fz components within this provider',
    },
    variant: {
      control: 'select',
      options: ['underlined', 'outlined', 'filled', 'plain', 'solo'],
      description: 'Variant applied to all Fz inputs inside the provider',
    },
  },
} satisfies Meta<typeof FzConfigProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithOutlined: Story = {
  args: {
    defaults: { variant: 'outlined' },
  },
  render: (args) => ({
    components: { FzConfigProvider, FzPhoneField, FzEmailField, FzMoneyField },
    setup: () => ({ args }),
    template: `
      <FzConfigProvider :defaults="args.defaults">
        <div class="d-flex flex-column ga-4 pa-4">
          <FzPhoneField label="Telefone (outlined)" />
          <FzEmailField label="Email (outlined)" />
          <FzMoneyField label="Valor (outlined)" />
        </div>
      </FzConfigProvider>
    `,
  }),
};

export const WithFilled: Story = {
  args: {
    defaults: { variant: 'filled' },
  },
  render: (args) => ({
    components: { FzConfigProvider, FzPhoneField, FzEmailField, FzMoneyField },
    setup: () => ({ args }),
    template: `
      <FzConfigProvider :defaults="args.defaults">
        <div class="d-flex flex-column ga-4 pa-4">
          <FzPhoneField label="Telefone (filled)" />
          <FzEmailField label="Email (filled)" />
          <FzMoneyField label="Valor (filled)" />
        </div>
      </FzConfigProvider>
    `,
  }),
};

export const DefaultUnderlined: Story = {
  render: () => ({
    components: { FzConfigProvider, FzPhoneField, FzEmailField, FzMoneyField },
    template: `
      <FzConfigProvider :defaults="{}">
        <div class="d-flex flex-column ga-4 pa-4">
          <FzPhoneField label="Telefone (default)" />
          <FzEmailField label="Email (default)" />
          <FzMoneyField label="Valor (default)" />
        </div>
      </FzConfigProvider>
    `,
  }),
};

export const OneOffOverride: Story = {
  render: () => ({
    components: { FzConfigProvider, FzPhoneField, FzEmailField },
    setup: () => ({}),
    template: `
      <FzConfigProvider :defaults="{ variant: 'outlined' }">
        <div class="d-flex flex-column ga-4 pa-4">
          <FzPhoneField label="Telefone (outlined)" />
          <FzEmailField label="Email (outlined)" />
          <FzPhoneField label="Telefone (filled — override)" variant="filled" />
          <FzEmailField label="Email (underlined — override)" variant="underlined" />
        </div>
      </FzConfigProvider>
    `,
  }),
};

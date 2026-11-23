import type { Meta, StoryObj } from '@storybook/vue3';
import FzEmptyState from './FzEmptyState.vue';

const meta = {
  title: 'Layout/FzEmptyState',
  component: FzEmptyState,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', description: 'MDI icon name. Default: "mdi-inbox-outline"' },
    title: { control: 'text', description: 'Empty state title (required)' },
    description: { control: 'text', description: 'Optional supporting text' },
    actionText: { control: 'text', description: 'Label of the default action button. The button only renders when provided' },
    actionIcon: { control: 'text', description: 'MDI icon prepended to the action button' },
    actionColor: { control: 'color', description: 'Action button theme color. Default: "primary"' },
    actionVariant: { control: 'select', options: ['elevated', 'flat', 'tonal', 'outlined', 'text'], description: 'Action button variant. Default: "elevated"' },
    compact: { control: 'boolean', description: 'Smaller spacing, icon and typography, for use inside table cards. Default: false' },
    iconColor: { control: 'color', description: 'Icon theme color. Default: "medium-emphasis"' },
  },
} satisfies Meta<typeof FzEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Nenhuma fatura encontrada' },
};

export const WithDescription: Story = {
  args: {
    title: 'Nenhuma fatura encontrada',
    description: 'Comece registrando sua primeira fatura para acompanhar seus gastos.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Nenhuma fatura encontrada',
    description: 'Comece registrando sua primeira fatura para acompanhar seus gastos.',
    actionText: 'Nova fatura',
    actionIcon: 'mdi-plus',
  },
};

export const CustomActionSlot: Story = {
  args: { title: 'Nenhum filtro aplicado' },
  render: (args) => ({
    components: { FzEmptyState },
    setup: () => ({ args }),
    template: `
      <FzEmptyState v-bind="args">
        <template #action>
          <div class="d-flex ga-2">
            <v-btn color="secondary" variant="outlined" class="text-none">Limpar filtros</v-btn>
            <v-btn color="primary" variant="elevated" class="text-none">Criar fatura</v-btn>
          </div>
        </template>
      </FzEmptyState>
    `,
  }),
};

export const Compact: Story = {
  args: {
    title: 'Nenhum lançamento',
    description: 'Os lançamentos desta fatura aparecerão aqui.',
    compact: true,
  },
};

export const CustomIconAndColor: Story = {
  args: {
    title: 'Erro ao carregar',
    description: 'Tente novamente em alguns instantes.',
    icon: 'mdi-alert-circle-outline',
    iconColor: 'error',
    actionText: 'Tentar novamente',
    actionVariant: 'outlined',
  },
};

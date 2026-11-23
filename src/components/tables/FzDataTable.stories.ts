import type { Meta, StoryObj } from '@storybook/vue3';
import type { ConcreteComponent } from 'vue';
import { ref } from 'vue';
import type { FzDataTableHeader } from '@/utils/table';
import FzDataTable from './FzDataTable.vue';
import { useClientDataTable } from '@/composables/useClientDataTable';

const headers: FzDataTableHeader[] = [
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email', hideOnCard: true },
  { title: 'Cidade', key: 'city' },
  { title: 'Status', key: 'status' },
];

const items = Array.from({ length: 12 }, (_, index) => ({
  name: `Usuário ${index + 1}`,
  email: `usuario${index + 1}@forizi.com.br`,
  city: 'São Paulo',
  status: index % 2 === 0 ? 'ativo' : 'inativo',
}));

const meta = {
  title: 'Tables/FzDataTable',
  component: FzDataTable as unknown as ConcreteComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Current page of rows (server-side)' },
    itemsLength: { control: 'number', description: 'Total row count (server-side)' },
    loading: { control: 'boolean', description: 'Show the loading state' },
    mobile: { control: 'boolean', description: 'Force cards (true) or table (false). Unset → auto breakpoint' },
    noDataText: { control: 'text', description: 'Empty state text. Default: "Nenhum registro encontrado"' },
    loadingText: { control: 'text', description: 'Loading text. Default: "Carregando..."' },
    tableProps: { control: 'object', description: 'Any other v-data-table-server prop' },
    clickableRows: {
      control: 'boolean',
      description: 'Enables row-click on desktop and cards. Default: false. Add `data-row-click-ignore` to custom cell content that must not trigger the event',
    },
    headers: {
      control: 'object',
      description: 'Column definitions (FzDataTableHeader[]). Set `hideOnCard: true` on a header to drop it from the mobile cards while keeping it on desktop',
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: false,
    itemsPerPage: 5,
  },
};

export const Mobile: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: true,
    itemsPerPage: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'The `email` header is marked with `hideOnCard: true`, so the mobile cards drop that row while the desktop table keeps the column.',
      },
    },
  },
};

export const CustomCell: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: false,
  },
  render: (args) => ({
    components: { FzDataTable },
    setup: () => ({ args }),
    template: `
      <FzDataTable v-bind="args">
        <template #item.status="{ value }">
          <v-chip :color="value === 'ativo' ? 'success' : 'error'" size="small" variant="tonal">
            {{ value }}
          </v-chip>
        </template>
      </FzDataTable>
    `,
  }),
};

export const CustomCard: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: true,
  },
  render: (args) => ({
    components: { FzDataTable },
    setup: () => ({ args }),
    template: `
      <FzDataTable v-bind="args">
        <template #card="{ item }">
          <div class="d-flex flex-column ga-1">
            <span class="text-subtitle-1 font-weight-medium">{{ item.name }}</span>
            <span class="text-body-2 text-medium-emphasis">{{ item.email }}</span>
          </div>
        </template>
      </FzDataTable>
    `,
  }),
};

export const Loading: Story = {
  args: {
    headers,
    items: [],
    itemsLength: 0,
    loading: true,
    mobile: true,
  },
};

export const Empty: Story = {
  args: {
    headers,
    items: [],
    itemsLength: 0,
    mobile: true,
  },
};

export const EmptyCustom: Story = {
  args: {
    headers,
    items: [],
    itemsLength: 0,
    mobile: true,
  },
  render: (args) => ({
    components: { FzDataTable },
    setup: () => ({ args }),
    template: `
      <FzDataTable v-bind="args">
        <template #no-data>
          <div class="d-flex flex-column align-center ga-3 py-8">
            <v-icon size="48" color="medium-emphasis">mdi-inbox-outline</v-icon>
            <span class="text-subtitle-1 font-weight-medium">Nenhuma fatura encontrada</span>
            <span class="text-body-2 text-medium-emphasis text-center">
              Comece registrando sua primeira fatura para acompanhar seus gastos.
            </span>
            <v-btn color="primary" variant="elevated" class="text-none">Nova fatura</v-btn>
          </div>
        </template>
      </FzDataTable>
    `,
  }),
};

export const RowClick: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: false,
    clickableRows: true,
  },
  render: (args) => ({
    components: { FzDataTable },
    setup() {
      const selectedName = ref('');
      const onRowClick = (item: { name: string }) => {
        selectedName.value = item.name;
      };

      return { args, selectedName, onRowClick };
    },
    template: `
      <div class="d-flex flex-column ga-4">
        <v-alert v-if="selectedName" type="info" variant="tonal">
          Linha selecionada: {{ selectedName }}
        </v-alert>
        <FzDataTable v-bind="args" @row-click="onRowClick" />
      </div>
    `,
  }),
};

export const RowClickMobile: Story = {
  args: {
    headers,
    items,
    itemsLength: items.length,
    mobile: true,
    clickableRows: true,
  },
  render: (args) => ({
    components: { FzDataTable },
    setup() {
      const selectedName = ref('');
      const onRowClick = (item: { name: string }) => {
        selectedName.value = item.name;
      };

      return { args, selectedName, onRowClick };
    },
    template: `
      <div class="d-flex flex-column ga-4">
        <v-alert v-if="selectedName" type="info" variant="tonal">
          Card selecionado: {{ selectedName }}
        </v-alert>
        <FzDataTable v-bind="args" @row-click="onRowClick" />
      </div>
    `,
  }),
};

export const ClientSide: Story = {
  args: {
    headers,
    itemsLength: items.length,
    mobile: false,
  },
  render: () => ({
    components: { FzDataTable },
    setup() {
      const source = ref(items);
      const { page, itemsPerPage, sortBy, pageItems, total } = useClientDataTable(source);

      return { headers, page, itemsPerPage, sortBy, pageItems, total };
    },
    template: `
      <FzDataTable
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        v-model:sort-by="sortBy"
        :headers="headers"
        :items="pageItems"
        :items-length="total"
        :table-props="{ itemsPerPageOptions: [5, 10, 25] }"
      />
    `,
  }),
};

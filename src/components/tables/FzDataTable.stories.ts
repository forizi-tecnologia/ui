import type { Meta, StoryObj } from '@storybook/vue3';
import type { ConcreteComponent } from 'vue';
import type { DataTableHeader } from 'vuetify';
import FzDataTable from './FzDataTable.vue';

const headers: DataTableHeader[] = [
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email' },
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
    headers: { control: 'object', description: 'Column definitions (DataTableHeader[])' },
    items: { control: 'object', description: 'Current page of rows (server-side)' },
    itemsLength: { control: 'number', description: 'Total row count (server-side)' },
    loading: { control: 'boolean', description: 'Show the loading state' },
    mobile: { control: 'boolean', description: 'Force cards (true) or table (false). Unset → auto breakpoint' },
    noDataText: { control: 'text', description: 'Empty state text. Default: "Nenhum registro encontrado"' },
    loadingText: { control: 'text', description: 'Loading text. Default: "Carregando..."' },
    tableProps: { control: 'object', description: 'Any other v-data-table-server prop' },
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

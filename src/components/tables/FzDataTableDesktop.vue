<template>
  <v-data-table-server
    v-bind="mergedTableProps"
    :headers="resolvedHeaders"
    :items="items"
    :items-length="itemsLength"
    :loading="loading"
    :page="page"
    :items-per-page="itemsPerPage"
    :sort-by="sortBy"
    :search="search"
    :no-data-text="noDataText"
    :loading-text="loadingText"
    :height="height"
    @update:page="emit('update:page', $event)"
    @update:items-per-page="emit('update:itemsPerPage', $event)"
    @update:sort-by="emit('update:sortBy', $event)"
    @update:options="emit('update:options', $event)"
  >
    <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>

    <template #no-data>
      <slot name="no-data">
        {{ noDataText }}
      </slot>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts" generic="T">
import { computed, useSlots } from 'vue';
import type { DataTableSortItem } from 'vuetify';
import {
  isInteractiveRowTarget,
  type DataTableOptions,
  type DataTablePassthroughProps,
  type DataTableServerProps,
  type FzDataTableHeader,
} from '@/utils/table';

export interface FzDataTableDesktopProps<T = unknown> {
  headers?: FzDataTableHeader[];
  items?: T[];
  itemsLength?: number;
  loading?: boolean;
  page?: number;
  itemsPerPage?: number;
  sortBy?: DataTableSortItem[];
  search?: string;
  height?: string | number;
  noDataText?: string;
  loadingText?: string;
  tableProps?: DataTablePassthroughProps;
  clickableRows?: boolean;
}

interface FzDataTableRowClickPayload<T = unknown> {
  item: T;
  index: number;
}

const props = withDefaults(defineProps<FzDataTableDesktopProps<T>>(), {
  headers: () => [],
  items: () => [],
  itemsLength: 0,
  loading: false,
  page: 1,
  itemsPerPage: 10,
  sortBy: () => [],
  search: '',
  height: undefined,
  noDataText: 'Nenhum registro encontrado',
  loadingText: 'Carregando...',
  tableProps: () => ({}),
  clickableRows: false,
});

const emit = defineEmits<{
  'update:page': [value: number];
  'update:itemsPerPage': [value: number];
  'update:sortBy': [value: DataTableSortItem[]];
  'update:options': [value: DataTableOptions];
  'row-click': [item: T, event: MouseEvent];
}>();

const slots = useSlots();

const resolvedHeaders = computed(
  () => props.headers as unknown as NonNullable<DataTableServerProps['headers']>,
);

const mergedTableProps = computed<DataTablePassthroughProps & Record<string, unknown>>(() => ({
  itemsPerPageText: 'Itens por página',
  pageText: '{0}-{1} de {2}',
  ...props.tableProps,
  ...(props.clickableRows ? { 'onClick:row': handleRowClick } : {}),
}));

const forwardedSlots = computed(() =>
  Object.fromEntries(Object.entries(slots).filter(([slotName]) => slotName !== 'no-data')),
);

function handleRowClick(event: MouseEvent, payload: FzDataTableRowClickPayload<T>): void {
  if (isInteractiveRowTarget(event.target)) return;

  emit('row-click', payload.item, event);
}
</script>

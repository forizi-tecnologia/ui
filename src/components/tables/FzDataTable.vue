<template>
  <FzDataTableCards
    v-if="isMobileView"
    v-model:page="page"
    :headers="headers"
    :items="items"
    :items-length="itemsLength"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :height="height"
    :elevation="elevation"
    :accent-color="accentColor"
    :accent-width="accentWidth"
    :no-data-text="noDataText"
    :loading-text="loadingText"
    :clickable-rows="clickableRows"
    @row-click="handleRowClick"
  >
    <template v-if="$slots.card" #card="cardProps">
      <slot name="card" v-bind="cardProps" />
    </template>

    <template v-if="$slots['no-data']" #no-data>
      <slot name="no-data" />
    </template>

    <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FzDataTableCards>

  <FzDataTableDesktop
    v-else
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :search="search"
    :headers="headers"
    :items="items"
    :items-length="itemsLength"
    :loading="loading"
    :height="height"
    :no-data-text="noDataText"
    :loading-text="loadingText"
    :table-props="tableProps"
    :clickable-rows="clickableRows"
    @row-click="handleRowClick"
    @update:options="emit('update:options', $event)"
  >
    <template v-if="$slots['no-data']" #no-data>
      <slot name="no-data" />
    </template>

    <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FzDataTableDesktop>
</template>

<script setup lang="ts" generic="T">
import { computed, useSlots } from 'vue';
import type { DataTableSortItem } from 'vuetify';
import { useBreakpoint } from '@/composables/useBreakpoint';
import type { DataTableOptions, DataTablePassthroughProps, FzDataTableHeader } from '@/utils/table';
import FzDataTableCards from './FzDataTableCards.vue';
import FzDataTableDesktop from './FzDataTableDesktop.vue';

export interface FzDataTableProps<T = unknown> {
  headers: FzDataTableHeader[];
  items: T[];
  itemsLength: number;
  loading?: boolean;
  mobile?: boolean;
  search?: string;
  height?: string | number;
  elevation?: number;
  accentColor?: string;
  accentWidth?: number;
  noDataText?: string;
  loadingText?: string;
  tableProps?: DataTablePassthroughProps;
  clickableRows?: boolean;
}

const props = withDefaults(defineProps<FzDataTableProps<T>>(), {
  loading: false,
  mobile: undefined,
  search: '',
  height: undefined,
  elevation: 0,
  accentColor: undefined,
  accentWidth: 4,
  noDataText: 'Nenhum registro encontrado',
  loadingText: 'Carregando...',
  tableProps: () => ({}),
  clickableRows: false,
});

const emit = defineEmits<{
  'update:options': [value: DataTableOptions];
  'row-click': [item: T, event: MouseEvent];
}>();

const page = defineModel<number>('page', { default: 1 });

const itemsPerPage = defineModel<number>('itemsPerPage', { default: 10 });

const sortBy = defineModel<DataTableSortItem[]>('sortBy', { default: () => [] });

const { isMobileOrTablet } = useBreakpoint();

const slots = useSlots();

const isMobileView = computed(() => props.mobile ?? isMobileOrTablet.value);

const forwardedSlots = computed(() =>
  Object.fromEntries(
    Object.entries(slots).filter(([slotName]) => slotName !== 'card' && slotName !== 'no-data'),
  ),
);

function handleRowClick(item: T, event: MouseEvent): void {
  emit('row-click', item, event);
}
</script>

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
  >
    <template v-if="$slots.card" #card="cardProps">
      <slot name="card" v-bind="cardProps" />
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
    @update:options="emit('update:options', $event)"
  >
    <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FzDataTableDesktop>
</template>

<script setup lang="ts" generic="T">
import { computed, useSlots } from 'vue';
import type { DataTableHeader, DataTableSortItem } from 'vuetify';
import { useBreakpoint } from '@/composables/useBreakpoint';
import type { DataTableOptions, DataTablePassthroughProps } from '@/utils/table';
import FzDataTableCards from './FzDataTableCards.vue';
import FzDataTableDesktop from './FzDataTableDesktop.vue';

export interface FzDataTableProps<T = unknown> {
  headers: DataTableHeader[];
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
});

const emit = defineEmits<{
  'update:options': [value: DataTableOptions];
}>();

const page = defineModel<number>('page', { default: 1 });

const itemsPerPage = defineModel<number>('itemsPerPage', { default: 10 });

const sortBy = defineModel<DataTableSortItem[]>('sortBy', { default: () => [] });

const { isMobileOrTablet } = useBreakpoint();

const slots = useSlots();

const isMobileView = computed(() => props.mobile ?? isMobileOrTablet.value);

const forwardedSlots = computed(() =>
  Object.fromEntries(Object.entries(slots).filter(([slotName]) => slotName !== 'card')),
);
</script>

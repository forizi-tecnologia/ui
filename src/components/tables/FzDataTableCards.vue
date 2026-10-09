<template>
  <div class="d-flex flex-column ga-3" :style="rootStyle">
    <div class="d-flex flex-column ga-3" :class="{ 'fz-data-table-cards__scroll': hasHeight }">
      <div v-if="loading" class="d-flex flex-column align-center ga-2 py-8">
        <v-progress-circular indeterminate color="primary" />

        <span class="text-body-2 text-medium-emphasis">{{ loadingText }}</span>
      </div>

      <div v-else-if="!items.length" class="d-flex justify-center py-8">
        <span class="text-body-2 text-medium-emphasis">{{ noDataText }}</span>
      </div>

      <template v-else>
        <v-card
          v-for="(item, index) in items"
          :key="index"
          :elevation="elevation"
          :style="accentStyle"
        >
          <v-card-text class="pa-2">
            <slot name="card" :item="item" :index="index">
              <div class="d-flex flex-column ga-2">
                <div
                  v-for="header in columns"
                  :key="header.key"
                  class="d-flex justify-space-between ga-4"
                >
                  <span class="text-body-2 text-medium-emphasis">{{ header.title }}</span>

                  <span class="text-body-2 text-right">
                    <slot
                      :name="`item.${header.key}`"
                      :item="item"
                      :index="index"
                      :value="getValueByPath(item, header.key)"
                    >
                      {{ getValueByPath(item, header.key) }}
                    </slot>
                  </span>
                </div>
              </div>
            </slot>
          </v-card-text>
        </v-card>
      </template>
    </div>

    <FzPagination
      v-if="pageCount > 1"
      :model-value="page"
      :length="pageCount"
      @update:model-value="emit('update:page', $event)"
    />
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import type { DataTableHeader } from 'vuetify';
import { getValueByPath, getVisibleColumns } from '@/utils/table';
import FzPagination from '@/components/navigation/FzPagination.vue';

export interface FzDataTableCardsProps<T = unknown> {
  headers?: DataTableHeader[];
  items?: T[];
  itemsLength?: number;
  loading?: boolean;
  page?: number;
  itemsPerPage?: number;
  height?: string | number;
  elevation?: number;
  accentColor?: string;
  accentWidth?: number;
  noDataText?: string;
  loadingText?: string;
}

const props = withDefaults(defineProps<FzDataTableCardsProps<T>>(), {
  headers: () => [],
  items: () => [],
  itemsLength: 0,
  loading: false,
  page: 1,
  itemsPerPage: 10,
  height: undefined,
  elevation: 0,
  accentColor: undefined,
  accentWidth: 4,
  noDataText: 'Nenhum registro encontrado',
  loadingText: 'Carregando...',
});

const emit = defineEmits<{
  'update:page': [value: number];
}>();

const theme = useTheme();

const columns = computed(() => getVisibleColumns(props.headers));

const pageCount = computed(() => {
  if (props.itemsPerPage <= 0) return 1;

  return Math.ceil(props.itemsLength / props.itemsPerPage);
});

const hasHeight = computed(() => props.height !== undefined && props.height !== '');

const rootStyle = computed(() => {
  if (!hasHeight.value) return undefined;

  return { height: typeof props.height === 'number' ? `${props.height}px` : props.height };
});

const accentStyle = computed(() => {
  if (!props.accentColor) return undefined;

  const color = theme.current.value.colors[props.accentColor] ?? props.accentColor;

  return { borderLeft: `${props.accentWidth}px solid ${color}` };
});
</script>

<style scoped>
.fz-data-table-cards__scroll {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
}

.fz-data-table-cards__scroll > * {
  flex: 0 0 auto;
}
</style>

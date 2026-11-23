import { computed, ref, watch, type Ref } from 'vue';
import type { DataTableSortItem } from 'vuetify';
import { getValueByPath } from '@/utils/table';

const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

function compareValues(first: unknown, second: unknown): number {
  if (first === second) return 0;

  if (first === null || first === undefined) return 1;

  if (second === null || second === undefined) return -1;

  if (typeof first === 'number' && typeof second === 'number') return first - second;

  return collator.compare(String(first), String(second));
}

export function useClientDataTable<T>(source: Ref<T[]>, initialItemsPerPage = 25) {
  const page = ref(1);
  const itemsPerPage = ref(initialItemsPerPage);
  const sortBy = ref<DataTableSortItem[]>([]);

  const total = computed(() => source.value.length);

  const sortedItems = computed(() => {
    if (!sortBy.value.length) return source.value;

    return [...source.value].sort((first, second) => {
      for (const sortItem of sortBy.value) {
        const result = compareValues(
          getValueByPath(first, sortItem.key),
          getValueByPath(second, sortItem.key),
        );

        if (result === 0) continue;

        return sortItem.order === 'desc' ? -result : result;
      }

      return 0;
    });
  });

  const pageCount = computed(() => {
    if (itemsPerPage.value <= 0) return 1;

    return Math.max(1, Math.ceil(total.value / itemsPerPage.value));
  });

  const pageItems = computed(() => {
    if (itemsPerPage.value <= 0) return sortedItems.value;

    const start = (page.value - 1) * itemsPerPage.value;

    return sortedItems.value.slice(start, start + itemsPerPage.value);
  });

  watch(source, () => {
    page.value = 1;
  });

  return {
    page,
    itemsPerPage,
    sortBy,
    pageItems,
    total,
    pageCount,
  };
}

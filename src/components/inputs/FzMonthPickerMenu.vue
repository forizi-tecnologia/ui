<template>
  <v-menu
    v-model="isOpen"
    :disabled="disabled"
    :close-on-content-click="false"
    :location="location"
    :origin="origin"
    offset="4"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" :class="{ 'cursor-pointer': !disabled }">
        {{ TRIGGER_ICON }}
      </v-icon>
    </template>

    <v-card :width="MENU_WIDTH" class="d-flex flex-column">
      <div class="d-flex align-center px-2 py-2">
        <v-btn
          icon
          variant="text"
          density="comfortable"
          :disabled="!canGoPreviousYear"
          :aria-label="previousYearLabel"
          @click="goPreviousYear"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <span class="flex-grow-1 text-center text-subtitle-1 font-weight-medium">
          {{ focusedYear }}
        </span>

        <v-btn
          icon
          variant="text"
          density="comfortable"
          :disabled="!canGoNextYear"
          :aria-label="nextYearLabel"
          @click="goNextYear"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-divider />

      <div class="fz-mp-months pa-2">
        <v-btn
          v-for="(monthName, index) in monthNames"
          :key="monthName"
          :variant="monthVariant(index + 1)"
          :color="monthColor(index + 1)"
          :disabled="isMonthDisabled(index + 1)"
          :height="MONTH_BUTTON_HEIGHT"
          class="text-none"
          @click="onSelect(index + 1)"
        >
          {{ shortName(monthName) }}
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue';
import { useMonthPicker } from '@/composables/useMonthPicker';
import type { MenuAnchor, MenuOrigin } from '@/utils/types';
import type { DateLocale } from '@/utils/date';

interface Props {
  open: boolean;
  selected?: string;
  min?: string | null;
  max?: string | null;
  locale?: DateLocale;
  disabled?: boolean;
  location?: MenuAnchor;
  origin?: MenuOrigin;
}

const props = withDefaults(defineProps<Props>(), {
  selected: '',
  min: null,
  max: null,
  locale: 'pt-BR',
  disabled: false,
  location: 'top right',
  origin: 'auto',
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [value: string];
}>();

const MENU_WIDTH = 280;

const MONTH_BUTTON_HEIGHT = 44;

const TRIGGER_ICON = 'mdi-calendar-month';

const {
  focusedYear,
  monthNames,
  canGoPreviousYear,
  canGoNextYear,
  isMonthDisabled,
  isCurrentMonth,
  isSelectedMonth,
  goPreviousYear,
  goNextYear,
  selectMonth,
  resetFocus,
} = useMonthPicker({
  modelValue: toRef(props, 'selected'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  locale: toRef(props, 'locale'),
});

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
});

const previousYearLabel = computed(() => props.locale === 'en' ? 'Previous year' : 'Ano anterior');

const nextYearLabel = computed(() => props.locale === 'en' ? 'Next year' : 'Próximo ano');

function monthVariant(month: number): 'flat' | 'outlined' | 'text' {
  if (isSelectedMonth(month)) return 'flat';

  if (isCurrentMonth(month)) return 'outlined';

  return 'text';
}

function monthColor(month: number): string | undefined {
  if (isSelectedMonth(month) || isCurrentMonth(month)) return 'primary';

  return undefined;
}

function shortName(monthName: string): string {
  return monthName.slice(0, 3);
}

function onSelect(month: number): void {
  const value = selectMonth(month);

  if (!value) return;

  isOpen.value = false;
  emit('select', value);
}

watch(() => props.open, (open) => {
  if (!open) return;

  resetFocus();
});
</script>

<style scoped>
.fz-mp-months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.fz-mp-months :deep(.v-btn) {
  width: 100%;
}
</style>

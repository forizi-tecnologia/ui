<template>
  <v-menu v-model="isOpen" :disabled="disabled" :close-on-content-click="false" offset="4">
    <template #activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" :class="triggerClass">{{ icon }}</v-icon>
    </template>

    <v-card :width="width" :height="height" class="d-flex flex-column">
      <div class="d-flex align-center px-2 py-2">
        <v-btn icon variant="text" density="comfortable" @click="goPrev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn variant="text" class="text-none font-weight-medium flex-grow-1" @click="drillFromTitle">
          {{ headerTitle }}
        </v-btn>

        <v-btn icon variant="text" density="comfortable" @click="goNext">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-divider />

      <div class="fz-dp-content overflow-hidden pa-2">
        <Transition name="fz-dp-fade" mode="out-in">
          <FzDatePickerDaysView
            v-if="isDaysView"
            :weekday-initials="weekdayInitials"
            :day-matrix="dayMatrix"
            :selected-iso="selected"
            :today-iso="currentIso"
            :today-label="resolvedTodayLabel"
            :is-disabled="isDisabled"
            @select="onDaySelect"
          />

          <FzDatePickerMonthsView
            v-else-if="isMonthsView"
            :month-names="monthNames"
            :focused-year="focusedYear"
            :selected-iso="selected"
            @select="selectMonth"
          />

          <FzDatePickerYearsView
            v-else
            :year-list="yearList"
            :focused-year="focusedYear"
            :selected-iso="selected"
            @select="selectYear"
          />
        </Transition>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue';
import { useDatePicker } from '@/composables/useDatePicker';
import { todayIso, type DateLocale } from '@/utils/date';
import FzDatePickerDaysView from './FzDatePickerDaysView.vue';
import FzDatePickerMonthsView from './FzDatePickerMonthsView.vue';
import FzDatePickerYearsView from './FzDatePickerYearsView.vue';

interface Props {
  open: boolean;
  selected?: string;
  icon?: string;
  disabled?: boolean;
  min?: string | null;
  max?: string | null;
  locale?: DateLocale;
  width?: string | number;
  height?: string | number;
  todayLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selected: '',
  icon: 'mdi-calendar',
  disabled: false,
  min: null,
  max: null,
  locale: 'pt-BR',
  width: 400,
  height: 400,
  todayLabel: '',
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [iso: string];
}>();

const {
  focusedYear,
  isDaysView,
  isMonthsView,
  weekdayInitials,
  monthNames,
  dayMatrix,
  yearList,
  headerTitle,
  goPrev,
  goNext,
  drillFromTitle,
  selectMonth,
  selectYear,
  isDisabled,
  reset,
} = useDatePicker({
  selected: toRef(props, 'selected'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  locale: toRef(props, 'locale'),
});

const currentIso = todayIso();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
});

const triggerClass = computed(() => (props.disabled ? undefined : 'fz-dp-trigger'));

const resolvedTodayLabel = computed(() => props.todayLabel || (props.locale === 'en' ? 'Today' : 'Hoje'));

function onDaySelect(iso: string): void {
  emit('select', iso);
  isOpen.value = false;
}

watch(
  () => props.open,
  (open) => {
    if (!open) return;

    reset();
  },
);
</script>

<style scoped>
.fz-dp-trigger {
  cursor: pointer;
}

.fz-dp-content {
  flex: 1 1 0;
  min-height: 0;
}

.fz-dp-fade-enter-active,
.fz-dp-fade-leave-active {
  transition: opacity 0.15s ease;
}

.fz-dp-fade-enter-from,
.fz-dp-fade-leave-to {
  opacity: 0;
}
</style>

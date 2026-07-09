<template>
  <div class="d-flex flex-column h-100">
    <div class="fz-dp-weekdays">
      <div
        v-for="(initial, index) in weekdayInitials"
        :key="index"
        class="text-center text-caption text-medium-emphasis py-1"
      >
        {{ initial }}
      </div>
    </div>

    <div class="fz-dp-days flex-grow-1">
      <div v-for="(cell, index) in dayMatrix" :key="index" class="d-flex align-center justify-center">
        <v-btn
          v-if="cell"
          :variant="dayVariant(cell.iso)"
          :color="dayColor(cell.iso)"
          :disabled="isDisabled(cell.iso)"
          icon
          size="small"
          @click="select(cell.iso)"
        >
          {{ cell.day }}
        </v-btn>
      </div>
    </div>

    <div class="d-flex justify-center pt-2">
      <v-btn variant="text" color="primary" class="text-none" :disabled="isDisabled(todayIso)" @click="select(todayIso)">
        {{ todayLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayCell } from '@/utils/date';

interface Props {
  weekdayInitials: string[];
  dayMatrix: (DayCell | null)[];
  selectedIso: string;
  todayIso: string;
  todayLabel: string;
  isDisabled: (iso: string) => boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [iso: string];
}>();

function isSelected(iso: string): boolean {
  return iso === props.selectedIso;
}

function isToday(iso: string): boolean {
  return iso === props.todayIso;
}

function dayVariant(iso: string): 'flat' | 'outlined' | 'text' {
  if (isSelected(iso)) return 'flat';

  if (isToday(iso)) return 'outlined';

  return 'text';
}

function dayColor(iso: string): string | undefined {
  if (isSelected(iso) || isToday(iso)) return 'primary';

  return undefined;
}

function select(iso: string): void {
  emit('select', iso);
}
</script>

<style scoped>
.fz-dp-weekdays,
.fz-dp-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.fz-dp-days {
  grid-auto-rows: 1fr;
}
</style>

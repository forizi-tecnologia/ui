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
      <v-icon v-bind="activatorProps" :class="triggerClass">{{ icon }}</v-icon>
    </template>

    <v-card :width="resolvedWidth" class="fz-time-menu py-2">
      <div class="fz-time-menu__wheels">
        <FzTimeWheel
          :model-value="hour"
          :options="hourOptions"
          :height="height"
          :item-height="itemHeight"
          :aria-label="resolvedHourLabel"
          class="fz-time-menu__wheel"
          @update:model-value="onHourUpdate"
        />

        <FzTimeWheel
          :model-value="minute"
          :options="minuteOptions"
          :height="height"
          :item-height="itemHeight"
          :aria-label="resolvedMinuteLabel"
          class="fz-time-menu__wheel"
          @update:model-value="onMinuteUpdate"
        />

        <FzTimeWheel
          v-if="!use24Hour"
          :model-value="meridiemIndex"
          :options="meridiemOptions"
          :height="height"
          :item-height="itemHeight"
          :aria-label="resolvedMeridiemLabel"
          class="fz-time-menu__wheel fz-time-menu__wheel--meridiem"
          @update:model-value="onMeridiemUpdate"
        />

        <div class="fz-time-menu__highlight" :style="{ height: `${itemHeight}px` }" />
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue';
import { useTimePicker } from '@/composables/useTimePicker';
import type { MenuAnchor, MenuOrigin } from '@/utils/types';
import FzTimeWheel from './FzTimeWheel.vue';

interface Props {
  open: boolean;
  selected?: string;
  use24Hour?: boolean;
  minuteStep?: number;
  icon?: string;
  disabled?: boolean;
  width?: string | number;
  height?: number;
  itemHeight?: number;
  location?: MenuAnchor;
  origin?: MenuOrigin;
  hourLabel?: string;
  minuteLabel?: string;
  meridiemLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selected: '',
  use24Hour: true,
  minuteStep: 1,
  icon: 'mdi-clock-outline',
  disabled: false,
  width: undefined,
  height: 160,
  itemHeight: 32,
  location: 'top right',
  origin: 'auto',
  hourLabel: '',
  minuteLabel: '',
  meridiemLabel: '',
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  select: [value: string];
}>();

const {
  hour,
  minute,
  meridiemIndex,
  hourOptions,
  minuteOptions,
  meridiemOptions,
  reset,
  setMeridiemIndex,
  toCanonicalValue,
} = useTimePicker({
  selected: toRef(props, 'selected'),
  use24Hour: toRef(props, 'use24Hour'),
  minuteStep: toRef(props, 'minuteStep'),
});

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
});

const triggerClass = computed(() => (props.disabled ? undefined : 'fz-time-trigger'));

const resolvedWidth = computed(() => props.width ?? (props.use24Hour ? 180 : 240));

const resolvedHourLabel = computed(() => props.hourLabel || 'Hora');

const resolvedMinuteLabel = computed(() => props.minuteLabel || 'Minuto');

const resolvedMeridiemLabel = computed(() => props.meridiemLabel || 'Período');

function emitSelection(): void {
  const value = toCanonicalValue();

  if (value === props.selected) return;

  emit('select', value);
}

function onHourUpdate(value: number): void {
  hour.value = value;
  emitSelection();
}

function onMinuteUpdate(value: number): void {
  minute.value = value;
  emitSelection();
}

function onMeridiemUpdate(index: number): void {
  setMeridiemIndex(index);
  emitSelection();
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
.fz-time-menu__wheels {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 0 8px;
}

.fz-time-menu__wheel {
  position: relative;
  z-index: 1;
  width: 64px;
}

.fz-time-menu__wheel--meridiem {
  width: 56px;
}

.fz-time-menu__highlight {
  position: absolute;
  top: 50%;
  left: 8px;
  right: 8px;
  transform: translateY(-50%);
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.08);
  pointer-events: none;
  z-index: 0;
}

.fz-time-trigger {
  cursor: pointer;
}
</style>

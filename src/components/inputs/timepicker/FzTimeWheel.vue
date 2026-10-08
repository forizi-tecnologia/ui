<template>
  <div
    ref="containerRef"
    class="fz-time-wheel"
    :style="{ height: `${height}px` }"
    role="listbox"
    :aria-label="ariaLabel"
    tabindex="0"
    @scroll="onScroll"
    @keydown="onKeydown"
  >
    <div :style="{ height: `${spacerHeight}px` }" />

    <div
      v-for="(option, index) in options"
      :key="option.value"
      class="fz-time-wheel__item d-flex align-center justify-center text-body-1"
      :class="{ 'fz-time-wheel__item--active': option.value === modelValue }"
      :style="{ height: `${itemHeight}px` }"
      role="option"
      :aria-selected="option.value === modelValue"
      @click="select(index)"
    >
      {{ option.label }}
    </div>

    <div :style="{ height: `${spacerHeight}px` }" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { findNearestOptionIndex, type TimeWheelOption } from '@/utils/time';

interface Props {
  modelValue: number;
  options: TimeWheelOption[];
  height?: number;
  itemHeight?: number;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 160,
  itemHeight: 32,
  ariaLabel: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const containerRef = ref<HTMLElement | null>(null);

let lastEmitted: number | null = null;

const spacerHeight = computed(() => Math.max(0, (props.height - props.itemHeight) / 2));

function selectedIndex(): number {
  return findNearestOptionIndex(props.options, props.modelValue);
}

function scrollToIndex(index: number): void {
  const container = containerRef.value as HTMLElement;

  container.scrollTop = index * props.itemHeight;
}

function emitValue(value: number): void {
  lastEmitted = value;

  emit('update:modelValue', value);
}

function onScroll(): void {
  const container = containerRef.value as HTMLElement;
  const option = props.options[Math.round(container.scrollTop / props.itemHeight)];

  if (!option) return;

  if (option.value === props.modelValue) return;

  emitValue(option.value);
}

function select(index: number): void {
  const option = props.options[index];

  if (option.value !== props.modelValue) emitValue(option.value);

  scrollToIndex(index);
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

  event.preventDefault();

  const index = selectedIndex();
  const nextIndex = event.key === 'ArrowUp' ? index - 1 : index + 1;
  const option = props.options[nextIndex];

  if (!option) return;

  emitValue(option.value);
  scrollToIndex(nextIndex);
}

function syncScrollPosition(): void {
  if (props.modelValue === lastEmitted) {
    lastEmitted = null;

    return;
  }

  scrollToIndex(selectedIndex());
}

watch(() => props.modelValue, () => nextTick(syncScrollPosition));
watch(() => props.options, () => nextTick(syncScrollPosition));

onMounted(() => nextTick(syncScrollPosition));
</script>

<style scoped>
.fz-time-wheel {
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  outline: none;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
}

.fz-time-wheel::-webkit-scrollbar {
  display: none;
}

.fz-time-wheel__item {
  scroll-snap-align: center;
  cursor: pointer;
  user-select: none;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.fz-time-wheel__item--active {
  color: rgb(var(--v-theme-on-surface));
  font-weight: 500;
}
</style>

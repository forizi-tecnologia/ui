<template>
  <div ref="listRef" class="fz-dp-years h-100 overflow-y-auto">
    <v-btn
      v-for="year in yearList"
      :key="year"
      :data-year="year"
      :variant="yearVariant(year)"
      :color="yearColor(year)"
      class="fz-dp-year-item text-none"
      block
      @click="select(year)"
    >
      {{ year }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

interface Props {
  yearList: number[];
  focusedYear: number;
  selectedIso: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [year: number];
}>();

const listRef = ref<HTMLElement | null>(null);

function yearVariant(year: number): 'flat' | 'text' {
  return year === props.focusedYear ? 'flat' : 'text';
}

function yearColor(year: number): string | undefined {
  return year === props.focusedYear ? 'primary' : undefined;
}

function select(year: number): void {
  emit('select', year);
}

function scrollToFocused(): void {
  const container = listRef.value;

  if (!container) return;

  const target = container.querySelector<HTMLElement>(`[data-year="${props.focusedYear}"]`);

  if (!target) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  container.scrollTop += targetRect.top - containerRect.top - container.clientHeight / 2 + target.clientHeight / 2;
}

onMounted(() => {
  nextTick(scrollToFocused);
});
</script>

<style scoped>
.fz-dp-years {
  scroll-snap-type: y proximity;
}

.fz-dp-year-item {
  scroll-snap-align: center;
}
</style>

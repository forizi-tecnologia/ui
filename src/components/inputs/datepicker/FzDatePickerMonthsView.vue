<template>
  <div class="fz-dp-months h-100">
    <v-btn
      v-for="(name, index) in monthNames"
      :key="index"
      :variant="monthVariant(index + 1)"
      :color="monthColor(index + 1)"
      class="text-none"
      @click="select(index + 1)"
    >
      {{ shortName(name) }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { parseIso } from '@/utils/date';

interface Props {
  monthNames: string[];
  focusedYear: number;
  selectedIso: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [month: number];
}>();

const selectedParts = computed(() => parseIso(props.selectedIso));

function isSelectedMonth(month: number): boolean {
  const parts = selectedParts.value;

  if (!parts) return false;

  return parts.year === props.focusedYear && parts.month === month;
}

function monthVariant(month: number): 'flat' | 'text' {
  return isSelectedMonth(month) ? 'flat' : 'text';
}

function monthColor(month: number): string | undefined {
  return isSelectedMonth(month) ? 'primary' : undefined;
}

function shortName(name: string): string {
  return name.slice(0, 3);
}

function select(month: number): void {
  emit('select', month);
}
</script>

<style scoped>
.fz-dp-months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
}

.fz-dp-months :deep(.v-btn) {
  width: 100%;
  height: 100%;
}
</style>

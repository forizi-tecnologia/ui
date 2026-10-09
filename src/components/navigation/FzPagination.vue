<template>
  <div class="d-flex align-center justify-center ga-2">
    <v-btn
      icon
      variant="text"
      size="small"
      :color="color"
      :disabled="isPrevDisabled"
      :aria-label="prevLabel"
      @click="goToPrevious"
    >
      <v-icon>{{ prevIcon }}</v-icon>
    </v-btn>

    <span class="text-body-2 text-medium-emphasis">
      <slot :page="modelValue" :length="length">
        {{ modelValue }} de {{ length }}
      </slot>
    </span>

    <v-btn
      icon
      variant="text"
      size="small"
      :color="color"
      :disabled="isNextDisabled"
      :aria-label="nextLabel"
      @click="goToNext"
    >
      <v-icon>{{ nextIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface FzPaginationProps {
  modelValue?: number;
  length: number;
  disabled?: boolean;
  color?: string;
  prevLabel?: string;
  nextLabel?: string;
  prevIcon?: string;
  nextIcon?: string;
}

const props = withDefaults(defineProps<FzPaginationProps>(), {
  modelValue: 1,
  disabled: false,
  color: undefined,
  prevLabel: 'Página anterior',
  nextLabel: 'Próxima página',
  prevIcon: 'mdi-chevron-left',
  nextIcon: 'mdi-chevron-right',
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const isPrevDisabled = computed(() => props.disabled || props.modelValue <= 1);

const isNextDisabled = computed(() => props.disabled || props.modelValue >= props.length);

function goToPrevious(): void {
  emit('update:modelValue', Math.max(props.modelValue - 1, 1));
}

function goToNext(): void {
  emit('update:modelValue', Math.min(props.modelValue + 1, props.length));
}
</script>

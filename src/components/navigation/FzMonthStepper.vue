<template>
  <div class="d-inline-flex align-center ga-1">
    <v-btn
      v-if="arrows"
      icon
      variant="text"
      size="small"
      :disabled="isPreviousDisabled"
      :aria-label="previousLabel"
      @click="handlePrevious"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <slot :label="label">
      <span class="text-subtitle-1 font-weight-medium">{{ label }}</span>
    </slot>

    <v-btn
      v-if="arrows"
      icon
      variant="text"
      size="small"
      :disabled="isNextDisabled"
      :aria-label="nextLabel"
      @click="handleNext"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useMonthPicker } from '@/composables/useMonthPicker';
import type { DateLocale } from '@/utils/date';

interface Props {
  modelValue?: string;
  locale?: DateLocale;
  min?: string | null;
  max?: string | null;
  disabled?: boolean;
  arrows?: boolean;
  allowFuture?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  locale: 'pt-BR',
  min: null,
  max: null,
  disabled: false,
  arrows: true,
  allowFuture: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { label, canGoPrevious, canGoNext, goPrevious, goNext } = useMonthPicker({
  modelValue: toRef(props, 'modelValue'),
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  locale: toRef(props, 'locale'),
  allowFuture: toRef(props, 'allowFuture'),
});

const isPreviousDisabled = computed(() => props.disabled || !canGoPrevious.value);

const isNextDisabled = computed(() => props.disabled || !canGoNext.value);

const previousLabel = computed(() => props.locale === 'en' ? 'Previous month' : 'Mês anterior');

const nextLabel = computed(() => props.locale === 'en' ? 'Next month' : 'Próximo mês');

function handlePrevious(): void {
  if (isPreviousDisabled.value) return;

  emit('update:modelValue', goPrevious());
}

function handleNext(): void {
  if (isNextDisabled.value) return;

  emit('update:modelValue', goNext());
}
</script>

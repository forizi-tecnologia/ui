<template>
  <v-text-field
    :model-value="formattedValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="persistentHint"
        :variant="resolvedVariant"
    inputmode="decimal"
    @update:model-value="handleInput"
    @focus="handleFocus"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue';
import { useNumericInput, createNumericKeydownHandler } from '@/composables/useNumericInput';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant } from '@/utils/types';

type ValidationRule = (value: string) => boolean | string;

interface Props {
  modelValue?: number | null
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  persistentHint?: boolean
  decimalPlaces?: number
  locale?: string
  allowNegative?: boolean
  variant?: TextFieldVariant
  max?: number
  min?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  label: '',
  rules: () => [],
  disabled: false,
  hint: '',
  persistentHint: false,
  decimalPlaces: 0,
  locale: 'pt-BR',
  allowNegative: true,
  variant: undefined,
  max: 999000000,
  min: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

const defaults = useFzDefaults();

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

function formatNumber(value: number): string {
  const absValue = Math.abs(value);

  const formatted = absValue.toLocaleString(props.locale, {
    minimumFractionDigits: props.decimalPlaces,
    maximumFractionDigits: props.decimalPlaces,
  });

  return value < 0 ? '-' + formatted : formatted;
}

function parseNumberInput(input: string): number {
  const isNegative = input.includes('-');
  const numbers = input.replace(/\D/g, '');

  if (!numbers) return 0;

  let value: number;

  if (props.decimalPlaces === 0) {
    value = parseInt(numbers);
  } else {
    const divisor = Math.pow(10, props.decimalPlaces);
    value = parseInt(numbers) / divisor;
  }

  const rounded = Number(value.toFixed(props.decimalPlaces));

  return isNegative && props.allowNegative ? -rounded : rounded;
}

const { formattedValue, moveCursorToEnd, handleInput, handleFocus, handleClick } = useNumericInput(
  toRef(props, 'modelValue'),
  (val: number) => emit('update:modelValue', val),
  formatNumber,
  parseNumberInput,
);

function updateValue(newValue: number) {
  if (props.max !== undefined && newValue > props.max) return;

  if (props.min !== undefined && newValue < props.min) return;

  emit('update:modelValue', newValue);
  formattedValue.value = formatNumber(newValue);
  moveCursorToEnd();
}

function computeFromDigits(digits: string, isNegative: boolean): number {
  if (!digits) return 0;

  let value: number;

  if (props.decimalPlaces === 0) {
    value = parseInt(digits);
  } else {
    const divisor = Math.pow(10, props.decimalPlaces);
    value = parseInt(digits) / divisor;
  }

  const result = Number(value.toFixed(props.decimalPlaces));

  return isNegative ? -result : result;
}

const handleKeydown = createNumericKeydownHandler(
  formattedValue,
  updateValue,
  computeFromDigits,
  () => ({ allowNegative: props.allowNegative }),
);
</script>

<style scoped>
:deep(input) {
  text-align: right;
}

:deep(input[type='number']::-webkit-inner-spin-button),
:deep(input[type='number']::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

:deep(input[type='number']) {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>

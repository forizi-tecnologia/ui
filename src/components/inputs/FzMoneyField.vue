<template>
  <v-text-field
    :model-value="formattedValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="persistentHint"
    :variant="variant"
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
import { toRef } from 'vue';
import { useNumericInput, createNumericKeydownHandler } from '@/composables/useNumericInput';
import type { TextFieldVariant } from '@/utils/types';

const NON_BREAKING_SPACE = '\u00a0';

type ValidationRule = (value: string) => boolean | string;

interface Props {
  modelValue?: number | null
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  persistentHint?: boolean
  currency?: string
  locale?: string
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
  currency: 'BRL',
  locale: 'pt-BR',
  variant: 'underlined',
  max: 999000000,
  min: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

function formatMoney(value: number): string {
  const absValue = Math.abs(value);

  try {
    const formatted = absValue.toLocaleString(props.locale, {
      style: 'currency',
      currency: props.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const normalized = formatted.split(NON_BREAKING_SPACE).join(' ');

    return value < 0 ? `-${normalized}` : normalized;
  } catch {
    const currencySymbol = props.currency;

    const formatted = absValue.toLocaleString(props.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return value < 0 ? `-${currencySymbol} ${formatted}` : `${currencySymbol} ${formatted}`;
  }
}

function parseMoneyInput(input: string): number {
  const isNegative = input.includes('-');
  const numbers = input.replace(/\D/g, '');

  if (!numbers) return 0;

  const value = parseInt(numbers) / 100;
  const rounded = Number((isNegative ? -value : value).toFixed(2));

  return rounded;
}

const { formattedValue, moveCursorToEnd, handleInput, handleFocus, handleClick } = useNumericInput(
  toRef(props, 'modelValue'),
  (val: number) => emit('update:modelValue', val),
  formatMoney,
  parseMoneyInput,
);

function updateValue(newValue: number) {
  if (props.max !== undefined && newValue > props.max) return;

  if (props.min !== undefined && newValue < props.min) return;

  emit('update:modelValue', newValue);
  formattedValue.value = formatMoney(newValue);
  moveCursorToEnd();
}

function computeFromDigits(digits: string, isNegative: boolean): number {
  const value = parseInt(digits || '0') / 100;

  return isNegative ? -value : value;
}

const handleKeydown = createNumericKeydownHandler(
  formattedValue,
  updateValue,
  computeFromDigits,
);
</script>

<style scoped>
:deep(input) {
  text-align: right;
}
</style>

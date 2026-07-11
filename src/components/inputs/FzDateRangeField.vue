<template>
  <v-row align="center">
    <v-col cols="12" sm>
      <FzDatePicker
        v-model="startModel"
        :label="labelStart"
        :rules="rules"
        :disabled="disabled"
        :hint="hint"
        :format="format"
        :locale="locale"
        :min="min"
        :max="max"
        :variant="resolvedVariant"
        :density="density"
        :required="required"
        :validate-on-blur="validateOnBlur"
        :required-message="requiredMessage"
        :invalid-message="invalidMessage"
      />
    </v-col>

    <v-col cols="12" sm="auto" class="px-0">
      <span class="text-body-2 text-medium-emphasis">{{ separator }}</span>
    </v-col>

    <v-col cols="12" sm>
      <FzDatePicker
        v-model="endModel"
        :label="labelEnd"
        :rules="endRules"
        :disabled="disabled"
        :hint="hint"
        :format="format"
        :locale="locale"
        :min="min"
        :max="max"
        :variant="resolvedVariant"
        :density="density"
        :required="required"
        :validate-on-blur="validateOnBlur"
        :required-message="requiredMessage"
        :invalid-message="invalidMessage"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFzDefaults } from '@/composables/useFzDefaults';
import { parseDisplay, toIso, type DateFormat, type DateLocale } from '@/utils/date';
import type { TextFieldVariant, TextFieldDensity } from '@/utils/types';
import FzDatePicker from '@/components/inputs/datepicker/FzDatePicker.vue';

type ValidationRule = (value: string) => boolean | string;

export interface DateRange {
  start: string | null;
  end: string | null;
}

interface Props {
  modelValue?: DateRange;
  labelStart?: string;
  labelEnd?: string;
  format?: DateFormat;
  locale?: DateLocale;
  disabled?: boolean;
  hint?: string;
  variant?: TextFieldVariant;
  density?: TextFieldDensity;
  min?: string | null;
  max?: string | null;
  separator?: string;
  rules?: ValidationRule[];
  required?: boolean;
  validateOnBlur?: boolean;
  requiredMessage?: string;
  invalidMessage?: string;
  rangeInvalidMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ start: null, end: null }),
  labelStart: 'Data inicial',
  labelEnd: 'Data final',
  format: 'dd/mm/yyyy',
  locale: 'pt-BR',
  disabled: false,
  hint: '',
  variant: undefined,
  density: undefined,
  min: null,
  max: null,
  separator: 'até',
  rules: () => [],
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  invalidMessage: '',
  rangeInvalidMessage: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: DateRange];
}>();

const defaults = useFzDefaults();

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const rangeValidationMessage = computed(() => props.rangeInvalidMessage || 'Data inicial não pode ser maior que a data final');

const startModel = computed({
  get: () => props.modelValue.start ?? '',
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, start: val || null });
  },
});

const endModel = computed({
  get: () => props.modelValue.end ?? '',
  set: (val: string) => {
    emit('update:modelValue', { ...props.modelValue, end: val || null });
  },
});

function validateDateRange(value: string): boolean | string {
  if (!startModel.value || !value) return true;

  const endParts = parseDisplay(value, props.format);

  if (!endParts) return true;

  const endIso = toIso(endParts);

  if (startModel.value > endIso) return rangeValidationMessage.value;

  return true;
}

const endRules = computed(() => [validateDateRange, ...props.rules]);
</script>

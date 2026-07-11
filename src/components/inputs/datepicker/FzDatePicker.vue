<template>
  <v-text-field
    v-maska="maskOptions"
    :model-value="displayText"
    :label="label"
    :placeholder="resolvedPlaceholder"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    inputmode="numeric"
    autocomplete="off"
    @update:focused="onFocusChange"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template #append-inner>
      <FzDatePickerCalendar
        v-model:open="isCalendarOpen"
        :selected="modelValue"
        :icon="icon"
        :disabled="disabled"
        :min="min"
        :max="max"
        :locale="locale"
        :width="width"
        :height="height"
        :today-label="todayLabel"
        @select="onSelect"
      />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { vMaska } from 'maska/vue';
import { useFzDefaults } from '@/composables/useFzDefaults';
import {
  formatDisplay,
  isWithinRange,
  maskForFormat,
  parseDisplay,
  toIso,
  type DateFormat,
  type DateLocale,
} from '@/utils/date';
import type { TextFieldVariant, TextFieldDensity } from '@/utils/types';
import FzDatePickerCalendar from './FzDatePickerCalendar.vue';

type ValidationRule = (value: string) => boolean | string;

type MaskaDetail = { masked: string; unmasked: string; completed: boolean };

interface Props {
  modelValue?: string;
  format?: DateFormat;
  locale?: DateLocale;
  label?: string;
  placeholder?: string;
  rules?: ValidationRule[];
  disabled?: boolean;
  hint?: string;
  required?: boolean;
  validateOnBlur?: boolean;
  requiredMessage?: string;
  invalidMessage?: string;
  variant?: TextFieldVariant;
  density?: TextFieldDensity;
  min?: string | null;
  max?: string | null;
  icon?: string;
  todayLabel?: string;
  width?: string | number;
  height?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  format: 'dd/mm/yyyy',
  locale: 'pt-BR',
  label: 'Data',
  placeholder: '',
  rules: () => [],
  disabled: false,
  hint: '',
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  invalidMessage: '',
  variant: undefined,
  density: undefined,
  min: null,
  max: null,
  icon: 'mdi-calendar',
  todayLabel: '',
  width: 400,
  height: 400,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  isValid: [value: boolean];
}>();

const defaults = useFzDefaults();

const displayText = ref(formatDisplay(props.modelValue ?? '', props.format));
const isCalendarOpen = ref(false);
const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;

  if (props.format === 'yyyy-mm-dd') return props.format;

  return props.locale === 'pt-BR' ? props.format.replace('yyyy', 'aaaa') : props.format;
});

const mergedRules = computed(() => [validateDate, ...props.rules]);

const maskOptions = computed(() => ({
  mask: maskForFormat(props.format),
  eager: true,
  onMaska: (detail: MaskaDetail) => onInput(detail.masked),
}));

function validateDate(value: string): boolean | string {
  if (!value) return props.required ? props.requiredMessage || 'Data é obrigatória' : true;

  const parts = parseDisplay(value, props.format);

  if (!parts) return props.invalidMessage || 'Data inválida';

  if (!isWithinRange(toIso(parts), props.min, props.max)) return props.invalidMessage || 'Data inválida';

  return true;
}

function resolveValidation(): void {
  isValid.value = validateDate(displayText.value) === true;

  emit('isValid', isValid.value);
}

function commit(value: string): void {
  emit('update:modelValue', value);

  if (!props.validateOnBlur) resolveValidation();
}

function onInput(masked: string): void {
  displayText.value = masked;

  const parts = parseDisplay(masked, props.format);

  if (!parts) {
    commit('');

    return;
  }

  const iso = toIso(parts);

  if (!isWithinRange(iso, props.min, props.max)) {
    commit('');

    return;
  }

  commit(iso);
}

function onFocusChange(focused: boolean): void {
  if (focused) return;

  if (!props.validateOnBlur) return;

  resolveValidation();
}

function onSelect(iso: string): void {
  displayText.value = formatDisplay(iso, props.format);
  isCalendarOpen.value = false;
  isValid.value = true;

  emit('update:modelValue', iso);
  emit('isValid', true);
}

watch(
  () => [props.modelValue, props.format] as const,
  () => {
    const currentParts = parseDisplay(displayText.value, props.format);
    const currentIso = currentParts ? toIso(currentParts) : '';

    if (currentIso === (props.modelValue ?? '')) return;

    displayText.value = formatDisplay(props.modelValue ?? '', props.format);
  },
);
</script>

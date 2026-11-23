<template>
  <v-text-field
    :model-value="displayText"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :required="required"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :hide-details="resolvedHideDetails"
    :style="fieldStyle"
    readonly
    autocomplete="off"
    @update:focused="handleFocusChange"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template #append-inner>
      <FzMonthPickerMenu
        v-model:open="isMenuOpen"
        :selected="modelValue"
        :min="min"
        :max="max"
        :locale="locale"
        :disabled="disabled"
        :location="menuLocation"
        :origin="resolvedMenuOrigin"
        @select="onSelect"
      />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFzDefaults } from '@/composables/useFzDefaults';
import { formatMonth, type MonthFormat } from '@/composables/useMonthPicker';
import type { TextFieldVariant, TextFieldDensity, MenuAnchor, MenuOrigin, HideDetails } from '@/utils/types';
import type { DateLocale } from '@/utils/date';
import FzMonthPickerMenu from './FzMonthPickerMenu.vue';

type ValidationRule = (value: string) => boolean | string;

interface Props {
  modelValue?: string;
  label?: string;
  locale?: DateLocale;
  format?: MonthFormat;
  min?: string | null;
  max?: string | null;
  disabled?: boolean;
  required?: boolean;
  validateOnBlur?: boolean;
  requiredMessage?: string;
  rules?: ValidationRule[];
  variant?: TextFieldVariant;
  density?: TextFieldDensity;
  hideDetails?: HideDetails;
  fieldWidth?: string;
  menuLocation?: MenuAnchor;
  menuOrigin?: MenuOrigin;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'Mês',
  locale: 'pt-BR',
  format: 'mm/yyyy',
  min: null,
  max: null,
  disabled: false,
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  rules: () => [],
  variant: undefined,
  density: undefined,
  hideDetails: undefined,
  fieldWidth: '160px',
  menuLocation: 'top right',
  menuOrigin: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  isValid: [value: boolean];
}>();

const defaults = useFzDefaults();

const isMenuOpen = ref(false);
const isValid = ref(false);

let hasValidated = false;

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const resolvedMenuOrigin = computed<MenuOrigin>(() => props.menuOrigin ?? 'auto');

const fieldStyle = computed(() => ({ width: props.fieldWidth }));

const displayText = computed(() => formatMonth(props.modelValue, props.format));

const requiredMessage = computed(() => {
  if (props.requiredMessage) return props.requiredMessage;

  if (props.label) return `${props.label} é obrigatório`;

  return 'Campo obrigatório';
});

const mergedRules = computed(() => [validateRequired, ...props.rules]);

function validateRequired(value: string): boolean | string {
  if (!props.required) return true;

  if (value) return true;

  return requiredMessage.value;
}

function isValueValid(value: string): boolean {
  return mergedRules.value.every((rule) => rule(value) === true);
}

function resolveValidation(value: string): void {
  const valid = isValueValid(value);

  if (hasValidated && valid === isValid.value) return;

  hasValidated = true;
  isValid.value = valid;
  emit('isValid', valid);
}

function handleFocusChange(focused: boolean): void {
  if (focused) return;

  if (!props.validateOnBlur) return;

  resolveValidation(displayText.value);
}

function onSelect(value: string): void {
  emit('update:modelValue', value);

  resolveValidation(formatMonth(value, props.format));
}
</script>

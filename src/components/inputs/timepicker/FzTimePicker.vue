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
    :hide-details="resolvedHideDetails"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :style="fieldStyle"
    inputmode="numeric"
    autocomplete="off"
    @update:focused="onFocusChange"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template #append-inner>
      <FzTimePickerMenu
        v-model:open="isMenuOpen"
        :selected="modelValue"
        :use-24-hour="use24Hour"
        :minute-step="minuteStep"
        :icon="icon"
        :disabled="disabled"
        :width="width"
        :height="height"
        :item-height="itemHeight"
        :location="menuLocation"
        :origin="resolvedMenuOrigin"
        :hour-label="hourLabel"
        :minute-label="minuteLabel"
        :meridiem-label="meridiemLabel"
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
  maskForTime,
  parseDisplay,
  toCanonical,
} from '@/utils/time';
import type { TextFieldVariant, TextFieldDensity, MenuAnchor, MenuOrigin, HideDetails } from '@/utils/types';
import FzTimePickerMenu from './FzTimePickerMenu.vue';

type ValidationRule = (value: string) => boolean | string;

type MaskaDetail = { masked: string; unmasked: string; completed: boolean };

const MERIDIEM_TOKENS = {
  A: {
    pattern: /[AaPp]/,
    transform: (character: string) => character.toUpperCase(),
  },
  M: {
    pattern: /[Mm]/,
    transform: (character: string) => character.toUpperCase(),
  },
};

interface Props {
  modelValue?: string;
  use24Hour?: boolean;
  minuteStep?: number;
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
  hideDetails?: HideDetails;
  fieldWidth?: string;
  icon?: string;
  width?: string | number;
  height?: number;
  itemHeight?: number;
  menuLocation?: MenuAnchor;
  menuOrigin?: MenuOrigin;
  hourLabel?: string;
  minuteLabel?: string;
  meridiemLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  use24Hour: true,
  minuteStep: 1,
  label: 'Hora',
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
  hideDetails: undefined,
  fieldWidth: '160px',
  icon: 'mdi-clock-outline',
  width: undefined,
  height: 160,
  itemHeight: 32,
  menuLocation: 'top right',
  menuOrigin: undefined,
  hourLabel: '',
  minuteLabel: '',
  meridiemLabel: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  isValid: [value: boolean];
}>();

const defaults = useFzDefaults();

const displayText = ref(formatDisplay(props.modelValue ?? '', props.use24Hour));
const isMenuOpen = ref(false);
const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const resolvedMenuOrigin = computed<MenuOrigin>(() => props.menuOrigin ?? 'auto');

const fieldStyle = computed(() => ({ width: props.fieldWidth }));

const resolvedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;

  return props.use24Hour ? 'hh:mm' : 'hh:mm AM/PM';
});

const mergedRules = computed(() => [validateTime, ...props.rules]);

const maskOptions = computed(() => ({
  mask: maskForTime(props.use24Hour),
  tokens: props.use24Hour ? undefined : MERIDIEM_TOKENS,
  eager: true,
  onMaska: (detail: MaskaDetail) => onInput(detail.masked),
}));

function validateTime(value: string): boolean | string {
  if (!value) return props.required ? props.requiredMessage || 'Hora é obrigatória' : true;

  if (!parseDisplay(value, props.use24Hour)) return props.invalidMessage || 'Hora inválida';

  return true;
}

function resolveValidation(): void {
  isValid.value = validateTime(displayText.value) === true;

  emit('isValid', isValid.value);
}

function commit(value: string): void {
  emit('update:modelValue', value);

  if (!props.validateOnBlur) resolveValidation();
}

function onInput(masked: string): void {
  displayText.value = masked;

  const parts = parseDisplay(masked, props.use24Hour);

  if (!parts) {
    commit('');

    return;
  }

  commit(toCanonical(parts));
}

function onFocusChange(focused: boolean): void {
  if (focused) return;

  if (!props.validateOnBlur) return;

  resolveValidation();
}

function onSelect(value: string): void {
  displayText.value = formatDisplay(value, props.use24Hour);
  isValid.value = true;

  emit('update:modelValue', value);
  emit('isValid', true);
}

watch(
  () => [props.modelValue, props.use24Hour] as const,
  () => {
    const currentParts = parseDisplay(displayText.value, props.use24Hour);
    const currentCanonical = currentParts ? toCanonical(currentParts) : '';

    if (currentCanonical === (props.modelValue ?? '')) return;

    displayText.value = formatDisplay(props.modelValue ?? '', props.use24Hour);
  },
);
</script>

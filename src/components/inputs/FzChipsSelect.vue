<template>
  <v-autocomplete
    :class="fieldClass"
    :model-value="modelValue"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :hide-details="resolvedHideDetails"
    multiple
    chips
    closable-chips
    :hide-selected="hideSelected"
    :clear-on-select="clearOnSelect"
    :no-data-text="noDataText"
    :validate-on="validateOnBlur ? 'blur' : 'input'"
    @update:model-value="onUpdate"
    @blur="handleBlur"
  >
    <template #chip="{ item, index, props: chipProps }">
      <v-chip
        v-if="isVisibleChip(index)"
        v-bind="chipProps"
        :text="item.title"
        :color="chipColor"
        :variant="chipVariant"
      />

      <v-chip
        v-else-if="isOverflowChip(index)"
        :color="chipColor"
        :variant="chipVariant"
        :closable="false"
      >
        {{ overflowText }}
      </v-chip>
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant, TextFieldDensity, HideDetails } from '@/utils/types';

type ValidationRule = (value: unknown) => boolean | string;

type ChipVariant = 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';

export type ChipsSelectItem = string | number | Record<string, unknown>;

interface Props {
  modelValue?: (string | number)[]
  items?: ChipsSelectItem[]
  itemTitle?: string
  itemValue?: string
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  required?: boolean
  validateOnBlur?: boolean
  requiredMessage?: string
  variant?: TextFieldVariant
  density?: TextFieldDensity
  maxVisibleChips?: number
  hideSelected?: boolean
  clearOnSelect?: boolean
  noDataText?: string
  chipColor?: string
  chipVariant?: ChipVariant
  hideDetails?: HideDetails
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  items: () => [],
  itemTitle: 'title',
  itemValue: 'value',
  label: '',
  rules: () => [],
  disabled: false,
  hint: '',
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  variant: undefined,
  density: undefined,
  maxVisibleChips: undefined,
  hideSelected: true,
  clearOnSelect: true,
  noDataText: 'Nenhum item encontrado',
  chipColor: 'primary',
  chipVariant: 'tonal',
  hideDetails: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  isValid: [value: boolean]
}>();

const defaults = useFzDefaults();

const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const maxVisibleCount = computed(() => props.maxVisibleChips ?? Infinity);

const hiddenCount = computed(() => Math.max(props.modelValue.length - maxVisibleCount.value, 0));

const overflowText = computed(() => `+${hiddenCount.value}`);

const fieldClass = computed(() => resolvedVariant.value === 'outlined' ? undefined : 'fz-chips-select--padded');

const mergedRules = computed(() => [validateRequired, ...props.rules]);

function validateRequired(value: unknown): boolean | string {
  if (!props.required) return true;

  if (Array.isArray(value) && value.length > 0) return true;

  return props.requiredMessage || 'Selecione ao menos um item';
}

function isVisibleChip(index: number): boolean {
  return index < maxVisibleCount.value;
}

function isOverflowChip(index: number): boolean {
  return index === maxVisibleCount.value;
}

function resolveValidation(value: (string | number)[]) {
  isValid.value = validateRequired(value) === true;
  emit('isValid', isValid.value);
}

function onUpdate(value: (string | number)[]) {
  emit('update:modelValue', value);

  if (!props.validateOnBlur) resolveValidation(value);
}

function handleBlur() {
  if (!props.validateOnBlur) return;

  resolveValidation(props.modelValue);
}
</script>

<style scoped>
.fz-chips-select--padded :deep(.v-field__input) {
  padding-bottom: calc(var(--v-field-input-padding-bottom) + 4px);
}
</style>

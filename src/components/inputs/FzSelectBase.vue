<template>
  <component
    :is="resolvedComponent"
    :model-value="modelValue"
    :items="resolvedItems"
    :item-title="itemTitle"
    :item-value="itemValue"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="persistentHint"
    :required="required"
    :clearable="clearable"
    :multiple="multiple"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :hide-details="resolvedHideDetails"
    :validate-on="validateOnBlur ? 'blur' : 'input'"
    @update:model-value="onUpdate"
    @blur="handleBlur"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { VAutocomplete, VSelect } from 'vuetify/components';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { FzSelectBaseProps, SelectModelValue } from './selectField';

const props = withDefaults(defineProps<FzSelectBaseProps>(), {
  modelValue: null,
  label: '',
  items: () => [],
  itemTitle: 'title',
  itemValue: 'value',
  rules: () => [],
  disabled: false,
  hint: '',
  persistentHint: false,
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  variant: undefined,
  density: undefined,
  hideDetails: undefined,
  clearable: false,
  multiple: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: SelectModelValue];
  isValid: [value: boolean];
}>();

const defaults = useFzDefaults();

const slots = useSlots();

const isValid = ref(false);

let hasValidated = false;

const resolvedComponent = computed(() => props.component === 'autocomplete' ? VAutocomplete : VSelect);

const resolvedItems = computed<unknown[]>(() => [...props.items]);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const resolvedRequiredMessage = computed(() => {
  if (props.requiredMessage) return props.requiredMessage;

  if (props.label) return `${props.label} é obrigatório`;

  return 'Campo obrigatório';
});

const mergedRules = computed(() => [validateRequired, ...props.rules]);

const forwardedSlots = computed(() =>
  Object.fromEntries(
    Object.entries(slots).filter(([slotName]) => slotName !== 'prepend' && slotName !== 'append'),
  ),
);

function isEmptyValue(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;

  return value === null || value === undefined || value === '';
}

function validateRequired(value: unknown): boolean | string {
  if (!props.required) return true;

  if (!isEmptyValue(value)) return true;

  return resolvedRequiredMessage.value;
}

function isValueValid(value: SelectModelValue): boolean {
  return mergedRules.value.every((rule) => rule(value) === true);
}

function resolveValidation(value: SelectModelValue): void {
  const valid = isValueValid(value);

  if (hasValidated && valid === isValid.value) return;

  hasValidated = true;
  isValid.value = valid;
  emit('isValid', valid);
}

function onUpdate(value: SelectModelValue): void {
  emit('update:modelValue', value);

  if (!props.validateOnBlur) resolveValidation(value);
}

function handleBlur(): void {
  if (!props.validateOnBlur) return;

  resolveValidation(props.modelValue ?? null);
}
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :type="inputType"
    :maxlength="maxlength"
    :autocomplete="autocomplete"
    @update:model-value="onUpdate"
    @blur="handleBlur"
  >
    <template #append-inner>
      <v-icon
        :icon="passwordIcon"
        :tabindex="toggleTabindex"
        :role="toggleFocusable ? 'button' : undefined"
        :aria-label="toggleFocusable ? passwordLabel : undefined"
        :aria-hidden="!toggleFocusable"
        @click="toggleVisibility"
        @keydown="handleToggleKeydown"
      />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant, TextFieldDensity } from '@/utils/types';

type ValidationRule = (value: string) => boolean | string;

interface Props {
  modelValue?: string
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  required?: boolean
  validateOnBlur?: boolean
  requiredMessage?: string
  minlength?: number
  minlengthMessage?: string
  variant?: TextFieldVariant
  density?: TextFieldDensity
  maxlength?: number
  autocomplete?: string
  showIcon?: string
  hideIcon?: string
  toggleFocusable?: boolean
  showLabel?: string
  hideLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'Senha',
  rules: () => [],
  disabled: false,
  hint: '',
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  minlength: 0,
  minlengthMessage: '',
  variant: undefined,
  density: undefined,
  maxlength: undefined,
  autocomplete: 'current-password',
  showIcon: 'mdi-eye-outline',
  hideIcon: 'mdi-eye-off-outline',
  toggleFocusable: false,
  showLabel: 'Mostrar senha',
  hideLabel: 'Ocultar senha',
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  isValid: [value: boolean]
}>();

const defaults = useFzDefaults();

const isVisible = ref(false);

const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const inputType = computed(() => isVisible.value ? 'text' : 'password');

const passwordIcon = computed(() => isVisible.value ? props.hideIcon : props.showIcon);

const passwordLabel = computed(() => isVisible.value ? props.hideLabel : props.showLabel);

const toggleTabindex = computed(() => props.toggleFocusable ? 0 : -1);

const mergedRules = computed(() => [validateRequired, validateMinlength, ...props.rules]);

function validateRequired(value: string): boolean | string {
  if (!value) return props.required ? (props.requiredMessage || 'Senha é obrigatória') : true;

  return true;
}

function validateMinlength(value: string): boolean | string {
  if (!value) return true;

  if (props.minlength > 0 && value.length < props.minlength) {
    return props.minlengthMessage || `Senha deve ter ao menos ${props.minlength} caracteres`;
  }

  return true;
}

function resolveValidation(value: string) {
  isValid.value = validateRequired(value) === true && validateMinlength(value) === true;
  emit('isValid', isValid.value);
}

function toggleVisibility() {
  isVisible.value = !isVisible.value;
}

function handleToggleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  event.preventDefault();
  toggleVisibility();
}

function onUpdate(value: string) {
  emit('update:modelValue', value);

  if (!props.validateOnBlur) resolveValidation(value);
}

function handleBlur() {
  if (!props.validateOnBlur) return;

  resolveValidation(props.modelValue);
}
</script>

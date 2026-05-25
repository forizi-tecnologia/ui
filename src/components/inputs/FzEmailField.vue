<template>
  <v-text-field
    v-model="innerValue"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
    :required="required"
    :variant="variant"
    :maxlength="maxlength"
    type="email"
    inputmode="email"
    autocomplete="email"
    @blur="handleBlur"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="!$slots.prepend" #prepend-inner>
      <v-icon :color="iconColor">
        {{ emailIcon }}
      </v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TextFieldVariant } from '@/utils/types';

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
  invalidMessage?: string
  variant?: TextFieldVariant
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'Email',
  rules: () => [],
  disabled: false,
  hint: '',
  required: false,
  validateOnBlur: true,
  requiredMessage: '',
  invalidMessage: '',
  variant: 'underlined',
  maxlength: 100,
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  isValid: [value: boolean]
}>();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const emailIcon = computed(() => isValid.value ? 'mdi-email-check' : 'mdi-email-outline');

const iconColor = computed(() => isValid.value ? 'success' : undefined);

const innerValue = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    if (!props.validateOnBlur) resolveValidation(val);

    emit('update:modelValue', val);
  },
});

const mergedRules = computed(() => [validateEmail, ...props.rules]);

function validateEmail(value: string): boolean | string {
  if (!value) return props.required ? (props.requiredMessage || 'Email é obrigatório') : true;

  if (!emailRegex.test(value)) return props.invalidMessage || 'Formato de e-mail inválido';

  return true;
}

function resolveValidation(value: string) {
  const result = validateEmail(value);
  isValid.value = result === true;
  emit('isValid', isValid.value);
}

function handleBlur() {
  if (!props.validateOnBlur) return;

  resolveValidation(innerValue.value);
}
</script>

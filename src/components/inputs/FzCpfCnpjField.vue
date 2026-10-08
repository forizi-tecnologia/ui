<template>
  <v-text-field
    v-maska="maskOptions"
    :model-value="displayValue"
    :label="label"
    :rules="mergedRules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
    :variant="resolvedVariant"
    :density="resolvedDensity"
    :hide-details="resolvedHideDetails"
    inputmode="text"
    autocomplete="off"
    @blur="handleBlur"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="!$slots.prepend" #prepend-inner>
      <v-icon :color="iconColor">{{ documentIcon }}</v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { vMaska } from 'maska/vue';
import { Mask } from 'maska';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant, TextFieldDensity, HideDetails } from '@/utils/types';
import { detectDocumentType, isValidCpfCnpj, normalizeDocument } from '@/utils/document';

type ValidationRule = (value: string) => boolean | string;

type MaskaDetail = { masked: string; unmasked: string; completed: boolean };

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
  density?: TextFieldDensity
  hideDetails?: HideDetails
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'CPF/CNPJ',
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
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  isValid: [value: boolean]
}>();

const CPF_MASK = '###.###.###-##';
const CNPJ_MASK = '**.***.***/****-##';

const DOCUMENT_TOKENS = {
  '*': {
    pattern: /[a-zA-Z0-9]/,
    transform: (character: string) => character.toUpperCase(),
  },
};

function resolveMask(value: string): string {
  return detectDocumentType(value) === 'cnpj' ? CNPJ_MASK : CPF_MASK;
}

const documentMask = new Mask({
  mask: resolveMask,
  tokens: DOCUMENT_TOKENS,
  eager: true,
});

const defaults = useFzDefaults();

const isValid = ref(false);

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedDensity = computed(() => props.density ?? defaults.density ?? 'comfortable');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const displayValue = computed(() => documentMask.masked(normalizeDocument(props.modelValue ?? '')));

const documentIcon = computed(() => isValid.value ? 'mdi-card-account-details' : 'mdi-card-account-details-outline');

const iconColor = computed(() => isValid.value ? 'success' : undefined);

const mergedRules = computed(() => [validateDocument, ...props.rules]);

const maskOptions = {
  mask: resolveMask,
  tokens: DOCUMENT_TOKENS,
  eager: true,
  onMaska: (detail: MaskaDetail) => {
    if (!props.validateOnBlur) resolveValidation(detail.unmasked);

    emit('update:modelValue', detail.unmasked);
  },
};

function validateDocument(value: string): boolean | string {
  const normalized = normalizeDocument(value);

  if (!normalized) return props.required ? (props.requiredMessage || 'CPF/CNPJ é obrigatório') : true;

  if (!isValidCpfCnpj(normalized)) return props.invalidMessage || 'CPF/CNPJ inválido';

  return true;
}

function resolveValidation(value: string) {
  isValid.value = validateDocument(value) === true;
  emit('isValid', isValid.value);
}

function handleBlur() {
  if (!props.validateOnBlur) return;

  resolveValidation(props.modelValue);
}
</script>

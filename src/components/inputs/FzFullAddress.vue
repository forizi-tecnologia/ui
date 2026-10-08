<template>
  <v-row>
    <v-col cols="12" sm="4">
      <FzZipCodeField
        v-model="internal.zipCode"
        :disabled="disabled"
        :rules="fieldRules.zipCode"
        :maxlength="maxLengths.zipCode"
        :hide-details="resolvedHideDetails"
        @zip-code-found="onZipCodeFound"
        @zip-code-not-found="onZipCodeNotFound"
      />
    </v-col>

    <v-col cols="12" sm="8">
      <v-text-field
        v-model="internal.street"
        :label="labels.street"
        :rules="fieldRules.street"
        :maxlength="maxLengths.street"
        :counter="counter"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>

    <v-col cols="12" sm="3">
      <v-text-field
        v-model="internal.number"
        :label="labels.number"
        :rules="fieldRules.number"
        :maxlength="maxLengths.number"
        :counter="counter"
        :disabled="disabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>

    <v-col cols="12" sm="5">
      <v-text-field
        v-model="internal.complement"
        :label="labels.complement"
        :rules="fieldRules.complement"
        :maxlength="maxLengths.complement"
        :counter="counter"
        :disabled="disabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>

    <v-col cols="12" sm="4">
      <v-text-field
        v-model="internal.neighborhood"
        :label="labels.neighborhood"
        :rules="fieldRules.neighborhood"
        :maxlength="maxLengths.neighborhood"
        :counter="counter"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>

    <v-col cols="12" sm="8">
      <v-text-field
        v-model="internal.city"
        :label="labels.city"
        :rules="fieldRules.city"
        :maxlength="maxLengths.city"
        :counter="counter"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>

    <v-col cols="12" sm="4">
      <v-select
        v-model="internal.state"
        :label="labels.state"
        :items="brazilianStates"
        item-title="name"
        item-value="uf"
        :rules="fieldRules.state"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
        :hide-details="resolvedHideDetails"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue';
import type { TextFieldVariant, HideDetails } from '@/utils/types';
import { useFzDefaults } from '@/composables/useFzDefaults';
import FzZipCodeField, { type ZipCodeResponse } from './FzZipCodeField.vue';

type ValidationRule = (value: string) => boolean | string;

export interface Address {
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export interface AddressLabels {
  zipCode?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}

export interface AddressRules {
  zipCode?: ValidationRule[]
  street?: ValidationRule[]
  number?: ValidationRule[]
  complement?: ValidationRule[]
  neighborhood?: ValidationRule[]
  city?: ValidationRule[]
  state?: ValidationRule[]
}

export interface AddressMaxLengths {
  zipCode?: number
  street?: number
  number?: number
  complement?: number
  neighborhood?: number
  city?: number
  state?: number
}

interface Props {
  modelValue?: Partial<Address>
  disabled?: boolean
  disabledFields?: boolean
  labels?: AddressLabels
  rules?: AddressRules
  maxlength?: AddressMaxLengths
  counter?: boolean
  required?: boolean
  requiredMessage?: string
  variant?: TextFieldVariant
  hideDetails?: HideDetails
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  disabled: false,
  disabledFields: false,
  labels: () => ({}),
  rules: () => ({}),
  maxlength: () => ({}),
  counter: false,
  required: false,
  requiredMessage: '',
  variant: undefined,
  hideDetails: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: Address]
}>();

const DEFAULT_MAX_LENGTHS: Required<AddressMaxLengths> = {
  zipCode: 9,
  street: 200,
  number: 20,
  complement: 100,
  neighborhood: 100,
  city: 100,
  state: 2,
};

const REQUIRED_FIELDS: (keyof Address)[] = [
  'zipCode',
  'street',
  'number',
  'neighborhood',
  'city',
  'state',
];

let skipInternalEmit = false;

const brazilianStates = [
  { uf: 'AC', name: 'AC - Acre' },
  { uf: 'AL', name: 'AL - Alagoas' },
  { uf: 'AP', name: 'AP - Amapá' },
  { uf: 'AM', name: 'AM - Amazonas' },
  { uf: 'BA', name: 'BA - Bahia' },
  { uf: 'CE', name: 'CE - Ceará' },
  { uf: 'DF', name: 'DF - Distrito Federal' },
  { uf: 'ES', name: 'ES - Espírito Santo' },
  { uf: 'GO', name: 'GO - Goiás' },
  { uf: 'MA', name: 'MA - Maranhão' },
  { uf: 'MT', name: 'MT - Mato Grosso' },
  { uf: 'MS', name: 'MS - Mato Grosso do Sul' },
  { uf: 'MG', name: 'MG - Minas Gerais' },
  { uf: 'PA', name: 'PA - Pará' },
  { uf: 'PB', name: 'PB - Paraíba' },
  { uf: 'PR', name: 'PR - Paraná' },
  { uf: 'PE', name: 'PE - Pernambuco' },
  { uf: 'PI', name: 'PI - Piauí' },
  { uf: 'RJ', name: 'RJ - Rio de Janeiro' },
  { uf: 'RN', name: 'RN - Rio Grande do Norte' },
  { uf: 'RS', name: 'RS - Rio Grande do Sul' },
  { uf: 'RO', name: 'RO - Rondônia' },
  { uf: 'RR', name: 'RR - Roraima' },
  { uf: 'SC', name: 'SC - Santa Catarina' },
  { uf: 'SP', name: 'SP - São Paulo' },
  { uf: 'SE', name: 'SE - Sergipe' },
  { uf: 'TO', name: 'TO - Tocantins' },
];

const internal = reactive<Address>({
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  ...props.modelValue,
});

const zipCodeFound = ref(false);

const labels = computed(() => ({
  zipCode: props.labels.zipCode ?? 'CEP',
  street: props.labels.street ?? 'Logradouro',
  number: props.labels.number ?? 'Número',
  complement: props.labels.complement ?? 'Complemento',
  neighborhood: props.labels.neighborhood ?? 'Bairro',
  city: props.labels.city ?? 'Cidade',
  state: props.labels.state ?? 'Estado',
}));

const defaults = useFzDefaults();

const isAutoDisabled = computed(() => props.disabled || (props.disabledFields && zipCodeFound.value));

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const resolvedHideDetails = computed(() => props.hideDetails ?? defaults.hideDetails ?? 'auto');

const maxLengths = computed<Required<AddressMaxLengths>>(() => ({
  ...DEFAULT_MAX_LENGTHS,
  ...props.maxlength,
}));

const fieldRules = computed<Record<keyof Address, ValidationRule[]>>(() => ({
  zipCode: resolveRules('zipCode'),
  street: resolveRules('street'),
  number: resolveRules('number'),
  complement: resolveRules('complement'),
  neighborhood: resolveRules('neighborhood'),
  city: resolveRules('city'),
  state: resolveRules('state'),
}));

function resolveRules(field: keyof Address): ValidationRule[] {
  const customRules = props.rules[field] ?? [];

  if (!props.required) return customRules;

  if (!REQUIRED_FIELDS.includes(field)) return customRules;

  return [buildRequiredRule(labels.value[field]), ...customRules];
}

function buildRequiredRule(label: string): ValidationRule {
  return (value: string) => value ? true : (props.requiredMessage || `${label} é obrigatório`);
}

function onZipCodeFound(data: ZipCodeResponse) {
  internal.street = data.street;
  internal.neighborhood = data.neighborhood;
  internal.city = data.city;
  internal.state = data.state;
  zipCodeFound.value = true;
}

function onZipCodeNotFound() {
  zipCodeFound.value = false;
}

watch(() => props.modelValue, (val) => {
  skipInternalEmit = true;

  Object.assign(internal, val);

  nextTick(() => {
    skipInternalEmit = false;
  });
}, { deep: true, immediate: true });

watch(internal, (val) => {
  if (skipInternalEmit) return;

  emit('update:modelValue', { ...val });
}, { deep: true });
</script>

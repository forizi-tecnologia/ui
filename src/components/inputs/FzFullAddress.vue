<template>
  <v-row>
    <v-col cols="12" md="4">
      <FzZipCodeField
        v-model="internal.zipCode"
        :disabled="disabled"
        @zip-code-found="onZipCodeFound"
        @zip-code-not-found="onZipCodeNotFound"
      />
    </v-col>

    <v-col cols="12" md="8">
      <v-text-field
        v-model="internal.street"
        :label="labels.street"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
      />
    </v-col>

    <v-col cols="12" md="3">
      <v-text-field v-model="internal.number" :label="labels.number" :disabled="disabled" :variant="variant" />
    </v-col>

    <v-col cols="12" md="5">
      <v-text-field v-model="internal.complement" :label="labels.complement" :disabled="disabled" :variant="variant" />
    </v-col>

    <v-col cols="12" md="4">
      <v-text-field
        v-model="internal.neighborhood"
        :label="labels.neighborhood"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
      />
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        v-model="internal.city"
        :label="labels.city"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
      />
    </v-col>

    <v-col cols="12" md="6">
      <v-select
        v-model="internal.state"
        :label="labels.state"
        :items="brazilianStates"
        item-title="name"
        item-value="uf"
        :disabled="isAutoDisabled"
        :variant="resolvedVariant"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick } from 'vue';
import type { TextFieldVariant } from '@/utils/types';
import { useFzDefaults } from '@/composables/useFzDefaults';
import FzZipCodeField, { type ZipCodeResponse } from './FzZipCodeField.vue';

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

interface Props {
  modelValue?: Partial<Address>
  disabled?: boolean
  disabledFields?: boolean
  labels?: AddressLabels
  variant?: TextFieldVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  disabled: false,
  disabledFields: false,
  labels: () => ({}),
  variant: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: Address]
}>();

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

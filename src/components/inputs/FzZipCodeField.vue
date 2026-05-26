<template>
  <v-text-field
    v-maska="maskOptions"
    :model-value="displayValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hasHint"
        :variant="resolvedVariant"
    :loading="isSearching"
    inputmode="numeric"
  >
    <template #prepend-inner>
      <v-icon>mdi-map-marker-outline</v-icon>
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
import { ref, computed, onBeforeUnmount } from 'vue';
import { vMaska } from 'maska/vue';
import { Mask } from 'maska';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant } from '@/utils/types';

type ValidationRule = (value: string) => boolean | string;

export interface ZipCodeResponse {
  zipCode: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  error?: boolean;
}

interface ViaCepApiResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface Props {
  modelValue?: string
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  variant?: TextFieldVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'CEP',
  rules: () => [],
  disabled: false,
  hint: '',
  variant: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'zip-code-found': [address: ZipCodeResponse]
  'zip-code-not-found': []
}>();

const isSearching = ref(false);
let abortController: AbortController | null = null;

const mask = new Mask({ mask: '#####-###', eager: true });

const displayValue = computed(() => mask.masked(props.modelValue ?? ''));

const defaults = useFzDefaults();

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');



function mapResponse(data: ViaCepApiResponse): ZipCodeResponse {
  return {
    zipCode: data.cep ?? '',
    street: data.logradouro ?? '',
    complement: data.complemento ?? '',
    neighborhood: data.bairro ?? '',
    city: data.localidade ?? '',
    state: data.uf ?? '',
    error: data.erro,
  };
}

async function fetchAddress(zipCode: string) {
  abortController?.abort();
  abortController = new AbortController();

  isSearching.value = true;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`, {
      signal: abortController.signal,
    });

    const data = await res.json();
    const mapped = mapResponse(data);

    if (mapped.error) {
      emit('zip-code-not-found');

      return;
    }

    emit('zip-code-found', mapped);
  } catch {
    emit('zip-code-not-found');
  } finally {
    isSearching.value = false;
  }
}

const maskOptions = {
  mask: '#####-###',
  eager: true,
  onMaska: (detail: { masked: string; unmasked: string; completed: boolean }) => {
    emit('update:modelValue', detail.unmasked);

    if (detail.completed) fetchAddress(detail.unmasked);
  },
};

onBeforeUnmount(() => {
  abortController?.abort();
});
</script>

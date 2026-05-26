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
    inputmode="tel"
    autocomplete="tel"
  >
    <template #prepend-inner>
      <v-icon>{{ icon }}</v-icon>
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
import { computed } from 'vue';
import { vMaska } from 'maska/vue';
import { Mask } from 'maska';
import { useFzDefaults } from '@/composables/useFzDefaults';
import type { TextFieldVariant } from '@/utils/types';

type ValidationRule = (value: string) => boolean | string;

type MaskaDetail = { masked: string; unmasked: string; completed: boolean };

interface Props {
  modelValue?: string
  label?: string
  rules?: ValidationRule[]
  disabled?: boolean
  hint?: string
  icon?: string
  variant?: TextFieldVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'Telefone',
  rules: () => [],
  hint: '',
  icon: 'mdi-phone-outline',
  variant: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const mask = new Mask({ mask: ['(##) ####-####', '(##) #####-####'], eager: true });

const displayValue = computed(() => mask.masked(props.modelValue ?? ''));

const defaults = useFzDefaults();

const hasHint = computed(() => !!props.hint);

const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');

const maskOptions = {
  mask: ['(##) ####-####', '(##) #####-####'],
  eager: true,
  onMaska: (detail: MaskaDetail) => {
    emit('update:modelValue', detail.unmasked);
  },
};
</script>

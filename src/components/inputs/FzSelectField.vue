<template>
  <FzSelectBase
    v-bind="$props"
    component="select"
    @update:model-value="handleUpdate"
    @is-valid="handleValidation"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FzSelectBase>
</template>

<script setup lang="ts">
import FzSelectBase from './FzSelectBase.vue';
import type { FzSelectFieldProps, SelectModelValue } from './selectField';

withDefaults(defineProps<FzSelectFieldProps>(), {
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

function handleUpdate(value: SelectModelValue): void {
  emit('update:modelValue', value);
}

function handleValidation(value: boolean): void {
  emit('isValid', value);
}
</script>

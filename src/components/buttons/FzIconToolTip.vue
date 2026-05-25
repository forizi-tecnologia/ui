<template>
  <v-tooltip :text="tooltipText" location="top" :disabled="!hasTooltip">
    <template #activator="{ props: tooltipProps }">
      <span v-bind="tooltipProps" class="d-inline-flex" :class="{ 'opacity-50': disabled && !asButton }">
        <v-btn
          v-if="asButton"
          :icon="icon"
          :color="color"
          variant="text"
          :disabled="disabled"
          @click="(e: MouseEvent) => $emit('click', e)"
        />
        <v-icon
          v-else
          :icon="icon"
          :color="color"
          :class="{ 'cursor-pointer': !disabled }"
          @click="handleIconClick"
        />
      </span>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: string;
  tooltip?: string;
  color?: string;
  asButton?: boolean;
  disabled?: boolean;
  disabledTooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: undefined,
  color: 'primary',
  asButton: false,
  disabled: false,
  disabledTooltip: undefined,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const hasTooltip = computed(() => {
  if (props.disabled) return !!props.disabledTooltip;

  return !!props.tooltip;
});

const tooltipText = computed(() => {
  if (props.disabled) return props.disabledTooltip ?? '';

  return props.tooltip ?? '';
});

function handleIconClick(e: MouseEvent) {
  if (props.disabled) return;

  emit('click', e);
}
</script>

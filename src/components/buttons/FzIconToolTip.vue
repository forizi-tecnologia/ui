<template>
  <v-tooltip :text="tooltipText" location="top" :disabled="!hasTooltip">
    <template #activator="{ props: tooltipProps }">
      <span v-bind="tooltipProps" class="d-inline-flex" :class="{ 'opacity-50': disabled && !asButton }">
        <v-btn
          v-if="asButton"
          :icon="icon"
          :color="color"
          :size="size"
          :aria-label="ariaLabel"
          variant="text"
          :disabled="disabled"
          @click="(e: MouseEvent) => $emit('click', e)"
        />
        <v-icon
          v-else
          :icon="icon"
          :color="color"
          :size="size"
          role="button"
          :tabindex="iconTabindex"
          :aria-label="ariaLabel"
          :aria-disabled="ariaDisabled"
          :class="{ 'cursor-pointer': !disabled }"
          @click="handleIconClick"
          @keydown="handleIconKeydown"
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
  size?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: undefined,
  color: 'primary',
  asButton: false,
  disabled: false,
  disabledTooltip: undefined,
  size: undefined,
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

const ariaLabel = computed(() => {
  if (props.disabled) return props.disabledTooltip ?? props.tooltip;

  return props.tooltip;
});

const ariaDisabled = computed(() => props.disabled ? 'true' : undefined);

const iconTabindex = computed(() => props.disabled ? -1 : 0);

function createActivationEvent(): MouseEvent {
  return new MouseEvent('click', { bubbles: true, cancelable: true });
}

function handleIconClick(e: MouseEvent): void {
  if (props.disabled) return;

  emit('click', e);
}

function handleIconKeydown(e: KeyboardEvent): void {
  if (props.disabled) return;

  if (e.key !== 'Enter' && e.key !== ' ') return;

  if (e.key === ' ') e.preventDefault();

  emit('click', createActivationEvent());
}
</script>

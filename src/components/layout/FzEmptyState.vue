<template>
  <div class="d-flex flex-column align-center text-center" :class="rootClass">
    <v-icon :icon="icon" :size="iconSize" :color="iconColor" />

    <span class="font-weight-medium" :class="titleClass">{{ title }}</span>

    <span v-if="description" class="text-body-2 text-medium-emphasis">{{ description }}</span>

    <slot />

    <slot name="action">
      <v-btn
        v-if="actionText"
        :color="actionColor"
        :variant="actionVariant"
        :prepend-icon="actionIcon || undefined"
        class="text-none"
        @click="emit('action')"
      >
        {{ actionText }}
      </v-btn>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ActionVariant = 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  actionText?: string;
  actionIcon?: string;
  actionColor?: string;
  actionVariant?: ActionVariant;
  compact?: boolean;
  iconColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi-inbox-outline',
  description: '',
  actionText: '',
  actionIcon: '',
  actionColor: 'primary',
  actionVariant: 'elevated',
  compact: false,
  iconColor: 'medium-emphasis',
});

const emit = defineEmits<{
  action: [];
}>();

const DEFAULT_ICON_SIZE = 48;

const COMPACT_ICON_SIZE = 32;

const iconSize = computed(() => props.compact ? COMPACT_ICON_SIZE : DEFAULT_ICON_SIZE);

const rootClass = computed(() => props.compact ? 'py-4 px-2 ga-2' : 'py-8 px-4 ga-3');

const titleClass = computed(() => props.compact ? 'text-subtitle-1' : 'text-h6');
</script>

<script setup lang="ts">
import { provide } from 'vue';
import { FZ_DEFAULTS_KEY } from '@/constants';
import type { FzDefaults } from '@/types/FzDefaults';

interface Props {
  defaults?: FzDefaults;
}

const props = withDefaults(defineProps<Props>(), {
  defaults: () => ({}),
});

provide(FZ_DEFAULTS_KEY, props.defaults);
</script>

<template>
  <slot />
</template>

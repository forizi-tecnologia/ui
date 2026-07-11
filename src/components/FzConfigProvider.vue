<script setup lang="ts">
import { reactive, watch, provide } from 'vue';
import { FZ_DEFAULTS_KEY } from '@/constants';
import type { FzDefaults } from '@/types/FzDefaults';

interface Props {
  defaults?: FzDefaults;
}

const props = withDefaults(defineProps<Props>(), {
  defaults: () => ({}),
});

const provided = reactive<FzDefaults>({ ...props.defaults });

watch(() => props.defaults, (val) => {
  Object.assign(provided, val);
});

provide(FZ_DEFAULTS_KEY, provided);
</script>

<template>
  <slot />
</template>

<template>
  <v-card class="mb-6" flat border>
    <v-card-item>
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>

      <template v-if="$slots.description" #subtitle>
        <slot name="description" />
      </template>
    </v-card-item>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>();
</script>

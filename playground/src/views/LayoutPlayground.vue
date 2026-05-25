<template>
  <SectionCard title="Loading Overlay (FzLoadingOverlay)">
    <template #description>
      Overlay de carregamento com delay configurável. Use o composable <code>useLoading()</code>.
    </template>

    <div class="d-flex flex-wrap align-center ga-4">
      <v-btn color="primary" @click="showTimedLoading">
        Mostrar Loading
      </v-btn>

      <FzNumberField
        v-model="loadingSeconds"
        label="Segundos"
        :decimal-places="0"
        :min="1"
        :max="30"
        style="max-width: 160px;"
      />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoading } from '@/composables/useLoading';

const loadingState = useLoading();
const loadingSeconds = ref(3);
let loadingTimeoutId: ReturnType<typeof setTimeout> | null = null;

function showTimedLoading() {
  if (loadingTimeoutId) {
    clearTimeout(loadingTimeoutId);
  }

  loadingState.show('Carregando...');

  loadingTimeoutId = setTimeout(() => {
    loadingState.hide();
    loadingTimeoutId = null;
  }, loadingSeconds.value * 1000);
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="isOpen"
        class="custom-dialog-overlay d-flex align-center justify-center pa-4"
        @click.self="handleOverlayClick"
      >
        <v-card class="flex-grow-1" max-width="500" :elevation="12">
          <v-card-title class="d-flex align-center ga-3 px-6 pb-4 pt-6">
            <v-icon color="warning" size="28">mdi-help-circle</v-icon>
            <span class="text-h6 font-weight-medium">{{ currentTitle }}</span>
          </v-card-title>

          <v-card-text v-if="currentMessage" class="px-6 pb-4 text-body-2">
            {{ currentMessage }}
          </v-card-text>

          <v-card-actions class="d-flex justify-end ga-2 px-6 pb-6 pt-2">
            <v-btn :color="confirmColor" variant="elevated" class="text-none" @click="handleYes">
              {{ confirmText }}
            </v-btn>
            <v-btn :color="cancelColor" variant="outlined" class="text-none" @click="handleNo">
              {{ cancelText }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { ConfirmOptions } from '@/utils/types';
import { useConfirmStore } from '@/utils/confirm';

const isOpen = ref(false);
const currentTitle = ref('');
const currentMessage = ref('');
const isPersistent = ref(true);
const confirmText = ref('');
const cancelText = ref('');
const confirmColor = ref('primary');
const cancelColor = ref('secondary');
let resolvePromise: ((value: boolean) => void) | null = null;

const confirmDialog = (title: string, message: string, options?: ConfirmOptions): Promise<boolean> => {
  currentTitle.value = title;
  currentMessage.value = message;
  isPersistent.value = options?.persistent ?? true;
  confirmText.value = options?.confirmText ?? 'Sim';
  cancelText.value = options?.cancelText ?? 'Não';
  confirmColor.value = options?.confirmColor ?? 'primary';
  cancelColor.value = options?.cancelColor ?? 'secondary';
  isOpen.value = true;

  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

onMounted(() => {
  useConfirmStore().setConfirmRef({ confirmDialog });
});

onUnmounted(() => {
  useConfirmStore().setConfirmRef({ confirmDialog: () => Promise.resolve(false) });
});

const handleYes = () => {
  if (resolvePromise) resolvePromise(true);

  isOpen.value = false;
};

const handleNo = () => {
  if (resolvePromise) resolvePromise(false);

  isOpen.value = false;
};

const handleOverlayClick = () => {
  if (isPersistent.value) return;

  handleNo();
};

defineExpose({
  confirmDialog,
});
</script>

<style scoped>
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2400;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active .v-card,
.dialog-fade-leave-active .v-card {
  transition: transform 0.2s ease;
}

.dialog-fade-enter-from .v-card {
  transform: scale(0.9);
}

.dialog-fade-leave-to .v-card {
  transform: scale(0.9);
}
</style>

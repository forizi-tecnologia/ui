<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay d-flex align-center justify-center">
      <Transition name="fade-delayed">
        <div v-if="showContent" class="d-flex flex-column align-center">
          <v-progress-circular indeterminate color="primary" :size="30" :width="5" />
          <div class="text-white text-body-1 font-weight-medium mt-3">
            {{ message }}
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

interface Props {
  isLoading?: boolean
  message?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  message: 'Carregando...',
  delay: 300,
});

const showContent = ref(false);
let contentTimeoutId: ReturnType<typeof setTimeout> | null = null;

watch(() => props.isLoading, (val) => {
  if (val) {
    contentTimeoutId = setTimeout(() => {
      showContent.value = true;
    }, props.delay);

    return;
  }

  if (contentTimeoutId) {
    clearTimeout(contentTimeoutId);
    contentTimeoutId = null;
  }

  showContent.value = false;
});

onBeforeUnmount(() => {
  if (contentTimeoutId) clearTimeout(contentTimeoutId);
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-delayed-enter-active {
  transition: opacity 0.3s ease 0.1s;
}

.fade-delayed-leave-active {
  transition: opacity 0.2s ease;
}

.fade-delayed-enter-from,
.fade-delayed-leave-to {
  opacity: 0;
}
</style>

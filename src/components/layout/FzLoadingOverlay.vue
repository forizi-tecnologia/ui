<template>
  <Transition name="fade">
    <div v-if="isOverlayVisible" class="loading-overlay d-flex align-center justify-center">
      <Transition name="fade-delayed">
        <div v-if="showContent" class="d-flex flex-column align-center">
          <v-progress-circular indeterminate color="primary" :size="30" :width="5" />
          <div class="text-white text-body-1 font-weight-medium mt-3">
            {{ overlayMessage }}
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { useLoadingRefs } from '@/utils/loading';

interface Props {
  isLoading?: boolean
  message?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: undefined,
  message: undefined,
  delay: 300,
});

const loadingRefs = useLoadingRefs();

const isOverlayVisible = computed(() => props.isLoading ?? loadingRefs.isActive.value);

const overlayMessage = computed(() => props.message ?? loadingRefs.message.value);

const showContent = ref(false);

let contentTimeoutId: ReturnType<typeof setTimeout> | null = null;

function clearContentTimeout(): void {
  if (!contentTimeoutId) return;

  clearTimeout(contentTimeoutId);
  contentTimeoutId = null;
}

watch(isOverlayVisible, (visible) => {
  if (visible) {
    clearContentTimeout();
    contentTimeoutId = setTimeout(() => {
      showContent.value = true;
    }, props.delay);

    return;
  }

  clearContentTimeout();
  showContent.value = false;
}, { immediate: true });

onBeforeUnmount(clearContentTimeout);
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

<template>
  <Transition name="slide-fade">
    <div
      v-if="store.isVisible"
      ref="notificationRef"
      class="floating-notify elevation-6"
      :style="wrapperStyle"
    >
      <v-alert
        :type="store.type"
        :title="store.title"
        :text="store.message"
        variant="text"
        closable
        class="floating-notify-alert"
        @click:close="store.hide()"
      />

      <div
        class="progress-track"
        :style="{ backgroundColor: trackBg }"
      >
        <div
          class="progress-fill"
          :style="{ width: progress + '%', backgroundColor: fillColor }"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import { useNotifyStore } from '@/utils/notify';
import { NOTIFY_DURATION } from '@/utils/types';

const theme = useTheme();
const store = useNotifyStore();

const notificationRef = ref<HTMLElement | null>(null);
const progress = ref(100);
const ENTER_TRANSITION_MS = 350;

const isDark = computed(() => theme.global.name.value === 'dark');

const FALLBACK: Record<string, string> = {
  success: '#4CAF50', error: '#F44336', warning: '#FF9800', info: '#2196F3',
};

const themeTypeColor = computed(() => {
  try {
    const colors = theme.global.current.value.colors;
    const hex = colors?.[store.type];

    if (typeof hex === 'string' && hex.startsWith('#')) return hex;
  } catch {
    // theme not accessible
  }

  return FALLBACK[store.type] || FALLBACK.info;
});

const LIGHT_BG: Record<string, string> = {
  success: '#E8F5E9', error: '#FFEBEE', warning: '#FFF3E0', info: '#E3F2FD',
};
const DARK_BG = '#1E1E1E';

const wrapperStyle = computed(() => ({
  backgroundColor: isDark.value ? DARK_BG : LIGHT_BG[store.type] || LIGHT_BG.info,
  borderInlineStart: `4px solid ${themeTypeColor.value}`,
}));

const trackBg = computed(() => {
  if (isDark.value) return 'rgba(255, 255, 255, 0.05)';

  return LIGHT_BG[store.type] || LIGHT_BG.info;
});

const fillColor = computed(() => themeTypeColor.value);

function updateProgress() {
  if (!store.isVisible) return;

  const hovered = Date.now() >= enterTransitionEndTime && (notificationRef.value?.matches(':hover') ?? false);

  if (hovered && !isHovered) {
    isHovered = true;
    totalElapsedMs += Date.now() - intervalStartTime;

    store.pause();

    requestAnimationFrame(updateProgress);

    return;
  }

  if (!hovered && isHovered) {
    isHovered = false;
    intervalStartTime = Date.now();

    store.resume();
  }

  if (isHovered) {
    requestAnimationFrame(updateProgress);

    return;
  }

  const elapsed = Date.now() - intervalStartTime;
  const totalElapsed = totalElapsedMs + elapsed;
  const remaining = NOTIFY_DURATION - totalElapsed;

  if (remaining <= 0) {
    progress.value = 0;

    return;
  }

  progress.value = (remaining / NOTIFY_DURATION) * 100;

  requestAnimationFrame(updateProgress);
}

let totalElapsedMs = 0;
let intervalStartTime = 0;
let enterTransitionEndTime = 0;
let isHovered = false;

watch(() => store.isVisible, (visible) => {
  if (visible) {
    totalElapsedMs = 0;
    intervalStartTime = Date.now();
    enterTransitionEndTime = Date.now() + ENTER_TRANSITION_MS;
    isHovered = false;
    progress.value = 100;

    requestAnimationFrame(updateProgress);

    return;
  }

  isHovered = false;
  progress.value = 100;
});

onUnmounted(() => {
  store.cleanup();
});
</script>

<style scoped>
.floating-notify {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  z-index: 9999;
  border-radius: 4px;
  overflow: hidden;
}

.floating-notify :deep(.v-alert--border) {
  border-inline-start-width: 0;
}

.progress-track {
  height: 3px;
}

.progress-fill {
  height: 100%;
  transition: width 100ms linear;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NotifyType } from './types';
import { NOTIFY_DURATION } from './types';

export const useNotifyStore = defineStore('notify', () => {
  const isVisible = ref(false);
  const type = ref<NotifyType>('info');
  const title = ref('');
  const message = ref('');
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let deadline = 0;
  let remainingMs = NOTIFY_DURATION;

  function scheduleTimeout(delay: number) {
    deadline = Date.now() + delay;

    timeoutId = setTimeout(() => {
      hide();
    }, delay);
  }

  function show(notifyType: NotifyType, notifyTitle: string, notifyMessage = '') {
    if (timeoutId) clearTimeout(timeoutId);

    type.value = notifyType;
    title.value = notifyTitle;
    message.value = notifyMessage;
    isVisible.value = true;
    remainingMs = NOTIFY_DURATION;

    scheduleTimeout(NOTIFY_DURATION);
  }

  function hide() {
    isVisible.value = false;

    if (!timeoutId) return;

    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function pause() {
    if (!timeoutId) return;

    remainingMs = deadline - Date.now();

    if (remainingMs <= 0) {
      hide();

      return;
    }

    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function resume() {
    if (timeoutId || remainingMs <= 0) return;

    scheduleTimeout(remainingMs);
  }

  function cleanup() {
    if (!timeoutId) return;

    clearTimeout(timeoutId);
    timeoutId = null;
  }

  return {
    isVisible,
    type,
    title,
    message,
    show,
    hide,
    pause,
    resume,
    cleanup,
  };
});

export const notify = {
  show: (type: NotifyType, title: string, message?: string) => {
    const store = useNotifyStore();
    store.show(type, title, message);
  },
  success: (title: string, message?: string) => {
    const store = useNotifyStore();
    store.show('success', title, message);
  },
  error: (title: string, message?: string) => {
    const store = useNotifyStore();
    store.show('error', title, message);
  },
  warning: (title: string, message?: string) => {
    const store = useNotifyStore();
    store.show('warning', title, message);
  },
  info: (title: string, message?: string) => {
    const store = useNotifyStore();
    store.show('info', title, message);
  },
};

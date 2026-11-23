import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NotifyOptions, NotifyType } from './types';
import { NOTIFY_DURATION } from './types';

export interface NotifyItem {
  id: number;
  type: NotifyType;
  title: string;
  message: string;
  duration: number;
}

export const MAX_NOTIFY_QUEUE = 5;

export const useNotifyStore = defineStore('notify', () => {
  const isVisible = ref(false);
  const type = ref<NotifyType>('info');
  const title = ref('');
  const message = ref('');
  const duration = ref(NOTIFY_DURATION);
  const currentId = ref<number | null>(null);
  const pending = ref<NotifyItem[]>([]);

  const pendingCount = computed(() => pending.value.length);

  let nextId = 1;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let deadline = 0;
  let remainingMs = NOTIFY_DURATION;

  function clearTimer(): void {
    if (!timeoutId) return;

    clearTimeout(timeoutId);
    timeoutId = null;
  }

  function scheduleTimeout(delay: number): void {
    deadline = Date.now() + delay;

    timeoutId = setTimeout(() => {
      timeoutId = null;
      advance();
    }, delay);
  }

  function present(item: NotifyItem): void {
    currentId.value = item.id;
    type.value = item.type;
    title.value = item.title;
    message.value = item.message;
    duration.value = item.duration;
    isVisible.value = true;
    remainingMs = item.duration;
    scheduleTimeout(item.duration);
  }

  function advance(): void {
    clearTimer();

    const next = pending.value.shift();

    if (!next) {
      isVisible.value = false;
      currentId.value = null;
      duration.value = NOTIFY_DURATION;
      remainingMs = NOTIFY_DURATION;

      return;
    }

    present(next);
  }

  function enqueue(item: NotifyItem): void {
    pending.value.push(item);

    if (pending.value.length <= MAX_NOTIFY_QUEUE) return;

    pending.value.shift();
  }

  function show(
    notifyType: NotifyType,
    notifyTitle: string,
    notifyMessage = '',
    options: NotifyOptions = {},
  ): void {
    const item: NotifyItem = {
      id: nextId,
      type: notifyType,
      title: notifyTitle,
      message: notifyMessage,
      duration: options.duration ?? NOTIFY_DURATION,
    };

    nextId += 1;

    if (isVisible.value) {
      enqueue(item);

      return;
    }

    present(item);
  }

  function dismiss(): void {
    if (!isVisible.value) return;

    advance();
  }

  function hide(): void {
    dismiss();
  }

  function pause(): void {
    if (!timeoutId) return;

    remainingMs = deadline - Date.now();

    if (remainingMs <= 0) {
      advance();

      return;
    }

    clearTimer();
  }

  function resume(): void {
    if (timeoutId || remainingMs <= 0) return;

    scheduleTimeout(remainingMs);
  }

  function cleanup(): void {
    clearTimer();
  }

  return {
    isVisible,
    type,
    title,
    message,
    duration,
    currentId,
    pendingCount,
    show,
    hide,
    dismiss,
    pause,
    resume,
    cleanup,
  };
});

export const notify = {
  show: (type: NotifyType, title: string, message?: string, options?: NotifyOptions) => {
    useNotifyStore().show(type, title, message, options);
  },
  success: (title: string, message?: string, options?: NotifyOptions) => {
    useNotifyStore().show('success', title, message, options);
  },
  error: (title: string, message?: string, options?: NotifyOptions) => {
    useNotifyStore().show('error', title, message, options);
  },
  warning: (title: string, message?: string, options?: NotifyOptions) => {
    useNotifyStore().show('warning', title, message, options);
  },
  info: (title: string, message?: string, options?: NotifyOptions) => {
    useNotifyStore().show('info', title, message, options);
  },
  dismiss: () => {
    useNotifyStore().dismiss();
  },
  hide: () => {
    useNotifyStore().hide();
  },
};

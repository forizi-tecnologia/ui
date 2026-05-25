import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ConfirmComponentRef, ConfirmOptions } from './types';

export const useConfirmStore = defineStore('confirm', () => {
  const confirmRef = ref<ConfirmComponentRef | null>(null);

  const setConfirmRef = (instance: ConfirmComponentRef) => {
    confirmRef.value = instance;
  };

  const show = (title: string, message: string, options?: ConfirmOptions): Promise<boolean> => {
    if (!confirmRef.value) return Promise.resolve(false);

    return confirmRef.value.confirmDialog(title, message, options);
  };

  return {
    setConfirmRef,
    show,
  };
});

export const confirm = {
  show: (title: string, message: string, options?: ConfirmOptions): Promise<boolean> => {
    const store = useConfirmStore();

    return store.show(title, message, options);
  },
};

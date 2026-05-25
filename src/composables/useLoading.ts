import { ref } from 'vue';

export function useLoading() {
  const isActive = ref(false);
  const message = ref('Carregando...');

  function show(msg?: string) {
    message.value = msg ?? 'Carregando...';
    isActive.value = true;
  }

  function hide() {
    isActive.value = false;
  }

  return {
    isActive,
    message,
    show,
    hide,
  };
}

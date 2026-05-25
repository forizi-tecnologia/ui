import { ref, watch, nextTick, type Ref } from 'vue';

export const NAVIGATION_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];

export function useNumericInput(
  modelValue: Ref<number | null | undefined>,
  emit: (value: number) => void,
  format: (value: number) => string,
  parse: (input: string) => number,
) {
  const formattedValue = ref('');

  function moveCursorToEnd() {
    const input = document.activeElement as HTMLInputElement | null;

    nextTick(() => {
      if (!input || input.value == null) return;

      input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  function handleInput(value: string) {
    const numericValue = parse(value);

    emit(numericValue);

    nextTick(() => {
      formattedValue.value = format(numericValue);
    });
  }

  function handleFocus() {
    moveCursorToEnd();
  }

  function handleClick() {
    moveCursorToEnd();
  }

  watch(
    () => modelValue.value,
    (newVal) => {
      const value = newVal ?? 0;
      formattedValue.value = format(value);
    },
    { immediate: true },
  );

  return {
    formattedValue,
    moveCursorToEnd,
    handleInput,
    handleFocus,
    handleClick,
  };
}

export interface NumericKeydownOptions {
  allowNegative?: boolean;
}

export function createNumericKeydownHandler(
  formattedValue: Ref<string>,
  updateValue: (value: number) => void,
  computeFromDigits: (digits: string, isNegative: boolean) => number,
  getOptions?: () => NumericKeydownOptions,
): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    const { allowNegative = true } = getOptions?.() ?? {};
    const input = event.target as HTMLInputElement | null;

    if (!input) return;

    const isNavigationKey = NAVIGATION_KEYS.includes(event.key) || event.ctrlKey || event.metaKey;

    if (isNavigationKey) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();

        const rawDigits = formattedValue.value.replace(/\D/g, '');

        if (rawDigits.length === 0) return;

        const isNegative = allowNegative && formattedValue.value.startsWith('-');
        const newDigits = rawDigits.slice(0, -1);
        const newValue = computeFromDigits(newDigits, isNegative);

        updateValue(newValue);
      }

      return;
    }

    if (!/[\d-]/.test(event.key)) {
      event.preventDefault();

      return;
    }

    event.preventDefault();

    if (event.key === '-') {
      if (!allowNegative) return;

      const rawDigits = formattedValue.value.replace(/\D/g, '');
      const newIsNegative = !formattedValue.value.startsWith('-');
      const newValue = computeFromDigits(rawDigits, newIsNegative);

      updateValue(newValue);

      return;
    }

    const rawDigits = formattedValue.value.replace(/\D/g, '');
    const isNegative = allowNegative && formattedValue.value.startsWith('-');
    const newDigits = rawDigits + event.key;
    const newValue = computeFromDigits(newDigits, isNegative);

    updateValue(newValue);
  };
}

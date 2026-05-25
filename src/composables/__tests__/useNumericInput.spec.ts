import { describe, it, expect, beforeEach } from 'vitest';
import { ref, nextTick, type Ref } from 'vue';
import { useNumericInput, NAVIGATION_KEYS } from '../useNumericInput';

function format(v: number): string {
  return `R$ ${v.toFixed(2).replace('.', ',')}`;
}

function parse(s: string): number {
  const cleaned = s.replace(/\D/g, '');

  if (!cleaned) return 0;

  return parseInt(cleaned, 10) / 100;
}

describe('useNumericInput', () => {
  let modelValue: ReturnType<typeof ref<number | null>>;
  let emit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    modelValue = ref(0);
    emit = vi.fn();
  });

  it('should initialize formattedValue from modelValue', () => {
    const { formattedValue } = useNumericInput(modelValue, emit, format, parse);

    expect(formattedValue.value).toBe('R$ 0,00');
  });

  it('should update formattedValue when modelValue changes', async () => {
    const { formattedValue } = useNumericInput(modelValue, emit, format, parse);

    modelValue.value = 1234.56;
    await nextTick();

    expect(formattedValue.value).toBe('R$ 1234,56');
  });

  it('should format null modelValue as 0', async () => {
    const { formattedValue } = useNumericInput(modelValue, emit, format, parse);

    modelValue.value = null;
    await nextTick();

    expect(formattedValue.value).toBe('R$ 0,00');
  });

  it('should format undefined modelValue as 0', async () => {
    modelValue = ref(undefined) as unknown as Ref<number | null | undefined>;

    const { formattedValue } = useNumericInput(modelValue, emit, format, parse);

    await nextTick();

    expect(formattedValue.value).toBe('R$ 0,00');
  });

  it('should handleInput by parsing, emitting, and updating formattedValue on nextTick', async () => {
    const { formattedValue, handleInput } = useNumericInput(modelValue, emit, format, parse);

    handleInput('123456');

    expect(emit).toHaveBeenCalledWith(1234.56);
    expect(formattedValue.value).toBe('R$ 0,00');

    await nextTick();

    expect(formattedValue.value).toBe('R$ 1234,56');
  });

  it('should handleInput with empty string parse to 0', async () => {
    const { handleInput } = useNumericInput(modelValue, emit, format, parse);

    handleInput('');

    expect(emit).toHaveBeenCalledWith(0);
  });

  it('should move cursor to end when input is focused', async () => {
    const { moveCursorToEnd } = useNumericInput(modelValue, emit, format, parse);

    const input = document.createElement('input');

    input.value = 'R$ 1.234,56';
    input.type = 'text';
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 0);

    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);

    moveCursorToEnd();
    await nextTick();

    expect(input.selectionStart).toBe('R$ 1.234,56'.length);
    expect(input.selectionEnd).toBe('R$ 1.234,56'.length);

    document.body.removeChild(input);
  });

  it('should not throw when no input is focused', async () => {
    const { moveCursorToEnd } = useNumericInput(modelValue, emit, format, parse);

    moveCursorToEnd();
    await nextTick();

    expect(true).toBe(true);
  });

  it('should handleFocus call moveCursorToEnd', async () => {
    const { handleFocus } = useNumericInput(modelValue, emit, format, parse);

    const input = document.createElement('input');

    input.value = 'R$ 99,99';
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 0);

    handleFocus();
    await nextTick();

    expect(input.selectionStart).toBe('R$ 99,99'.length);
    expect(input.selectionEnd).toBe('R$ 99,99'.length);

    document.body.removeChild(input);
  });

  it('should handleClick call moveCursorToEnd', async () => {
    const { handleClick } = useNumericInput(modelValue, emit, format, parse);

    const input = document.createElement('input');

    input.value = 'R$ 50,00';
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 0);

    handleClick();
    await nextTick();

    expect(input.selectionStart).toBe('R$ 50,00'.length);
    expect(input.selectionEnd).toBe('R$ 50,00'.length);

    document.body.removeChild(input);
  });

  it('should export NAVIGATION_KEYS array', () => {
    expect(NAVIGATION_KEYS).toEqual([
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ]);
  });
});

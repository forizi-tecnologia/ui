import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzNumberField from '../FzNumberField.vue';

const FORMAT_CASES = [
  { value: 0, decimalPlaces: 0, expected: '0' },
  { value: 1234, decimalPlaces: 0, expected: '1.234' },
  { value: 1234.56, decimalPlaces: 2, expected: '1.234,56' },
  { value: 99000000, decimalPlaces: 0, expected: '99.000.000' },
  { value: -50, decimalPlaces: 0, expected: '-50' },
  { value: -50.5, decimalPlaces: 2, expected: '-50,50' },
] as const;

const PARSE_CASES = [
  { input: '123', decimalPlaces: 0, expected: 123 },
  { input: '-', decimalPlaces: 0, expected: 0 },
  { input: '1234', decimalPlaces: 2, expected: 12.34 },
  { input: '-123', decimalPlaces: 0, expected: -123 },
] as const;

describe('FzNumberField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzNumberField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInputValue(): string {
    return (wrapper.find('input').element as HTMLInputElement).value;
  }

  it.each(FORMAT_CASES)(
    'should format $value as "$expected" with decimalPlaces=$decimalPlaces',
    async ({ value, decimalPlaces, expected }) => {
      await wrapper.setProps({ modelValue: value, decimalPlaces });

      expect(getInputValue()).toBe(expected);
    },
  );

  it.each(PARSE_CASES)(
    'should parse "$input" to $expected on user input',
    async ({ input, decimalPlaces, expected }) => {
      await wrapper.setProps({ decimalPlaces });

      await wrapper.find('input').setValue(input);

      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      expect(emitted![0][0]).toBe(expected);
    },
  );

  it('should handle null modelValue as 0', async () => {
    await wrapper.setProps({ modelValue: null });

    expect(getInputValue()).toBe('0');
  });

  it('should format 0 with 2 decimal places as "0,00"', async () => {
    await wrapper.setProps({ modelValue: null, decimalPlaces: 2 });

    expect(getInputValue()).toBe('0,00');
  });

  it('should parse "0" as 0 on user input after clearing value', async () => {
    await wrapper.setProps({ modelValue: null });

    await wrapper.find('input').setValue('5');

    await wrapper.find('input').setValue('0');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![1][0]).toBe(0);
  });

  it('should render with custom label', () => {
    wrapper = createComponent(FzNumberField, { props: { label: 'Quantidade' } });

    expect(wrapper.text()).toContain('Quantidade');
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should render hint text when provided and persistentHint is true', async () => {
    await wrapper.setProps({ hint: 'Informe um número', persistentHint: true });

    expect(wrapper.find('.v-messages__message').text()).toBe('Informe um número');
  });

  it('should render with custom variant', () => {
    wrapper = createComponent(FzNumberField, { props: { variant: 'outlined' } });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should accept rules prop', () => {
    const rule = (v: string) => v !== '0' || 'Valor não pode ser zero';

    wrapper = createComponent(FzNumberField, { props: { rules: [rule] } });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should render prepend slot content', () => {
    wrapper = createComponent(FzNumberField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzNumberField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it.each(['ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'])(
    'should not update value on navigation key %s',
    async (key) => {
      await wrapper.find('input').trigger('keydown', { key });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    },
  );

  it('should not update value on ctrl+key', async () => {
    await wrapper.find('input').trigger('keydown', { key: 'a', ctrlKey: true });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should not update value on meta+key', async () => {
    await wrapper.find('input').trigger('keydown', { key: 'a', metaKey: true });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should prevent non-digit non-minus key', async () => {
    await wrapper.find('input').trigger('keydown', { key: 'a' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should append digit on keydown', async () => {
    await wrapper.find('input').trigger('keydown', { key: '5' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(5);
  });

  it('should append digit with decimal places', async () => {
    await wrapper.setProps({ decimalPlaces: 2 });

    await wrapper.find('input').trigger('keydown', { key: '5' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(0.05);
  });

  it('should append digit on negative value', async () => {
    await wrapper.setProps({ modelValue: -123, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: '4' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(-1234);
  });

  it('should remove last digit on Backspace', async () => {
    await wrapper.setProps({ modelValue: 1234, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(123);
  });

  it('should remove last digit on Delete', async () => {
    await wrapper.setProps({ modelValue: 5678, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: 'Delete' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(567);
  });

  it('should handle Backspace on negative number', async () => {
    await wrapper.setProps({ modelValue: -123, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(-12);
  });

  it('should handle Backspace to zero on negative', async () => {
    await wrapper.setProps({ modelValue: -1, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(0);
  });

  it('should toggle sign with minus key when allowNegative is true', async () => {
    await wrapper.setProps({ modelValue: 10, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: '-' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(-10);
  });

  it('should not toggle sign with minus key when allowNegative is false', async () => {
    await wrapper.setProps({ modelValue: 10, decimalPlaces: 0, allowNegative: false });

    await wrapper.find('input').trigger('keydown', { key: '-' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should block value exceeding max', async () => {
    await wrapper.setProps({ modelValue: 0, max: 1, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: '2' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should block value below min on Backspace', async () => {
    await wrapper.setProps({ modelValue: 100, min: 50, decimalPlaces: 0 });

    await wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should not throw on focus event', async () => {
    await wrapper.find('input').trigger('focus');

    expect(true).toBe(true);
  });

  it('should not throw on click event', async () => {
    await wrapper.find('input').trigger('click');

    expect(true).toBe(true);
  });

  it('should handle null event target gracefully', () => {
    const inputEl = wrapper.find('input').element;
    const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });

    Object.defineProperty(event, 'target', { value: null, configurable: true });

    inputEl.dispatchEvent(event);

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should handle Backspace when formatted value has no digits', async () => {
    await wrapper.setProps({ modelValue: NaN });

    await wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should parse empty input as 0 via handleInput', async () => {
    await wrapper.find('input').setValue('');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(0);
  });

  it('should parse negative input as positive when allowNegative is false', async () => {
    await wrapper.setProps({ allowNegative: false, decimalPlaces: 0 });

    await wrapper.find('input').setValue('-123');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(123);
  });
});

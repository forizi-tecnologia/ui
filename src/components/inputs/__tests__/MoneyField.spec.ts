import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzMoneyField from '../FzMoneyField.vue';

const FORMAT_CASES = [
  { value: 0, expected: 'R$ 0,00' },
  { value: 1234.56, expected: 'R$ 1.234,56' },
  { value: 0.5, expected: 'R$ 0,50' },
  { value: 99.99, expected: 'R$ 99,99' },
  { value: 1000000, expected: 'R$ 1.000.000,00' },
  { value: -50, expected: '-R$ 50,00' },
] as const;

const INPUT_PARSE_CASES = [
  { input: '0', expected: 0 },
  { input: '123456', expected: 1234.56 },
  { input: '9999', expected: 99.99 },
  { input: '-', expected: 0 },
  { input: '-1234', expected: -12.34 },
] as const;

describe('FzMoneyField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzMoneyField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInputValue(): string {
    const input = wrapper.find('input');

    return (input.element as HTMLInputElement).value;
  }

  it.each(FORMAT_CASES)('should format $value as "$expected" when modelValue is set', async ({ value, expected }) => {
    await wrapper.setProps({ modelValue: value });
    const inputValue = getInputValue();

    expect(inputValue).toBe(expected);
  });

  it.each(INPUT_PARSE_CASES)('should parse "$input" to $expected on user input', async ({ input, expected }) => {
    const inputEl = wrapper.find('input');
    await inputEl.setValue(input);

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(expected);
  });

  it('should display custom currency symbol when currency prop is set', async () => {
    await wrapper.setProps({ modelValue: 100, currency: 'USD' });
    const inputValue = getInputValue();

    // Intl.NumberFormat uses the locale-appropriate symbol (US$ in pt-BR for USD)
    expect(inputValue).toContain('US$');
    expect(inputValue).toContain('100,00');
  });

  it('should format with custom locale when locale prop is set', async () => {
    await wrapper.setProps({ modelValue: 1234.56, locale: 'en-US' });
    const inputValue = getInputValue();

    // en-US uses no space between symbol and number (R$1,234.56), pt-BR uses a space
    expect(inputValue).toContain('R$');
    expect(inputValue).toContain('1,234.56');
  });

  it('should render prepend slot content', () => {
    wrapper = createComponent(FzMoneyField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzMoneyField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should block value exceeding max on keydown', async () => {
    await wrapper.setProps({ modelValue: 0, max: 1 });

    const input = wrapper.find('input');

    // '2' → 0.02 (allowed, under max=1)
    await input.trigger('keydown', { key: '2' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(0.02);

    // '0' → 0.20 (allowed)
    await input.trigger('keydown', { key: '0' });

    expect(wrapper.emitted('update:modelValue')![1][0]).toBe(0.20);

    // '0' → 2.00 (blocked, over max=1) → no new emit
    await input.trigger('keydown', { key: '0' });

    expect(wrapper.emitted('update:modelValue')!.length).toBe(2);
  });

  it('should block value below min on keydown', async () => {
    await wrapper.setProps({ modelValue: 100, min: 50 });

    const input = wrapper.find('input');

    // Backspace on 'R$ 100,00' → digits '10000' → '1000' → 10.00 < 50 → blocked
    await input.trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should allow digit keydown and append digit', async () => {
    const input = wrapper.find('input');

    // 'R$ 0,00' → digits '000' → append '5' → '0005' → 0.05
    await input.trigger('keydown', { key: '5' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(0.05);
  });

  it('should handle Backspace by removing last digit', async () => {
    await wrapper.setProps({ modelValue: 12.34 });

    const input = wrapper.find('input');

    // 'R$ 12,34' → digits '1234' → '123' → 1.23
    await input.trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(1.23);
  });

  it('should handle Delete like Backspace', async () => {
    await wrapper.setProps({ modelValue: 56.78 });

    const input = wrapper.find('input');

    // 'R$ 56,78' → digits '5678' → '567' → 5.67
    await input.trigger('keydown', { key: 'Delete' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(5.67);
  });

  it('should toggle sign with minus key', async () => {
    await wrapper.setProps({ modelValue: 10 });

    const input = wrapper.find('input');

    // '-' → toggles to -10
    await input.trigger('keydown', { key: '-' });

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(-10);
  });

  it('should allow navigation key without updating value', async () => {
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'ArrowLeft' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should allow ctrl+key without updating value', async () => {
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'a', ctrlKey: true });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should allow meta+key without updating value', async () => {
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'a', metaKey: true });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should prevent non-digit non-minus key', async () => {
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'a' });

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    const input = wrapper.find('input');

    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('should render hint text when provided and persistentHint is true', async () => {
    await wrapper.setProps({ hint: 'Informe o valor', persistentHint: true });

    const messages = wrapper.findAll('.v-messages__message');

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].text()).toBe('Informe o valor');
  });

  it('should render EUR currency symbol', async () => {
    await wrapper.setProps({ modelValue: 50, currency: 'EUR' });

    expect(getInputValue()).toBe('€ 50,00');
  });

  it('should render GBP currency symbol', async () => {
    await wrapper.setProps({ modelValue: 75, currency: 'GBP' });

    expect(getInputValue()).toBe('£ 75,00');
  });

  it('should render custom currency string for unknown symbol', async () => {
    await wrapper.setProps({ modelValue: 30, currency: 'BTC' });

    expect(getInputValue()).toBe('BTC 30,00');
  });

  it('should handle null modelValue as 0', async () => {
    await wrapper.setProps({ modelValue: null });

    expect(getInputValue()).toBe('R$ 0,00');
  });

  it('should render with custom label', async () => {
    wrapper = createComponent(FzMoneyField, {
      props: { label: 'Valor do produto' },
    });

    expect(wrapper.text()).toContain('Valor do produto');
  });

  it('should render with custom variant', async () => {
    wrapper = createComponent(FzMoneyField, {
      props: { variant: 'outlined' },
    });

    expect(wrapper.find('input').exists()).toBe(true);
  });
});

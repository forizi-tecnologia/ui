import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzPhoneField from '../FzPhoneField.vue';

const MASK_CASES = [
  { value: '', expected: '' },
  { value: '1', expected: '(1' },
  { value: '11', expected: '(11) ' },
  { value: '119', expected: '(11) 9' },
  { value: '1199', expected: '(11) 99' },
  { value: '1199999999', expected: '(11) 9999-9999' },
  { value: '11999999999', expected: '(11) 99999-9999' },
] as const;

describe('FzPhoneField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzPhoneField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInputValue(): string {
    return (wrapper.find('input').element as HTMLInputElement).value;
  }

  it('should render with default label and phone icon', () => {
    expect(wrapper.text()).toContain('Telefone');

    const icon = wrapper.find('.v-icon');

    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('mdi-phone-outline');
  });

  it('should display empty input when modelValue is empty', () => {
    expect(getInputValue()).toBe('');
  });

  it.each(MASK_CASES)('should format "$value" as "$expected"', async ({ value, expected }) => {
    await wrapper.setProps({ modelValue: value });

    expect(getInputValue()).toBe(expected);
  });

  it('should show hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Informe seu telefone' });

    expect(wrapper.text()).toContain('Informe seu telefone');
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should render with custom label', () => {
    wrapper = createComponent(FzPhoneField, { props: { label: 'Celular' } });

    expect(wrapper.text()).toContain('Celular');
  });

  it('should render with custom icon', () => {
    wrapper = createComponent(FzPhoneField, { props: { icon: 'mdi-cellphone' } });

    expect(wrapper.find('.v-icon').classes()).toContain('mdi-cellphone');
  });

  it('should render with custom variant', () => {
    wrapper = createComponent(FzPhoneField, { props: { variant: 'outlined' } });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should show error from custom rule', async () => {
    const customRule = (v: string) => v.length >= 10 ? true : 'Telefone inválido';

    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '1199', rules: [customRule] });
    await input.trigger('focus');
    await input.trigger('blur');

    const messages = wrapper.findAll('.v-messages__message');

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].text()).toBe('Telefone inválido');
  });

  it('should pass custom rule with valid value', async () => {
    const customRule = (v: string) => v.length >= 10 ? true : 'Telefone inválido';

    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '11999999999', rules: [customRule] });
    await input.trigger('focus');
    await input.trigger('blur');

    const messages = wrapper.findAll('.v-messages__message');

    expect(messages.length).toBe(0);
  });

  it('should emit update:modelValue with unmasked value on input', async () => {
    const input = wrapper.find('input');

    await input.setValue('11999999999');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe('11999999999');
  });

  it('should render prepend slot content', () => {
    wrapper = createComponent(FzPhoneField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzPhoneField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should have tel inputmode and autocomplete', () => {
    const input = wrapper.find('input');

    expect(input.attributes('inputmode')).toBe('tel');
    expect(input.attributes('autocomplete')).toBe('tel');
  });

  it('should handle null modelValue as empty display', async () => {
    await wrapper.setProps({ modelValue: null as unknown as string });

    expect(getInputValue()).toBe('');
  });

  it('should not show hint when hint is empty', () => {
    expect(wrapper.find('.v-messages__message').exists()).toBe(false);
  });
});

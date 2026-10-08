import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzCpfCnpjField from '../FzCpfCnpjField.vue';

const DISPLAY_CASES = [
  { value: '', expected: '' },
  { value: '123', expected: '123.' },
  { value: '1234567890', expected: '123.456.789-0' },
  { value: '11144477735', expected: '111.444.777-35' },
  { value: '11222333000181', expected: '11.222.333/0001-81' },
  { value: '12abc34501de35', expected: '12.ABC.345/01DE-35' },
] as const;

const VALIDATION_CASES = [
  { value: '', required: false, expected: true },
  { value: '', required: true, expected: 'CPF/CNPJ é obrigatório' },
  { value: '11144477735', required: false, expected: true },
  { value: '11144477734', required: false, expected: 'CPF/CNPJ inválido' },
  { value: '11111111111', required: false, expected: 'CPF/CNPJ inválido' },
  { value: '12ABC34501DE35', required: false, expected: true },
  { value: '12ABC34501DE34', required: false, expected: 'CPF/CNPJ inválido' },
  { value: '123456789012', required: false, expected: 'CPF/CNPJ inválido' },
] as const;

const INPUT_CASES = [
  { typed: '11144477735', expected: '11144477735' },
  { typed: '12abc34501de35', expected: '12ABC34501DE35' },
  { typed: '11.222.333/0001-81', expected: '11222333000181' },
] as const;

describe('FzCpfCnpjField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzCpfCnpjField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInputValue(): string {
    return (wrapper.find('input').element as HTMLInputElement).value;
  }

  function getValidationMessage(): string {
    const messages = wrapper.findAll('.v-messages__message');

    return messages.length === 0 ? '' : messages[0].text();
  }

  it('should render with default label and document icon', () => {
    expect(wrapper.text()).toContain('CPF/CNPJ');
    expect(wrapper.find('.v-icon').classes()).toContain('mdi-card-account-details-outline');
  });

  it('should display empty input when modelValue is empty', () => {
    expect(getInputValue()).toBe('');
  });

  it.each(DISPLAY_CASES)('should display "$value" as "$expected"', async ({ value, expected }) => {
    await wrapper.setProps({ modelValue: value });

    expect(getInputValue()).toBe(expected);
  });

  it.each(VALIDATION_CASES)('should validate "$value" (required: $required) as "$expected"', async ({ value, required, expected }) => {
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: value, required });
    await input.trigger('focus');
    await input.trigger('blur');

    if (expected === true) {
      expect(getValidationMessage()).toBe('');
    } else {
      expect(getValidationMessage()).toBe(expected);
    }
  });

  it('should show custom requiredMessage', async () => {
    const input = wrapper.find('input');

    await wrapper.setProps({
      modelValue: '',
      required: true,
      requiredMessage: 'Informe o documento',
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Informe o documento');
  });

  it('should show custom invalidMessage', async () => {
    const input = wrapper.find('input');

    await wrapper.setProps({
      modelValue: '11144477734',
      invalidMessage: 'Documento inválido',
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Documento inválido');
  });

  it.each(INPUT_CASES)('should emit unmasked uppercase value when typing "$typed"', async ({ typed, expected }) => {
    await wrapper.find('input').setValue(typed);

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toBe(expected);
  });

  it('should switch mask from CPF to CNPJ when a 12th character is typed', async () => {
    const input = wrapper.find('input');

    await input.setValue('12345678901');
    await input.setValue('123456789012');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('123456789012');
    expect(getInputValue()).toBe('12.345.678/9012-');
  });

  it('should force CNPJ mask when letters are typed', async () => {
    await wrapper.find('input').setValue('12ab');

    expect(getInputValue()).toBe('12.AB');
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('12AB');
  });

  it('should emit isValid true on blur when validateOnBlur is true', async () => {
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '11144477735' });
    await input.trigger('focus');
    await input.trigger('blur');

    const emitted = wrapper.emitted('isValid');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(true);
  });

  it('should emit isValid false on blur when value is invalid', async () => {
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '11144477734' });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid on input when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false });
    await wrapper.find('input').setValue('11144477735');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should show valid icon after a successful validation', async () => {
    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '11144477735' });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.find('.v-icon').classes()).toContain('mdi-card-account-details');
  });

  it('should render custom rules alongside document validation', async () => {
    const customRule = (v: string) => v.startsWith('1') ? true : 'Deve começar com 1';

    const input = wrapper.find('input');

    await wrapper.setProps({ modelValue: '52998224725', rules: [customRule] });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Deve começar com 1');
  });

  it('should render prepend slot content instead of default icon', () => {
    wrapper = createComponent(FzCpfCnpjField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.v-icon').exists()).toBe(false);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzCpfCnpjField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should render hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Somente números' });

    expect(wrapper.text()).toContain('Somente números');
  });

  it('should render with custom label and variant', () => {
    wrapper = createComponent(FzCpfCnpjField, {
      props: { label: 'Documento', variant: 'outlined', density: 'compact' },
    });

    expect(wrapper.text()).toContain('Documento');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should handle null modelValue as empty display', async () => {
    await wrapper.setProps({ modelValue: null as unknown as string });

    expect(getInputValue()).toBe('');
  });

  it('should default hideDetails to auto', () => {
    expect(wrapper.findComponent({ name: 'v-text-field' }).props('hideDetails')).toBe('auto');
  });

  it('should forward a hideDetails override', async () => {
    await wrapper.setProps({ hideDetails: false });

    expect(wrapper.findComponent({ name: 'v-text-field' }).props('hideDetails')).toBe(false);
  });
});

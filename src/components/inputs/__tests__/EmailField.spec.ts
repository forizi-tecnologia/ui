import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzEmailField from '../FzEmailField.vue';

const VALIDATION_CASES = [
  { value: '', required: false, expected: true },
  { value: '', required: true, expected: 'Email é obrigatório' },
  { value: 'invalid', required: false, expected: 'Formato de e-mail inválido' },
  { value: '@domain.com', required: false, expected: 'Formato de e-mail inválido' },
  { value: 'test@domain', required: false, expected: 'Formato de e-mail inválido' },
  { value: 'test@example.com', required: false, expected: true },
  { value: 'user.name+tag@domain.co.uk', required: false, expected: true },
  { value: 'email@sub.domain.com.br', required: false, expected: true },
] as const;

describe('FzEmailField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzEmailField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getValidationMessage(): string {
    const messages = wrapper.findAll('.v-messages__message');

    return messages.length === 0 ? '' : messages[0].text();
  }

  it('should render with default label and empty value', () => {
    expect(wrapper.text()).toContain('Email');

    const input = wrapper.find('input');

    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it.each(VALIDATION_CASES)('should validate "$value" as $expected', async ({ value, required, expected }) => {
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
      requiredMessage: 'Campo obrigatório',
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Campo obrigatório');
  });

  it('should show custom invalidMessage', async () => {
    const input = wrapper.find('input');
    await wrapper.setProps({
      modelValue: 'invalid',
      required: true,
      invalidMessage: 'Email inválido',
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Email inválido');
  });

  it('should emit update:modelValue on user input', async () => {
    await wrapper.find('input').setValue('test@example.com');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe('test@example.com');
  });

  it('should emit isValid on blur when validateOnBlur is true', async () => {
    const input = wrapper.find('input');
    await wrapper.setProps({ modelValue: 'test@example.com' });
    await input.trigger('focus');
    await input.trigger('blur');

    const emitted = wrapper.emitted('isValid');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(true);
  });

  it('should emit isValid false on blur when validateOnBlur is true and value is invalid', async () => {
    const input = wrapper.find('input');
    await wrapper.setProps({ modelValue: 'invalid' });
    await input.trigger('focus');
    await input.trigger('blur');

    const emitted = wrapper.emitted('isValid');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(false);
  });

  it('should emit isValid on input when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false });
    await wrapper.find('input').setValue('test@example.com');

    const emitted = wrapper.emitted('isValid');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(true);
  });

  it('should emit isValid false on input when validateOnBlur is false and value is invalid', async () => {
    await wrapper.setProps({ validateOnBlur: false });
    await wrapper.find('input').setValue('invalid');

    const emitted = wrapper.emitted('isValid');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe(false);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false });
    await wrapper.find('input').trigger('focus');
    await wrapper.find('input').trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should apply custom rules alongside email validation and show first failure', async () => {
    const customRule = (v: string) => v.endsWith('.com') ? true : 'Deve terminar com .com';

    const input = wrapper.find('input');
    await wrapper.setProps({
      modelValue: 'test@example.org',
      rules: [customRule],
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Deve terminar com .com');
  });

  it('should pass when both email and custom rules are valid', async () => {
    const customRule = (v: string) => v.length > 5 ? true : 'Muito curto';

    const input = wrapper.find('input');
    await wrapper.setProps({
      modelValue: 'a@b.com',
      rules: [customRule],
    });
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('');
  });

  it('should render with prepend icon by default', () => {
    expect(wrapper.find('.v-icon').exists()).toBe(true);
  });

  it('should show mdi-email-check icon after valid email validation', async () => {
    const input = wrapper.find('input');
    await wrapper.setProps({ modelValue: 'test@example.com' });
    await input.trigger('focus');
    await input.trigger('blur');

    const icon = wrapper.find('.v-icon');

    expect(icon.classes()).toContain('mdi-email-check');
  });

  it('should render prepend slot content instead of default icon', () => {
    wrapper = createComponent(FzEmailField, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.v-icon').exists()).toBe(false);
  });

  it('should render append slot content', () => {
    wrapper = createComponent(FzEmailField, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should render hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Informe seu email' });

    expect(wrapper.text()).toContain('Informe seu email');
  });

  it('should render with custom label', async () => {
    wrapper = createComponent(FzEmailField, {
      props: { label: 'Seu Email' },
    });

    expect(wrapper.text()).toContain('Seu Email');
  });
});

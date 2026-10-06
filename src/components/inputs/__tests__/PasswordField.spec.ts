import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzPasswordField from '../FzPasswordField.vue';
import FzConfigProvider from '@/components/FzConfigProvider.vue';

const VALIDATION_CASES = [
  { value: '', required: false, minlength: 0, expected: true },
  { value: '', required: true, minlength: 0, expected: 'Senha é obrigatória' },
  { value: 'abc', required: false, minlength: 8, expected: 'Senha deve ter ao menos 8 caracteres' },
  { value: 'abc12345', required: false, minlength: 8, expected: true },
  { value: 'abc', required: true, minlength: 8, expected: 'Senha deve ter ao menos 8 caracteres' },
] as const;

describe('FzPasswordField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzPasswordField);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInput() {
    return wrapper.find('input');
  }

  function getInputType(): string | undefined {
    return getInput().attributes('type');
  }

  function getToggleIcon() {
    return wrapper.find('.v-field__append-inner .v-icon');
  }

  function getValidationMessage(): string {
    const messages = wrapper.findAll('.v-messages__message');

    return messages.length === 0 ? '' : messages[0].text();
  }

  it('should render with the default label and hidden value', () => {
    expect(wrapper.text()).toContain('Senha');
    expect(getInputType()).toBe('password');
  });

  it('should render the show icon by default', () => {
    expect(getToggleIcon().classes()).toContain('mdi-eye-outline');
  });

  it('should toggle the input type when the icon is clicked', async () => {
    await getToggleIcon().trigger('click');

    expect(getInputType()).toBe('text');
    expect(getToggleIcon().classes()).toContain('mdi-eye-off-outline');

    await getToggleIcon().trigger('click');

    expect(getInputType()).toBe('password');
    expect(getToggleIcon().classes()).toContain('mdi-eye-outline');
  });

  it('should allow custom show and hide icons', async () => {
    wrapper = createComponent(FzPasswordField, {
      props: { showIcon: 'mdi-lock-outline', hideIcon: 'mdi-lock-open-outline' },
    });

    expect(getToggleIcon().classes()).toContain('mdi-lock-outline');

    await getToggleIcon().trigger('click');

    expect(getToggleIcon().classes()).toContain('mdi-lock-open-outline');
  });

  it('should keep the toggle out of the tab order by default', () => {
    expect(getToggleIcon().attributes('tabindex')).toBe('-1');
    expect(getToggleIcon().attributes('aria-hidden')).toBe('true');
  });

  it('should make the toggle focusable when toggleFocusable is true', async () => {
    wrapper = createComponent(FzPasswordField, { props: { toggleFocusable: true } });

    expect(getToggleIcon().attributes('tabindex')).toBe('0');
    expect(getToggleIcon().attributes('role')).toBe('button');
    expect(getToggleIcon().attributes('aria-label')).toBe('Mostrar senha');
  });

  it('should update the accessible label when the password is visible', async () => {
    wrapper = createComponent(FzPasswordField, { props: { toggleFocusable: true } });

    await getToggleIcon().trigger('click');

    expect(getToggleIcon().attributes('aria-label')).toBe('Ocultar senha');
  });

  it('should allow custom accessible labels', async () => {
    wrapper = createComponent(FzPasswordField, {
      props: { toggleFocusable: true, showLabel: 'Ver', hideLabel: 'Esconder' },
    });

    expect(getToggleIcon().attributes('aria-label')).toBe('Ver');

    await getToggleIcon().trigger('click');

    expect(getToggleIcon().attributes('aria-label')).toBe('Esconder');
  });

  it('should toggle with Enter when focusable', async () => {
    wrapper = createComponent(FzPasswordField, { props: { toggleFocusable: true } });

    await getToggleIcon().trigger('keydown', { key: 'Enter' });

    expect(getInputType()).toBe('text');
  });

  it('should toggle with Space when focusable', async () => {
    wrapper = createComponent(FzPasswordField, { props: { toggleFocusable: true } });

    await getToggleIcon().trigger('keydown', { key: ' ' });

    expect(getInputType()).toBe('text');
  });

  it('should ignore other keys on the toggle', async () => {
    wrapper = createComponent(FzPasswordField, { props: { toggleFocusable: true } });

    await getToggleIcon().trigger('keydown', { key: 'a' });

    expect(getInputType()).toBe('password');
  });

  it('should not emit update:modelValue when toggling visibility', async () => {
    await wrapper.setProps({ modelValue: 'secret' });
    await getToggleIcon().trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(getInputType()).toBe('text');
    expect((getInput().element as HTMLInputElement).value).toBe('secret');
  });

  it.each(VALIDATION_CASES)(
    'should validate "$value" (required: $required, minlength: $minlength) as "$expected"',
    async ({ value, required, minlength, expected }) => {
      await wrapper.setProps({ modelValue: value, required, minlength });
      await getInput().trigger('focus');
      await getInput().trigger('blur');

      if (expected === true) {
        expect(getValidationMessage()).toBe('');
      } else {
        expect(getValidationMessage()).toBe(expected);
      }
    },
  );

  it('should show a custom requiredMessage', async () => {
    await wrapper.setProps({ modelValue: '', required: true, requiredMessage: 'Informe a senha' });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(getValidationMessage()).toBe('Informe a senha');
  });

  it('should show a custom minlengthMessage', async () => {
    await wrapper.setProps({ modelValue: 'abc', minlength: 8, minlengthMessage: 'Muito curta' });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(getValidationMessage()).toBe('Muito curta');
  });

  it('should emit update:modelValue on user input', async () => {
    await getInput().setValue('my-password');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toBe('my-password');
  });

  it('should emit isValid true on blur when valid', async () => {
    await wrapper.setProps({ modelValue: 'secret', required: true });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should emit isValid false on blur when invalid', async () => {
    await wrapper.setProps({ modelValue: '', required: true });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid on input when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false, required: true });
    await getInput().setValue('secret');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    await wrapper.setProps({ validateOnBlur: false, required: true });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should apply custom rules alongside the built-in ones', async () => {
    const customRule = (value: string) => value.includes('!') ? true : 'Deve conter "!"';

    await wrapper.setProps({ modelValue: 'secret', rules: [customRule] });
    await getInput().trigger('focus');
    await getInput().trigger('blur');

    expect(getValidationMessage()).toBe('Deve conter "!"');
  });

  it('should pass maxlength and autocomplete to the input', async () => {
    await wrapper.setProps({ modelValue: '', maxlength: 20, autocomplete: 'new-password' });

    expect(getInput().attributes('maxlength')).toBe('20');
    expect(getInput().attributes('autocomplete')).toBe('new-password');
  });

  it('should default autocomplete to current-password', () => {
    expect(getInput().attributes('autocomplete')).toBe('current-password');
  });

  it('should resolve variant and density from props', () => {
    wrapper = createComponent(FzPasswordField, { props: { variant: 'outlined', density: 'compact' } });

    const field = wrapper.findComponent({ name: 'v-text-field' });

    expect(field.props('variant')).toBe('outlined');
    expect(field.props('density')).toBe('compact');
  });

  it('should resolve variant and density from the provider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'filled', density: 'comfortable' } },
      slots: { default: () => h(FzPasswordField) },
      global: { plugins: [createVuetify()] },
    });

    const field = wrapperWithProvider.findComponent({ name: 'v-text-field' });

    expect(field.props('variant')).toBe('filled');
    expect(field.props('density')).toBe('comfortable');

    wrapperWithProvider.unmount();
  });

  it('should render hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Mínimo 8 caracteres' });

    expect(wrapper.text()).toContain('Mínimo 8 caracteres');
  });

  it('should render prepend and append slots', () => {
    wrapper = createComponent(FzPasswordField, {
      slots: {
        prepend: '<span class="custom-prepend">Pre</span>',
        append: '<span class="custom-append">Pos</span>',
      },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should render with disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect((getInput().element as HTMLInputElement).disabled).toBe(true);
  });

  it('should handle null modelValue as empty', async () => {
    await wrapper.setProps({ modelValue: null as unknown as string });

    expect((getInput().element as HTMLInputElement).value).toBe('');
  });
});

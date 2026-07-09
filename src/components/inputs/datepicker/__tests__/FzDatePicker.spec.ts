import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzDatePicker from '../FzDatePicker.vue';
import FzConfigProvider from '@/components/FzConfigProvider.vue';

beforeAll(() => {
  vi.stubGlobal('visualViewport', {
    width: 1024,
    height: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

describe('FzDatePicker', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzDatePicker, {
      attachTo: document.body,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getInput() {
    return wrapper.find('input');
  }

  function getInputValue(): string {
    return (getInput().element as HTMLInputElement).value;
  }

  function getValidationMessage(): string {
    const messages = wrapper.findAll('.v-messages__message');

    return messages.length === 0 ? '' : messages[0].text();
  }

  function findTriggerIcon() {
    return wrapper
      .findAllComponents({ name: 'v-icon' })
      .find((icon) => icon.classes().some((cls) => cls.startsWith('mdi-calendar')));
  }

  it('should render with default label', () => {
    expect(wrapper.text()).toContain('Data');
  });

  it('should disable browser autocomplete suggestions', () => {
    expect(getInput().attributes('autocomplete')).toBe('off');
  });

  it('should render with a custom label', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { label: 'Nascimento' } });

    expect(wrapper.text()).toContain('Nascimento');
  });

  it('should display an empty input when modelValue is empty', () => {
    expect(getInputValue()).toBe('');
  });

  it('should display the modelValue formatted as dd/mm/yyyy by default', async () => {
    await wrapper.setProps({ modelValue: '2024-03-15' });

    expect(getInputValue()).toBe('15/03/2024');
  });

  it('should display the modelValue formatted as yyyy-mm-dd when format is set', async () => {
    await wrapper.setProps({ modelValue: '2024-03-15', format: 'yyyy-mm-dd' });

    expect(getInputValue()).toBe('2024-03-15');
  });

  it('should show the dd/mm/aaaa placeholder for pt-BR by default', () => {
    expect(getInput().attributes('placeholder')).toBe('dd/mm/aaaa');
  });

  it('should show the yyyy-mm-dd placeholder when format is iso', async () => {
    await wrapper.setProps({ format: 'yyyy-mm-dd' });

    expect(getInput().attributes('placeholder')).toBe('yyyy-mm-dd');
  });

  it('should show the dd/mm/yyyy placeholder in english locale', async () => {
    await wrapper.setProps({ locale: 'en' });

    expect(getInput().attributes('placeholder')).toBe('dd/mm/yyyy');
  });

  it('should show a custom placeholder when provided', async () => {
    await wrapper.setProps({ placeholder: 'digite a data' });

    expect(getInput().attributes('placeholder')).toBe('digite a data');
  });

  it('should emit update:modelValue with the iso value when a complete valid date is typed', async () => {
    await getInput().setValue('15032024');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toBe('2024-03-15');
  });

  it('should emit update:modelValue with iso when typing in yyyy-mm-dd format', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { attachTo: document.body, props: { format: 'yyyy-mm-dd' } });

    await getInput().setValue('20240315');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('2024-03-15');
  });

  it('should emit an empty string while the typed date is incomplete', async () => {
    await getInput().setValue('15');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should emit an empty string when the typed date is not a real calendar date', async () => {
    await getInput().setValue('31042024');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should show the invalid message on blur when the typed date is not real', async () => {
    const input = getInput();

    await input.setValue('31042024');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Data inválida');
  });

  it('should show a custom invalid message on blur', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { invalidMessage: 'Data incorreta' } });

    const input = getInput();

    await input.setValue('31042024');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Data incorreta');
  });

  it('should not show a validation message when the field is empty and not required', async () => {
    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('');
  });

  it('should show the required message on blur when empty and required', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { required: true } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Data é obrigatória');
  });

  it('should show a custom required message', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { required: true, requiredMessage: 'Preencha a data' } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Preencha a data');
  });

  it('should not show a validation message for a valid complete date on blur', async () => {
    const input = getInput();

    await input.setValue('15032024');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('');
  });

  it('should emit isValid true on blur for a valid date', async () => {
    const input = getInput();

    await input.setValue('15032024');
    await input.trigger('focus');
    await input.trigger('blur');

    const emitted = wrapper.emitted('isValid');

    expect(emitted?.[0]).toEqual([true]);
  });

  it('should emit isValid false on blur for an invalid date', async () => {
    const input = getInput();

    await input.setValue('31042024');
    await input.trigger('focus');
    await input.trigger('blur');

    const emitted = wrapper.emitted('isValid');

    expect(emitted?.[0]).toEqual([false]);
  });

  it('should resolve validation on input instead of blur when validateOnBlur is false', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { validateOnBlur: false } });

    await getInput().setValue('31042024');

    const emitted = wrapper.emitted('isValid');

    expect(emitted?.[0]).toEqual([false]);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { validateOnBlur: false } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should show the invalid message when a typed date is outside the min/max range', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { min: '2024-01-01', max: '2024-01-31' } });

    const input = getInput();

    await input.setValue('15032024');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Data inválida');
  });

  it('should emit an empty string when a typed date is outside the min/max range', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { min: '2024-01-01', max: '2024-01-31' } });

    await getInput().setValue('15032024');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should apply custom rules alongside date validation', async () => {
    const customRule = (value: string) => (value.includes('2024') ? true : 'Ano deve ser 2024');

    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { rules: [customRule] } });

    const input = getInput();

    await input.setValue('15032023');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Ano deve ser 2024');
  });

  it('should render the calendar trigger icon', () => {
    expect(findTriggerIcon()?.exists()).toBe(true);
  });

  it('should render a custom calendar icon', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { attachTo: document.body, props: { icon: 'mdi-calendar-month' } });

    const icon = wrapper
      .findAllComponents({ name: 'v-icon' })
      .find((item) => item.classes().includes('mdi-calendar-month'));

    expect(icon?.exists()).toBe(true);
  });

  it('should emit the selected iso date and update the display when a day is picked from the calendar', async () => {
    const icon = findTriggerIcon();

    await icon?.trigger('click');

    const dayButtons = wrapper.findAllComponents({ name: 'v-btn' });
    const day20 = dayButtons.find((btn) => btn.text() === '20');

    await day20?.trigger('click');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toMatch(/^\d{4}-\d{2}-20$/);
  });

  it('should emit isValid true when a date is picked from the calendar', async () => {
    const icon = findTriggerIcon();

    await icon?.trigger('click');

    const dayButtons = wrapper.findAllComponents({ name: 'v-btn' });
    const day20 = dayButtons.find((btn) => btn.text() === '20');

    await day20?.trigger('click');

    expect(wrapper.emitted('isValid')?.[0]).toEqual([true]);
  });

  it('should disable the field when disabled is true', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { disabled: true } });

    expect((getInput().element as HTMLInputElement).disabled).toBe(true);
  });

  it('should show hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Use o formato dd/mm/aaaa' });

    expect(wrapper.text()).toContain('Use o formato dd/mm/aaaa');
  });

  it('should not show hint when hint is empty', () => {
    expect(wrapper.find('.v-messages__message').exists()).toBe(false);
  });

  it('should render prepend slot content', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should treat a null modelValue as an empty display', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePicker, { props: { modelValue: null as unknown as string } });

    expect(getInputValue()).toBe('');
  });

  it('should update the display when modelValue changes externally', async () => {
    await wrapper.setProps({ modelValue: '2024-05-01' });

    expect(getInputValue()).toBe('01/05/2024');

    await wrapper.setProps({ modelValue: '2024-06-10' });

    expect(getInputValue()).toBe('10/06/2024');
  });

  it('should not reformat the display when modelValue is set to the value already typed', async () => {
    const input = getInput();

    await input.setValue('15032024');

    expect(getInputValue()).toBe('15/03/2024');

    await wrapper.setProps({ modelValue: '2024-03-15' });

    expect(getInputValue()).toBe('15/03/2024');
  });

  it('should clear the display when modelValue is externally set to null', async () => {
    await wrapper.setProps({ modelValue: '2024-03-15' });

    expect(getInputValue()).toBe('15/03/2024');

    await wrapper.setProps({ modelValue: null as unknown as string });

    expect(getInputValue()).toBe('');
  });

  it('should reformat the display when the format prop changes', async () => {
    await wrapper.setProps({ modelValue: '2024-05-01' });

    expect(getInputValue()).toBe('01/05/2024');

    await wrapper.setProps({ format: 'yyyy-mm-dd' });

    expect(getInputValue()).toBe('2024-05-01');
  });

  it('should resolve variant from FzConfigProvider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined' } },
      slots: { default: () => h(FzDatePicker) },
      global: { plugins: [createVuetify()] },
    });

    expect(wrapperWithProvider.findComponent({ name: 'v-text-field' }).props('variant')).toBe('outlined');

    wrapperWithProvider.unmount();
  });

  it('should prioritize the variant prop over FzConfigProvider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined' } },
      slots: { default: () => h(FzDatePicker, { variant: 'filled' }) },
      global: { plugins: [createVuetify()] },
    });

    expect(wrapperWithProvider.findComponent({ name: 'v-text-field' }).props('variant')).toBe('filled');

    wrapperWithProvider.unmount();
  });

  it('should fallback to underlined when no variant is provided', () => {
    expect(wrapper.findComponent({ name: 'v-text-field' }).props('variant')).toBe('underlined');
  });
});

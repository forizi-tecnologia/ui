import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzTimePicker from '../FzTimePicker.vue';
import FzTimePickerMenu from '../FzTimePickerMenu.vue';
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

describe('FzTimePicker', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzTimePicker, {
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
      .find((icon) => icon.classes().some((cls) => cls.startsWith('mdi-clock')));
  }

  it('should render with the default label', () => {
    expect(wrapper.text()).toContain('Hora');
  });

  it('should disable browser autocomplete suggestions', () => {
    expect(getInput().attributes('autocomplete')).toBe('off');
  });

  it('should render with a custom label', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { label: 'Início' } });

    expect(wrapper.text()).toContain('Início');
  });

  it('should display an empty input when modelValue is empty', () => {
    expect(getInputValue()).toBe('');
  });

  it('should display the modelValue formatted as HH:mm by default', async () => {
    await wrapper.setProps({ modelValue: '14:30' });

    expect(getInputValue()).toBe('14:30');
  });

  it('should display the modelValue formatted as 12h when use24Hour is false', async () => {
    await wrapper.setProps({ modelValue: '14:30', use24Hour: false });

    expect(getInputValue()).toBe('02:30 PM');
  });

  it('should show the hh:mm placeholder by default', () => {
    expect(getInput().attributes('placeholder')).toBe('hh:mm');
  });

  it('should show the hh:mm AM/PM placeholder in 12h mode', async () => {
    await wrapper.setProps({ use24Hour: false });

    expect(getInput().attributes('placeholder')).toBe('hh:mm AM/PM');
  });

  it('should show a custom placeholder when provided', async () => {
    await wrapper.setProps({ placeholder: 'digite a hora' });

    expect(getInput().attributes('placeholder')).toBe('digite a hora');
  });

  it('should emit the canonical value when a complete valid time is typed', async () => {
    await getInput().setValue('1430');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted).toBeTruthy();
    expect(emitted![emitted!.length - 1][0]).toBe('14:30');
  });

  it('should emit an empty string while the typed time is incomplete', async () => {
    await getInput().setValue('14');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should emit an empty string when the typed hour is invalid', async () => {
    await getInput().setValue('2500');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should emit the canonical value when a 12h time with meridiem is typed', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { attachTo: document.body, props: { use24Hour: false } });

    await getInput().setValue('0230PM');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('14:30');
  });

  it('should emit an empty string for a 12h hour without meridiem', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { attachTo: document.body, props: { use24Hour: false } });

    await getInput().setValue('0230');

    const emitted = wrapper.emitted('update:modelValue');

    expect(emitted![emitted!.length - 1][0]).toBe('');
  });

  it('should show the invalid message on blur when the typed time is not real', async () => {
    const input = getInput();

    await input.setValue('2500');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Hora inválida');
  });

  it('should show a custom invalid message on blur', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { invalidMessage: 'Hora incorreta' } });

    const input = getInput();

    await input.setValue('2500');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Hora incorreta');
  });

  it('should not show a validation message when the field is empty and not required', async () => {
    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('');
  });

  it('should show the required message on blur when empty and required', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { required: true } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Hora é obrigatória');
  });

  it('should show a custom required message', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { required: true, requiredMessage: 'Preencha a hora' } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Preencha a hora');
  });

  it('should not show a validation message for a valid time on blur', async () => {
    const input = getInput();

    await input.setValue('1430');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('');
  });

  it('should emit isValid true on blur for a valid time', async () => {
    const input = getInput();

    await input.setValue('1430');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')?.[0]).toEqual([true]);
  });

  it('should emit isValid false on blur for an invalid time', async () => {
    const input = getInput();

    await input.setValue('2500');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')?.[0]).toEqual([false]);
  });

  it('should resolve validation on input instead of blur when validateOnBlur is false', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { validateOnBlur: false } });

    await getInput().setValue('2500');

    expect(wrapper.emitted('isValid')?.[0]).toEqual([false]);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { validateOnBlur: false } });

    const input = getInput();

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should apply custom rules alongside time validation', async () => {
    const customRule = (value: string) => (value.startsWith('09') ? true : 'Deve começar às 09');

    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { rules: [customRule] } });

    const input = getInput();

    await input.setValue('1430');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(getValidationMessage()).toBe('Deve começar às 09');
  });

  it('should render the trigger icon', () => {
    expect(findTriggerIcon()?.exists()).toBe(true);
  });

  it('should render a custom icon', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { attachTo: document.body, props: { icon: 'mdi-timer-outline' } });

    const icon = wrapper
      .findAllComponents({ name: 'v-icon' })
      .find((item) => item.classes().includes('mdi-timer-outline'));

    expect(icon?.exists()).toBe(true);
  });

  it('should update the display and emit when a time is picked from the menu', async () => {
    wrapper.findComponent(FzTimePickerMenu).vm.$emit('select', '09:15');
    await wrapper.vm.$nextTick();

    expect(getInputValue()).toBe('09:15');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['09:15']);
    expect(wrapper.emitted('isValid')?.at(-1)).toEqual([true]);
  });

  it('should render the picked 12h time when use24Hour is false', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { attachTo: document.body, props: { use24Hour: false } });

    wrapper.findComponent(FzTimePickerMenu).vm.$emit('select', '14:30');
    await wrapper.vm.$nextTick();

    expect(getInputValue()).toBe('02:30 PM');
  });

  it('should reflect the open state emitted by the picker', async () => {
    const menu = wrapper.findComponent(FzTimePickerMenu);

    menu.vm.$emit('update:open', true);
    await wrapper.vm.$nextTick();

    expect(menu.props('open')).toBe(true);
  });

  it('should disable the field when disabled is true', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { disabled: true } });

    expect((getInput().element as HTMLInputElement).disabled).toBe(true);
  });

  it('should show hint text when provided', async () => {
    await wrapper.setProps({ hint: 'Use o formato hh:mm' });

    expect(wrapper.text()).toContain('Use o formato hh:mm');
  });

  it('should not show hint when hint is empty', () => {
    expect(wrapper.find('.v-messages__message').exists()).toBe(false);
  });

  it('should render prepend slot content', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, {
      slots: { prepend: '<span class="custom-prepend">Custom</span>' },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
  });

  it('should render append slot content', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, {
      slots: { append: '<span class="custom-append">Appended</span>' },
    });

    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should treat a null modelValue as an empty display', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimePicker, { props: { modelValue: null as unknown as string } });

    expect(getInputValue()).toBe('');
  });

  it('should update the display when modelValue changes externally', async () => {
    await wrapper.setProps({ modelValue: '08:00' });

    expect(getInputValue()).toBe('08:00');

    await wrapper.setProps({ modelValue: '18:45' });

    expect(getInputValue()).toBe('18:45');
  });

  it('should not reformat the display when modelValue is set to the value already typed', async () => {
    const input = getInput();

    await input.setValue('1430');

    expect(getInputValue()).toBe('14:30');

    await wrapper.setProps({ modelValue: '14:30' });

    expect(getInputValue()).toBe('14:30');
  });

  it('should clear the display when modelValue is externally set to null', async () => {
    await wrapper.setProps({ modelValue: '08:00' });

    expect(getInputValue()).toBe('08:00');

    await wrapper.setProps({ modelValue: null as unknown as string });

    expect(getInputValue()).toBe('');
  });

  it('should reformat the display when use24Hour changes', async () => {
    await wrapper.setProps({ modelValue: '14:30' });

    expect(getInputValue()).toBe('14:30');

    await wrapper.setProps({ use24Hour: false });

    expect(getInputValue()).toBe('02:30 PM');
  });

  it('should resolve variant from FzConfigProvider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined' } },
      slots: { default: () => h(FzTimePicker) },
      global: { plugins: [createVuetify()] },
    });

    expect(wrapperWithProvider.findComponent({ name: 'v-text-field' }).props('variant')).toBe('outlined');

    wrapperWithProvider.unmount();
  });

  it('should prioritize the variant prop over FzConfigProvider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined' } },
      slots: { default: () => h(FzTimePicker, { variant: 'filled' }) },
      global: { plugins: [createVuetify()] },
    });

    expect(wrapperWithProvider.findComponent({ name: 'v-text-field' }).props('variant')).toBe('filled');

    wrapperWithProvider.unmount();
  });

  it('should fallback to underlined when no variant is provided', () => {
    expect(wrapper.findComponent({ name: 'v-text-field' }).props('variant')).toBe('underlined');
  });

  it('should pass the default top-right menu placement to the picker', () => {
    const menu = wrapper.findComponent(FzTimePickerMenu);

    expect(menu.props('location')).toBe('top right');
    expect(menu.props('origin')).toBe('auto');
  });

  it('should respect a custom menu location and origin', async () => {
    await wrapper.setProps({ menuLocation: 'bottom start', menuOrigin: 'top left' });

    const menu = wrapper.findComponent(FzTimePickerMenu);

    expect(menu.props('location')).toBe('bottom start');
    expect(menu.props('origin')).toBe('top left');
  });

  it('should forward the 24h mode, minute step and size to the picker', async () => {
    await wrapper.setProps({ use24Hour: false, minuteStep: 15, height: 200, itemHeight: 40 });

    const menu = wrapper.findComponent(FzTimePickerMenu);

    expect(menu.props('use24Hour')).toBe(false);
    expect(menu.props('minuteStep')).toBe(15);
    expect(menu.props('height')).toBe(200);
    expect(menu.props('itemHeight')).toBe(40);
  });

  it('should forward custom wheel labels to the picker', async () => {
    await wrapper.setProps({ hourLabel: 'Hour', minuteLabel: 'Minute', meridiemLabel: 'Period' });

    const menu = wrapper.findComponent(FzTimePickerMenu);

    expect(menu.props('hourLabel')).toBe('Hour');
    expect(menu.props('minuteLabel')).toBe('Minute');
    expect(menu.props('meridiemLabel')).toBe('Period');
  });
});

import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzMonthPicker from '../FzMonthPicker.vue';
import { getCurrentMonth, getMonthLabel } from '@/composables/useMonthPicker';

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

describe('FzMonthPicker', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11' },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getField() {
    return wrapper.findComponent({ name: 'v-text-field' });
  }

  function getMenu() {
    return wrapper.findComponent({ name: 'v-menu' });
  }

  function getInputValue(): string {
    return (wrapper.find('input').element as HTMLInputElement).value;
  }

  async function openMenu(): Promise<void> {
    getMenu().vm.$emit('update:modelValue', true);
    await wrapper.vm.$nextTick();
  }

  function findMonthButton(label: string) {
    return wrapper
      .findAllComponents({ name: 'v-btn' })
      .find((button) => button.text() === label);
  }

  it('should render the default label and the selected month', () => {
    expect(wrapper.text()).toContain('Mês');
    expect(getInputValue()).toBe('11/2026');
  });

  it('should render the iso format without changing the model', async () => {
    await wrapper.setProps({ format: 'yyyy-mm' });

    expect(getInputValue()).toBe('2026-11');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should render an empty value when the model is invalid', async () => {
    await wrapper.setProps({ modelValue: 'invalid' });

    expect(getInputValue()).toBe('');
  });

  it('should render the month trigger icon', () => {
    const icon = wrapper.findAllComponents({ name: 'v-icon' }).find((item) => item.classes().includes('mdi-calendar-month'));

    expect(icon?.exists()).toBe(true);
  });

  it('should anchor the menu to the configured location and origin', () => {
    expect(getMenu().props('location')).toBe('top right');
    expect(getMenu().props('origin')).toBe('auto');
  });

  it('should respect custom menu location and origin', async () => {
    await wrapper.setProps({ menuLocation: 'bottom end', menuOrigin: 'top left' });

    expect(getMenu().props('location')).toBe('bottom end');
    expect(getMenu().props('origin')).toBe('top left');
  });

  it('should open the menu and render the twelve month buttons', async () => {
    await openMenu();

    expect(findMonthButton('Jan')?.exists()).toBe(true);
    expect(findMonthButton('Dez')?.exists()).toBe(true);
  });

  it('should emit yyyy-mm and close the menu when a month is selected', async () => {
    await openMenu();

    await findMonthButton('Jan')?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2026-01']);
    expect(getMenu().props('modelValue')).toBe(false);
  });

  it('should navigate the focused year', async () => {
    await openMenu();

    const nextYearButton = wrapper
      .findAllComponents({ name: 'v-btn' })
      .find((button) => button.attributes('aria-label') === 'Próximo ano');

    await nextYearButton?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(document.body.textContent).toContain('2027');
  });

  it('should disable the year navigation at the bounds', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-06', min: '2026-01', max: '2026-12' },
    });

    await openMenu();

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const previousYearButton = buttons.find((button) => button.attributes('aria-label') === 'Ano anterior');
    const nextYearButton = buttons.find((button) => button.attributes('aria-label') === 'Próximo ano');

    expect(previousYearButton?.props('disabled')).toBe(true);
    expect(nextYearButton?.props('disabled')).toBe(true);
  });

  it('should disable months outside the min/max range', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-06', min: '2026-03', max: '2026-09' },
    });

    await openMenu();

    expect(findMonthButton('Fev')?.props('disabled')).toBe(true);
    expect(findMonthButton('Mar')?.props('disabled')).toBe(false);
    expect(findMonthButton('Set')?.props('disabled')).toBe(false);
    expect(findMonthButton('Out')?.props('disabled')).toBe(true);
  });

  it('should highlight the selected month', async () => {
    await openMenu();

    const selected = findMonthButton('Nov');

    expect(selected?.props('variant')).toBe('flat');
    expect(selected?.props('color')).toBe('primary');
  });

  it('should highlight the current month when it is not selected', async () => {
    const current = getCurrentMonth();
    const [year, month] = current.split('-').map(Number);
    const otherMonth = month === 1 ? 2 : 1;
    const paddedOther = String(otherMonth).padStart(2, '0');

    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: `${year}-${paddedOther}` },
    });

    await openMenu();

    const currentLabel = getMonthLabel(current, 'pt-BR').slice(0, 3);
    const currentButton = findMonthButton(currentLabel);

    expect(currentButton?.props('variant')).toBe('outlined');
    expect(currentButton?.props('color')).toBe('primary');
  });

  it('should render English month names', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11', locale: 'en' },
    });

    await openMenu();

    expect(findMonthButton('Jan')?.exists()).toBe(true);
    expect(findMonthButton('Dec')?.exists()).toBe(true);
  });

  it('should use localized year navigation labels', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11', locale: 'en' },
    });

    await openMenu();

    const labels = wrapper.findAllComponents({ name: 'v-btn' }).map((button) => button.attributes('aria-label'));

    expect(labels).toContain('Previous year');
    expect(labels).toContain('Next year');
  });

  it('should emit isValid false on blur when required and empty', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid true when a month is selected', async () => {
    await openMenu();

    await findMonthButton('Jan')?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid again when the validity does not change', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11', required: true },
    });

    await openMenu();
    await findMonthButton('Jan')?.trigger('click');
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toHaveLength(1);
  });

  it('should not emit when a disabled month is activated', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-06', max: '2026-09' },
    });

    await openMenu();

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    findMonthButton('Out')?.vm.$emit('click');
    await wrapper.vm.$nextTick();

    warnSpy.mockRestore();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should use a custom required message', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { required: true, requiredMessage: 'Informe o mês' },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Informe o mês');
  });

  it('should fall back to "Campo obrigatório" when there is no label', () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { label: '', required: true },
    });

    const rules = getField().props('rules') as ((value: string) => boolean | string)[];

    expect(rules[0]('')).toBe('Campo obrigatório');
  });

  it('should not emit isValid on focus', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { required: true },
    });

    await wrapper.find('input').trigger('focus');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { required: true, validateOnBlur: false },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should include custom rules in the merged rules', () => {
    const customRule = (value: string) => value === '11/2026' ? true : 'Mês inválido';

    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11', rules: [customRule] },
    });

    const rules = getField().props('rules') as ((value: string) => boolean | string)[];

    expect(rules).toHaveLength(2);
    expect(rules[1]('11/2026')).toBe(true);
    expect(rules[1]('12/2026')).toBe('Mês inválido');
  });

  it('should render disabled', async () => {
    await wrapper.setProps({ disabled: true });

    expect(getMenu().props('disabled')).toBe(true);
    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should render prepend and append slots', () => {
    wrapper = createComponent(FzMonthPicker, {
      attachTo: document.body,
      props: { modelValue: '2026-11' },
      slots: {
        prepend: '<span class="custom-prepend">Pre</span>',
        append: '<span class="custom-append">Post</span>',
      },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should apply the field width', () => {
    expect((wrapper.find('.v-input').element as HTMLElement).style.width).toBe('160px');
  });
});

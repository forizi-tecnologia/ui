import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzMonthPickerMenu from '../FzMonthPickerMenu.vue';
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

describe('FzMonthPickerMenu', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-11' },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function findMonthButton(label: string) {
    return wrapper
      .findAllComponents({ name: 'v-btn' })
      .find((button) => button.text() === label);
  }

  function findYearButton(label: string) {
    return wrapper
      .findAllComponents({ name: 'v-btn' })
      .find((button) => button.attributes('aria-label') === label);
  }

  it('should render the twelve months and the selected year', () => {
    expect(findMonthButton('Jan')?.exists()).toBe(true);
    expect(findMonthButton('Dez')?.exists()).toBe(true);
    expect(document.body.textContent).toContain('2026');
  });

  it('should fill the selected month', () => {
    const selected = findMonthButton('Nov');

    expect(selected?.props('variant')).toBe('flat');
    expect(selected?.props('color')).toBe('primary');
  });

  it('should outline the current month when it is not selected', () => {
    const current = getCurrentMonth();
    const [year, month] = current.split('-').map(Number);
    const otherMonth = month === 1 ? 2 : 1;

    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: `${year}-${String(otherMonth).padStart(2, '0')}` },
    });

    const currentLabel = getMonthLabel(current, 'pt-BR').slice(0, 3);
    const currentButton = findMonthButton(currentLabel);

    expect(currentButton?.props('variant')).toBe('outlined');
    expect(currentButton?.props('color')).toBe('primary');
  });

  it('should emit select and close when a month is clicked', async () => {
    await findMonthButton('Jan')?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('select')![0]).toEqual(['2026-01']);
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
  });

  it('should not emit select when a disabled month is clicked', async () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-11', max: '2026-09' },
    });

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    findMonthButton('Out')?.vm.$emit('click');
    await wrapper.vm.$nextTick();

    warnSpy.mockRestore();

    expect(wrapper.emitted('select')).toBeUndefined();
  });

  it('should navigate the focused year', async () => {
    await findYearButton('Próximo ano')?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(document.body.textContent).toContain('2027');
  });

  it('should disable the year arrows at the min/max bounds', () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-06', min: '2026-01', max: '2026-12' },
    });

    expect(findYearButton('Ano anterior')?.props('disabled')).toBe(true);
    expect(findYearButton('Próximo ano')?.props('disabled')).toBe(true);
  });

  it('should disable months outside the min/max range', () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-06', min: '2026-03', max: '2026-09' },
    });

    expect(findMonthButton('Fev')?.props('disabled')).toBe(true);
    expect(findMonthButton('Mar')?.props('disabled')).toBe(false);
    expect(findMonthButton('Set')?.props('disabled')).toBe(false);
    expect(findMonthButton('Out')?.props('disabled')).toBe(true);
  });

  it('should render English labels', () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-11', locale: 'en' },
    });

    expect(findMonthButton('Jan')?.exists()).toBe(true);
    expect(findMonthButton('Dec')?.exists()).toBe(true);
    expect(findYearButton('Previous year')?.exists()).toBe(true);
    expect(findYearButton('Next year')?.exists()).toBe(true);
  });

  it('should disable the menu when disabled is true', () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-11', disabled: true },
    });

    expect(wrapper.findComponent({ name: 'v-menu' }).props('disabled')).toBe(true);
  });

  it('should respect custom location and origin', () => {
    wrapper = createComponent(FzMonthPickerMenu, {
      attachTo: document.body,
      props: { open: true, selected: '2026-11', location: 'bottom end', origin: 'top left' },
    });

    const menu = wrapper.findComponent({ name: 'v-menu' });

    expect(menu.props('location')).toBe('bottom end');
    expect(menu.props('origin')).toBe('top left');
  });

  it('should reset the focused year when reopened', async () => {
    await findYearButton('Próximo ano')?.trigger('click');
    await wrapper.vm.$nextTick();

    expect(document.body.textContent).toContain('2027');

    await wrapper.setProps({ open: false });
    await wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();

    expect(document.body.textContent).toContain('2026');
  });
});

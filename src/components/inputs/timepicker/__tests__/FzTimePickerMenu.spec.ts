import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { createComponent } from '@/testutils';
import FzTimePickerMenu from '../FzTimePickerMenu.vue';
import FzTimeWheel from '../FzTimeWheel.vue';

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

describe('FzTimePickerMenu', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzTimePickerMenu, {
      attachTo: document.body,
      props: { open: false, selected: '14:30' },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getWheels() {
    return wrapper.findAllComponents(FzTimeWheel);
  }

  async function openMenu(): Promise<void> {
    await wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
  }

  it('should render the default trigger icon', () => {
    const icon = wrapper
      .findAllComponents({ name: 'v-icon' })
      .find((item) => item.classes().includes('mdi-clock-outline'));

    expect(icon).toBeTruthy();
  });

  it('should bind the open state to the menu', async () => {
    expect(wrapper.findComponent({ name: 'v-menu' }).props('modelValue')).toBe(false);

    await openMenu();

    expect(wrapper.findComponent({ name: 'v-menu' }).props('modelValue')).toBe(true);
  });

  it('should not reset the wheels when the menu closes', async () => {
    await openMenu();
    await wrapper.setProps({ open: false });

    expect(wrapper.findComponent({ name: 'v-menu' }).props('modelValue')).toBe(false);
  });

  it('should render two wheels in 24h mode', async () => {
    await openMenu();

    expect(getWheels()).toHaveLength(2);
  });

  it('should render three wheels in 12h mode', async () => {
    await wrapper.setProps({ use24Hour: false });
    await openMenu();

    expect(getWheels()).toHaveLength(3);
  });

  it('should sync the wheels from the selected value when opened', async () => {
    await openMenu();

    const wheels = getWheels();

    expect(wheels[0].props('modelValue')).toBe(14);
    expect(wheels[1].props('modelValue')).toBe(30);
  });

  it('should default to midnight when there is no selected value', async () => {
    await wrapper.setProps({ selected: '' });
    await openMenu();

    const wheels = getWheels();

    expect(wheels[0].props('modelValue')).toBe(0);
    expect(wheels[1].props('modelValue')).toBe(0);
  });

  it('should convert the selected value to a 12h hour and meridiem', async () => {
    await wrapper.setProps({ use24Hour: false });
    await openMenu();

    const wheels = getWheels();

    expect(wheels[0].props('modelValue')).toBe(2);
    expect(wheels[2].props('modelValue')).toBe(1);
  });

  it('should emit the canonical value when the hour wheel changes', async () => {
    await openMenu();
    await getWheels()[0].vm.$emit('update:modelValue', 9);

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['09:30']);
  });

  it('should emit the canonical value when the minute wheel changes', async () => {
    await openMenu();
    await getWheels()[1].vm.$emit('update:modelValue', 45);

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['14:45']);
  });

  it('should emit the canonical value when a wheel is scrolled', async () => {
    await openMenu();

    const wheel = getWheels()[0];
    const container = wheel.find('.fz-time-wheel').element as HTMLElement;

    container.scrollTop = 9 * 32;
    await wheel.find('.fz-time-wheel').trigger('scroll');

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['09:30']);
  });

  it('should emit update:open when the menu value changes', async () => {
    wrapper.findComponent({ name: 'v-menu' }).vm.$emit('update:modelValue', false);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });

  it('should emit the canonical value when the meridiem wheel changes in 12h mode', async () => {
    await wrapper.setProps({ use24Hour: false });
    await openMenu();

    await getWheels()[2].vm.$emit('update:modelValue', 0);

    expect(wrapper.emitted('select')?.at(-1)).toEqual(['02:30']);
  });

  it('should not emit when the change keeps the same canonical value', async () => {
    await openMenu();
    await getWheels()[0].vm.$emit('update:modelValue', 14);

    expect(wrapper.emitted('select')).toBeUndefined();
  });

  it('should use a compact width in 24h mode', async () => {
    await openMenu();

    expect(wrapper.findComponent({ name: 'v-card' }).props('width')).toBe(180);
  });

  it('should use a wider card in 12h mode', async () => {
    await wrapper.setProps({ use24Hour: false });
    await openMenu();

    expect(wrapper.findComponent({ name: 'v-card' }).props('width')).toBe(240);
  });

  it('should respect a custom width', async () => {
    await wrapper.setProps({ width: 320 });
    await openMenu();

    expect(wrapper.findComponent({ name: 'v-card' }).props('width')).toBe(320);
  });

  it('should expose default wheel labels', async () => {
    await openMenu();

    const wheels = getWheels();

    expect(wheels[0].props('ariaLabel')).toBe('Hora');
    expect(wheels[1].props('ariaLabel')).toBe('Minuto');
  });

  it('should expose custom wheel labels', async () => {
    await wrapper.setProps({ hourLabel: 'Hour', minuteLabel: 'Minute' });
    await openMenu();

    const wheels = getWheels();

    expect(wheels[0].props('ariaLabel')).toBe('Hour');
    expect(wheels[1].props('ariaLabel')).toBe('Minute');
  });

  it('should expose the meridiem wheel label in 12h mode', async () => {
    await wrapper.setProps({ use24Hour: false, meridiemLabel: 'Period' });
    await openMenu();

    expect(getWheels()[2].props('ariaLabel')).toBe('Period');
  });
});

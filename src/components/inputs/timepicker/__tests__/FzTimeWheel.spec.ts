import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { createComponent } from '@/testutils';
import { buildMinuteOptions, type TimeWheelOption } from '@/utils/time';
import FzTimeWheel from '../FzTimeWheel.vue';

const OPTIONS: TimeWheelOption[] = buildMinuteOptions(15);

describe('FzTimeWheel', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzTimeWheel, {
      props: { modelValue: 0, options: OPTIONS },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getContainer(): HTMLElement {
    return wrapper.find('.fz-time-wheel').element as HTMLElement;
  }

  function getItems() {
    return wrapper.findAll('.fz-time-wheel__item');
  }

  it('should render one item per option', () => {
    expect(getItems()).toHaveLength(OPTIONS.length);
    expect(getItems()[2].text()).toBe('30');
  });

  it('should mark the selected item as active', async () => {
    await wrapper.setProps({ modelValue: 30 });

    const active = wrapper.findAll('.fz-time-wheel__item--active');

    expect(active).toHaveLength(1);
    expect(active[0].text()).toBe('30');
  });

  it('should scroll to the selected value on mount', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimeWheel, { props: { modelValue: 30, options: OPTIONS } });
    await nextTick();
    await nextTick();

    expect(getContainer().scrollTop).toBe(2 * 32);
  });

  it('should emit update:modelValue when scrolled to another item', async () => {
    const container = getContainer();

    container.scrollTop = 3 * 32;
    await wrapper.find('.fz-time-wheel').trigger('scroll');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([45]);
  });

  it('should not emit when scrolling within the selected item', async () => {
    const container = getContainer();

    container.scrollTop = 0;
    await wrapper.find('.fz-time-wheel').trigger('scroll');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should ignore a scroll position without a matching option', async () => {
    const container = getContainer();

    container.scrollTop = 99 * 32;
    await wrapper.find('.fz-time-wheel').trigger('scroll');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should emit and scroll when an item is clicked', async () => {
    await getItems()[3].trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([45]);
    expect(getContainer().scrollTop).toBe(3 * 32);
  });

  it('should not emit when the clicked item is already selected', async () => {
    await getItems()[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should move the selection down on ArrowDown', async () => {
    await wrapper.find('.fz-time-wheel').trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([15]);
  });

  it('should move the selection up on ArrowUp', async () => {
    await wrapper.setProps({ modelValue: 30 });

    await wrapper.find('.fz-time-wheel').trigger('keydown', { key: 'ArrowUp' });

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([15]);
  });

  it('should not move past the first option', async () => {
    await wrapper.find('.fz-time-wheel').trigger('keydown', { key: 'ArrowUp' });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should not move past the last option', async () => {
    await wrapper.setProps({ modelValue: 45 });

    await wrapper.find('.fz-time-wheel').trigger('keydown', { key: 'ArrowDown' });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should ignore unrelated keys', async () => {
    await wrapper.find('.fz-time-wheel').trigger('keydown', { key: 'Tab' });

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should sync the scroll position when the value changes externally', async () => {
    await wrapper.setProps({ modelValue: 45 });
    await nextTick();
    await nextTick();

    expect(getContainer().scrollTop).toBe(3 * 32);
  });

  it('should sync the scroll position when the options change', async () => {
    await wrapper.setProps({ options: buildMinuteOptions(30), modelValue: 30 });
    await nextTick();
    await nextTick();

    expect(getContainer().scrollTop).toBe(1 * 32);
  });

  it('should snap to the nearest option when the value is between steps', async () => {
    await wrapper.setProps({ modelValue: 47 });
    await nextTick();
    await nextTick();

    expect(getContainer().scrollTop).toBe(3 * 32);
  });

  it('should use default height and item height', () => {
    const spacer = wrapper.find('.fz-time-wheel > div').element as HTMLElement;

    expect(spacer.style.height).toBe('64px');
  });

  it('should expose the accessible label', () => {
    wrapper.unmount();

    wrapper = createComponent(FzTimeWheel, {
      props: { modelValue: 0, options: OPTIONS, ariaLabel: 'Minuto' },
    });

    expect(wrapper.find('.fz-time-wheel').attributes('aria-label')).toBe('Minuto');
  });
});

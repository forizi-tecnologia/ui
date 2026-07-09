import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { createComponent } from '@/testutils';
import FzDatePickerYearsView from '../FzDatePickerYearsView.vue';

describe('FzDatePickerYearsView', () => {
  let wrapper: ReturnType<typeof createComponent>;

  const yearList = [2020, 2021, 2022, 2023, 2024, 2025];

  beforeEach(() => {
    wrapper = createComponent(FzDatePickerYearsView, {
      attachTo: document.body,
      props: {
        yearList,
        focusedYear: 2023,
        selectedIso: '2023-05-10',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render a button for every year in the list', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });

    expect(buttons).toHaveLength(yearList.length);
  });

  it('should highlight the focused year with flat variant and primary color', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const focused = buttons.find((btn) => btn.text() === '2023');

    expect(focused?.props('variant')).toBe('flat');
    expect(focused?.props('color')).toBe('primary');
  });

  it('should not highlight a year that is not focused', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const other = buttons.find((btn) => btn.text() === '2020');

    expect(other?.props('variant')).toBe('text');
    expect(other?.props('color')).toBeUndefined();
  });

  it('should emit select with the clicked year', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const target = buttons.find((btn) => btn.text() === '2025');

    await target?.trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual([2025]);
  });

  it('should scroll the focused year into view on mount', () => {
    const container = wrapper.find('.fz-dp-years').element as HTMLElement;

    expect(typeof container.scrollTop).toBe('number');
  });

  it('should not throw when the focused year has no matching element', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePickerYearsView, {
      attachTo: document.body,
      props: {
        yearList,
        focusedYear: 1800,
        selectedIso: '',
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.find('.fz-dp-years').exists()).toBe(true);
  });
});

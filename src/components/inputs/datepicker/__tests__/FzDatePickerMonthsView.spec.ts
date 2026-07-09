import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzDatePickerMonthsView from '../FzDatePickerMonthsView.vue';
import { getMonthNames } from '@/utils/date';

describe('FzDatePickerMonthsView', () => {
  let wrapper: ReturnType<typeof createComponent>;

  const monthNames = getMonthNames('pt-BR');

  beforeEach(() => {
    wrapper = createComponent(FzDatePickerMonthsView, {
      props: {
        monthNames,
        focusedYear: 2024,
        selectedIso: '2024-03-15',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render 12 month buttons', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });

    expect(buttons).toHaveLength(12);
  });

  it('should render abbreviated month names', () => {
    expect(wrapper.text()).toContain('Jan');
    expect(wrapper.text()).toContain('Dez');
  });

  it('should highlight the selected month with flat variant and primary color', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const march = buttons.find((btn) => btn.text() === 'Mar');

    expect(march?.props('variant')).toBe('flat');
    expect(march?.props('color')).toBe('primary');
  });

  it('should not highlight the selected month when the focused year differs', async () => {
    await wrapper.setProps({ focusedYear: 2025 });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const march = buttons.find((btn) => btn.text() === 'Mar');

    expect(march?.props('variant')).toBe('text');
    expect(march?.props('color')).toBeUndefined();
  });

  it('should not highlight any month when selectedIso is empty', async () => {
    await wrapper.setProps({ selectedIso: '' });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const march = buttons.find((btn) => btn.text() === 'Mar');

    expect(march?.props('variant')).toBe('text');
  });

  it('should emit select with the 1-based month index when clicked', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const july = buttons.find((btn) => btn.text() === 'Jul');

    await july?.trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual([7]);
  });
});

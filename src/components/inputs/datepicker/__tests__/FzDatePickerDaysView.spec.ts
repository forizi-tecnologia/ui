import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createComponent } from '@/testutils';
import FzDatePickerDaysView from '../FzDatePickerDaysView.vue';
import { buildMonthMatrix, getWeekdayInitials } from '@/utils/date';

describe('FzDatePickerDaysView', () => {
  let wrapper: ReturnType<typeof createComponent>;

  const dayMatrix = buildMonthMatrix(2024, 3);
  const weekdayInitials = getWeekdayInitials('pt-BR');

  beforeEach(() => {
    wrapper = createComponent(FzDatePickerDaysView, {
      props: {
        weekdayInitials,
        dayMatrix,
        selectedIso: '2024-03-15',
        todayIso: '2024-03-10',
        todayLabel: 'Hoje',
        isDisabled: () => false,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the weekday initials', () => {
    expect(wrapper.text()).toContain('D');
    expect(wrapper.text()).toContain('S');
    expect(wrapper.text()).toContain('T');
    expect(wrapper.text()).toContain('Q');
  });

  it('should render a button for every real day of the month', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const dayButtons = buttons.filter((btn) => btn.text() !== 'Hoje');

    expect(dayButtons).toHaveLength(31);
  });

  it('should highlight the selected day with flat variant', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const selectedButton = buttons.find((btn) => btn.text() === '15');

    expect(selectedButton?.props('variant')).toBe('flat');
    expect(selectedButton?.props('color')).toBe('primary');
  });

  it('should highlight today with outlined variant when not selected', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayButton = buttons.find((btn) => btn.text() === '10');

    expect(todayButton?.props('variant')).toBe('outlined');
    expect(todayButton?.props('color')).toBe('primary');
  });

  it('should use text variant and no color for a regular day', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const regularButton = buttons.find((btn) => btn.text() === '5');

    expect(regularButton?.props('variant')).toBe('text');
    expect(regularButton?.props('color')).toBeUndefined();
  });

  it('should emit select with the iso of the clicked day', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const dayButton = buttons.find((btn) => btn.text() === '20');

    await dayButton?.trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual(['2024-03-20']);
  });

  it('should disable a day cell when isDisabled returns true', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePickerDaysView, {
      props: {
        weekdayInitials,
        dayMatrix,
        selectedIso: '2024-03-15',
        todayIso: '2024-03-10',
        todayLabel: 'Hoje',
        isDisabled: (iso: string) => iso === '2024-03-05',
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const disabledButton = buttons.find((btn) => btn.text() === '5');

    expect(disabledButton?.props('disabled')).toBe(true);
  });

  it('should render the Hoje button with the provided label', () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Hoje');

    expect(todayBtn?.exists()).toBe(true);
  });

  it('should emit select with todayIso when the Hoje button is clicked', async () => {
    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Hoje');

    await todayBtn?.trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual(['2024-03-10']);
  });

  it('should disable the Hoje button when today is out of range', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDatePickerDaysView, {
      props: {
        weekdayInitials,
        dayMatrix,
        selectedIso: '2024-03-15',
        todayIso: '2024-03-10',
        todayLabel: 'Hoje',
        isDisabled: (iso: string) => iso === '2024-03-10',
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'v-btn' });
    const todayBtn = buttons.find((btn) => btn.text() === 'Hoje');

    expect(todayBtn?.props('disabled')).toBe(true);
  });
});

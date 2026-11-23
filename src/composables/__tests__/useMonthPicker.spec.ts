import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import {
  parseMonth,
  toMonthIso,
  formatMonth,
  shiftMonth,
  isMonthWithinRange,
  getCurrentMonth,
  getMonthLabel,
  useMonthPicker,
} from '../useMonthPicker';

describe('month helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    { value: '2026-11', expected: { year: 2026, month: 11 } },
    { value: '1999-01', expected: { year: 1999, month: 1 } },
    { value: '0001-12', expected: { year: 1, month: 12 } },
  ])('should parse "$value"', ({ value, expected }) => {
    expect(parseMonth(value)).toEqual(expected);
  });

  it.each(['', '2026-13', '2026-00', '2026-1', '26-11', '2026/11', '0000-01', '10000-01', null, undefined])(
    'should return null for invalid value %s',
    (value) => {
      expect(parseMonth(value)).toBeNull();
    },
  );

  it('should format parts as an ISO month', () => {
    expect(toMonthIso({ year: 2026, month: 7 })).toBe('2026-07');
  });

  it('should format as mm/yyyy by default', () => {
    expect(formatMonth('2026-11', 'mm/yyyy')).toBe('11/2026');
  });

  it('should format as yyyy-mm', () => {
    expect(formatMonth('2026-11', 'yyyy-mm')).toBe('2026-11');
  });

  it('should return an empty string when formatting an invalid month', () => {
    expect(formatMonth('invalid', 'mm/yyyy')).toBe('');
  });

  it('should shift to the next month', () => {
    expect(shiftMonth('2026-11', 1)).toBe('2026-12');
  });

  it('should shift across the year boundary', () => {
    expect(shiftMonth('2026-12', 1)).toBe('2027-01');
  });

  it('should shift backward across the year boundary', () => {
    expect(shiftMonth('2026-01', -1)).toBe('2025-12');
  });

  it('should shift from the current month when the value is invalid', () => {
    expect(shiftMonth('', 1)).toBe('2026-12');
  });

  it('should check the min and max range', () => {
    expect(isMonthWithinRange('2026-05', '2026-03', '2026-09')).toBe(true);
    expect(isMonthWithinRange('2026-02', '2026-03', '2026-09')).toBe(false);
    expect(isMonthWithinRange('2026-10', '2026-03', '2026-09')).toBe(false);
    expect(isMonthWithinRange('2026-05', null, null)).toBe(true);
  });

  it('should return the current month', () => {
    expect(getCurrentMonth()).toBe('2026-11');
  });

  it('should label the month in pt-BR', () => {
    expect(getMonthLabel('2026-11', 'pt-BR')).toBe('Novembro 2026');
  });

  it('should label the month in English', () => {
    expect(getMonthLabel('2026-11', 'en')).toBe('November 2026');
  });

  it('should return an empty label for an invalid month', () => {
    expect(getMonthLabel('invalid', 'pt-BR')).toBe('');
  });
});

describe('useMonthPicker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should expose the selected month label and focused year', () => {
    const picker = useMonthPicker({ modelValue: ref('2026-03') });

    expect(picker.label.value).toBe('Março 2026');
    expect(picker.focusedYear.value).toBe(2026);
    expect(picker.isSelectedMonth(3)).toBe(true);
    expect(picker.isSelectedMonth(4)).toBe(false);
  });

  it('should fall back to the current month when the model is empty', () => {
    const picker = useMonthPicker({ modelValue: ref('') });

    expect(picker.label.value).toBe('Novembro 2026');
    expect(picker.focusedYear.value).toBe(2026);
    expect(picker.isCurrentMonth(11)).toBe(true);
    expect(picker.isCurrentMonth(10)).toBe(false);
    expect(picker.isSelectedMonth(11)).toBe(false);
  });

  it('should expose the localized month names', () => {
    const picker = useMonthPicker({ modelValue: ref('2026-03'), locale: ref('en') });

    expect(picker.monthNames.value[2]).toBe('March');
  });

  it('should navigate to the previous and next month', () => {
    const picker = useMonthPicker({ modelValue: ref('2026-11') });

    expect(picker.goPrevious()).toBe('2026-10');
    expect(picker.goNext()).toBe('2026-12');
    expect(picker.canGoPrevious.value).toBe(true);
    expect(picker.canGoNext.value).toBe(true);
  });

  it('should block navigation below min and above max', () => {
    const picker = useMonthPicker({
      modelValue: ref('2026-03'),
      min: ref('2026-03'),
      max: ref('2026-05'),
    });

    expect(picker.canGoPrevious.value).toBe(false);
    expect(picker.canGoNext.value).toBe(true);

    const upper = useMonthPicker({
      modelValue: ref('2026-05'),
      min: ref('2026-03'),
      max: ref('2026-05'),
    });

    expect(upper.canGoNext.value).toBe(false);
  });

  it('should block future navigation when allowFuture is false', () => {
    const picker = useMonthPicker({
      modelValue: ref('2026-11'),
      allowFuture: ref(false),
    });

    expect(picker.canGoNext.value).toBe(false);
    expect(picker.canGoPrevious.value).toBe(true);
  });

  it('should use the current year as the bound when allowFuture is false and max is later', () => {
    const picker = useMonthPicker({
      modelValue: ref('2026-11'),
      allowFuture: ref(false),
      max: ref('2030-01'),
    });

    expect(picker.canGoNextYear.value).toBe(false);
  });

  it('should clamp the focused year to min and max', async () => {
    const modelValue = ref('2026-06');
    const picker = useMonthPicker({
      modelValue,
      min: ref('2025-03'),
      max: ref('2027-09'),
    });

    picker.goPreviousYear();
    picker.goPreviousYear();
    picker.goPreviousYear();

    expect(picker.focusedYear.value).toBe(2025);
    expect(picker.canGoPreviousYear.value).toBe(false);

    picker.goNextYear();
    picker.goNextYear();
    picker.goNextYear();

    expect(picker.focusedYear.value).toBe(2027);
    expect(picker.canGoNextYear.value).toBe(false);

    modelValue.value = '2024-01';
    await nextTick();

    expect(picker.focusedYear.value).toBe(2025);
  });

  it('should clamp the focused year to the current year when allowFuture is false', async () => {
    const modelValue = ref('2026-11');
    const picker = useMonthPicker({ modelValue, allowFuture: ref(false) });

    picker.goNextYear();

    expect(picker.focusedYear.value).toBe(2026);
    expect(picker.canGoNextYear.value).toBe(false);
  });

  it('should disable months out of the min/max range', () => {
    const picker = useMonthPicker({
      modelValue: ref('2026-06'),
      min: ref('2026-03'),
      max: ref('2026-09'),
    });

    expect(picker.isMonthDisabled(2)).toBe(true);
    expect(picker.isMonthDisabled(3)).toBe(false);
    expect(picker.isMonthDisabled(9)).toBe(false);
    expect(picker.isMonthDisabled(10)).toBe(true);
  });

  it('should select a month in the focused year', () => {
    const picker = useMonthPicker({ modelValue: ref('2026-06') });

    expect(picker.selectMonth(1)).toBe('2026-01');
    expect(picker.selectMonth(12)).toBe('2026-12');
  });

  it('should refuse to select a month out of range', () => {
    const picker = useMonthPicker({ modelValue: ref('2026-06'), max: ref('2026-09') });

    expect(picker.selectMonth(10)).toBeNull();
  });

  it('should reset the focused year to the selected month', async () => {
    const modelValue = ref('2026-06');
    const picker = useMonthPicker({ modelValue });

    picker.goNextYear();
    expect(picker.focusedYear.value).toBe(2027);

    picker.resetFocus();
    expect(picker.focusedYear.value).toBe(2026);

    modelValue.value = '2028-02';
    await nextTick();
    expect(picker.focusedYear.value).toBe(2028);
  });
});

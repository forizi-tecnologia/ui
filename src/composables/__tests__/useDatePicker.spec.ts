import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useDatePicker } from '../useDatePicker';
import { DEFAULT_MIN_YEAR, DEFAULT_MAX_YEAR, todayIso, type DateLocale } from '@/utils/date';

function createPicker(overrides?: {
  selected?: string;
  min?: string | null;
  max?: string | null;
  locale?: DateLocale;
}) {
  return useDatePicker({
    selected: ref(overrides?.selected ?? ''),
    min: ref(overrides?.min ?? null),
    max: ref(overrides?.max ?? null),
    locale: ref(overrides?.locale ?? 'pt-BR'),
  });
}

describe('useDatePicker', () => {
  it('should start on the days view focused on the selected date', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    expect(picker.isDaysView.value).toBe(true);
    expect(picker.focusedYear.value).toBe(2024);
    expect(picker.focusedMonth.value).toBe(3);
  });

  it('should focus on today when no date is selected', () => {
    const picker = createPicker();
    const today = todayIso();
    const [year, month] = today.split('-').map(Number);

    expect(picker.focusedYear.value).toBe(year);
    expect(picker.focusedMonth.value).toBe(month);
  });

  it('should expose weekday initials and month names for the current locale', () => {
    const picker = createPicker({ selected: '2024-03-15', locale: 'en' });

    expect(picker.weekdayInitials.value).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    expect(picker.monthNames.value[2]).toBe('March');
  });

  it('should expose the raw activeView ref', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    expect(picker.activeView.value).toBe('days');

    picker.drillFromTitle();

    expect(picker.activeView.value).toBe('months');
  });

  it('should build the header title with month and year in pt-BR', () => {
    const picker = createPicker({ selected: '2024-01-10' });

    expect(picker.headerTitle.value).toBe('Janeiro de 2024');
  });

  it('should build the header title with month and year in english', () => {
    const picker = createPicker({ selected: '2024-01-10', locale: 'en' });

    expect(picker.headerTitle.value).toBe('January 2024');
  });

  it('should show only the year as header title in the months view', () => {
    const picker = createPicker({ selected: '2024-01-10' });

    picker.drillFromTitle();

    expect(picker.isMonthsView.value).toBe(true);
    expect(picker.headerTitle.value).toBe('2024');
  });

  it('should navigate to the previous month', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.goPrev();

    expect(picker.focusedMonth.value).toBe(2);
    expect(picker.focusedYear.value).toBe(2024);
  });

  it('should navigate to the next month', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.goNext();

    expect(picker.focusedMonth.value).toBe(4);
    expect(picker.focusedYear.value).toBe(2024);
  });

  it('should roll over to the previous year when going before January', () => {
    const picker = createPicker({ selected: '2024-01-15' });

    picker.goPrev();

    expect(picker.focusedMonth.value).toBe(12);
    expect(picker.focusedYear.value).toBe(2023);
  });

  it('should roll over to the next year when going past December', () => {
    const picker = createPicker({ selected: '2024-12-15' });

    picker.goNext();

    expect(picker.focusedMonth.value).toBe(1);
    expect(picker.focusedYear.value).toBe(2025);
  });

  it('should navigate to the previous year in the months view', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.drillFromTitle();
    picker.goPrev();

    expect(picker.focusedYear.value).toBe(2023);
  });

  it('should navigate to the next year in the months view', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.drillFromTitle();
    picker.goNext();

    expect(picker.focusedYear.value).toBe(2025);
  });

  it('should clamp year navigation to the min bound', () => {
    const picker = createPicker({ selected: '2020-03-15', min: '2020-01-01', max: '2020-12-31' });

    picker.drillFromTitle();
    picker.goPrev();

    expect(picker.focusedYear.value).toBe(2020);
  });

  it('should clamp year navigation to the max bound', () => {
    const picker = createPicker({ selected: '2020-03-15', min: '2020-01-01', max: '2020-12-31' });

    picker.drillFromTitle();
    picker.goNext();

    expect(picker.focusedYear.value).toBe(2020);
  });

  it('should clamp month roll-over year shift to the max bound', () => {
    const picker = createPicker({ selected: '2020-12-15', min: '2020-01-01', max: '2020-12-31' });

    picker.goNext();

    expect(picker.focusedYear.value).toBe(2020);
  });

  it('should drill from days to months and then to years', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    expect(picker.isDaysView.value).toBe(true);

    picker.drillFromTitle();
    expect(picker.isMonthsView.value).toBe(true);

    picker.drillFromTitle();
    expect(picker.isYearsView.value).toBe(true);
  });

  it('should drill from years back to months', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.drillFromTitle();
    picker.drillFromTitle();
    picker.drillFromTitle();

    expect(picker.isMonthsView.value).toBe(true);
  });

  it('should select a month and switch to the days view', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.drillFromTitle();
    picker.selectMonth(7);

    expect(picker.focusedMonth.value).toBe(7);
    expect(picker.isDaysView.value).toBe(true);
  });

  it('should select a year and switch to the months view', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.selectYear(2030);

    expect(picker.focusedYear.value).toBe(2030);
    expect(picker.isMonthsView.value).toBe(true);
  });

  it('should clamp a selected year to the available range', () => {
    const picker = createPicker({ selected: '2024-03-15', min: '2020-01-01', max: '2025-12-31' });

    picker.selectYear(2099);

    expect(picker.focusedYear.value).toBe(2025);
  });

  it('should expose the default year list when min and max are not set', () => {
    const picker = createPicker();

    expect(picker.yearList.value[0]).toBe(DEFAULT_MIN_YEAR);
    expect(picker.yearList.value[picker.yearList.value.length - 1]).toBe(DEFAULT_MAX_YEAR);
  });

  it('should build the day matrix for the focused month', () => {
    const picker = createPicker({ selected: '2024-02-10' });

    const days = picker.dayMatrix.value.filter((cell) => cell !== null);

    expect(days).toHaveLength(29);
  });

  it('should report a date as disabled when outside the min/max range', () => {
    const picker = createPicker({ selected: '2024-03-15', min: '2024-03-10', max: '2024-03-20' });

    expect(picker.isDisabled('2024-03-05')).toBe(true);
    expect(picker.isDisabled('2024-03-15')).toBe(false);
  });

  it('should reset the focused month/year and view back to the selected date', () => {
    const picker = createPicker({ selected: '2024-03-15' });

    picker.drillFromTitle();
    picker.goNext();
    picker.reset();

    expect(picker.isDaysView.value).toBe(true);
    expect(picker.focusedYear.value).toBe(2024);
    expect(picker.focusedMonth.value).toBe(3);
  });

  it('should reset to today when selected is empty', () => {
    const picker = createPicker();

    picker.drillFromTitle();
    picker.reset();

    const today = todayIso();
    const [year, month] = today.split('-').map(Number);

    expect(picker.isDaysView.value).toBe(true);
    expect(picker.focusedYear.value).toBe(year);
    expect(picker.focusedMonth.value).toBe(month);
  });
});

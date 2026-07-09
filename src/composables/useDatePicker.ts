import { ref, computed, type Ref } from 'vue';
import {
  buildMonthMatrix,
  getMonthNames,
  getWeekdayInitials,
  getYearRange,
  isWithinRange,
  parseIso,
  todayIso,
  type DateLocale,
  type DateParts,
  type DayCell,
} from '@/utils/date';

export type CalendarView = 'days' | 'months' | 'years';

export interface UseDatePickerParams {
  selected: Ref<string>;
  min: Ref<string | null>;
  max: Ref<string | null>;
  locale: Ref<DateLocale>;
}

export function useDatePicker(params: UseDatePickerParams) {
  const { selected, min, max, locale } = params;

  const initial = parseIso(selected.value) ?? (parseIso(todayIso()) as DateParts);

  const activeView = ref<CalendarView>('days');
  const focusedYear = ref(initial.year);
  const focusedMonth = ref(initial.month);

  const isDaysView = computed(() => activeView.value === 'days');
  const isMonthsView = computed(() => activeView.value === 'months');
  const isYearsView = computed(() => activeView.value === 'years');

  const monthNames = computed(() => getMonthNames(locale.value));
  const weekdayInitials = computed(() => getWeekdayInitials(locale.value));
  const dayMatrix = computed<(DayCell | null)[]>(() => buildMonthMatrix(focusedYear.value, focusedMonth.value));
  const yearList = computed(() => getYearRange(min.value, max.value));

  const daysTitle = computed(() => {
    const monthName = monthNames.value[focusedMonth.value - 1];

    return locale.value === 'en' ? `${monthName} ${focusedYear.value}` : `${monthName} de ${focusedYear.value}`;
  });

  const headerTitle = computed(() => (isDaysView.value ? daysTitle.value : String(focusedYear.value)));

  function clampYear(year: number): number {
    const years = yearList.value;
    const lower = years[0];
    const upper = years[years.length - 1];

    if (year < lower) return lower;

    if (year > upper) return upper;

    return year;
  }

  function adjustMonth(delta: number): void {
    const zeroBased = focusedMonth.value - 1 + delta;
    const yearShift = Math.floor(zeroBased / 12);
    const normalizedMonth = ((zeroBased % 12) + 12) % 12;

    focusedYear.value = clampYear(focusedYear.value + yearShift);
    focusedMonth.value = normalizedMonth + 1;
  }

  function goPrev(): void {
    if (isDaysView.value) {
      adjustMonth(-1);

      return;
    }

    focusedYear.value = clampYear(focusedYear.value - 1);
  }

  function goNext(): void {
    if (isDaysView.value) {
      adjustMonth(1);

      return;
    }

    focusedYear.value = clampYear(focusedYear.value + 1);
  }

  function drillFromTitle(): void {
    if (isDaysView.value) {
      activeView.value = 'months';

      return;
    }

    if (isMonthsView.value) {
      activeView.value = 'years';

      return;
    }

    activeView.value = 'months';
  }

  function selectMonth(month: number): void {
    focusedMonth.value = month;
    activeView.value = 'days';
  }

  function selectYear(year: number): void {
    focusedYear.value = clampYear(year);
    activeView.value = 'months';
  }

  function isDisabled(iso: string): boolean {
    return !isWithinRange(iso, min.value, max.value);
  }

  function reset(): void {
    const parts = (parseIso(selected.value) ?? parseIso(todayIso())) as DateParts;

    focusedYear.value = parts.year;
    focusedMonth.value = parts.month;
    activeView.value = 'days';
  }

  return {
    activeView,
    focusedYear,
    focusedMonth,
    isDaysView,
    isMonthsView,
    isYearsView,
    monthNames,
    weekdayInitials,
    dayMatrix,
    yearList,
    headerTitle,
    goPrev,
    goNext,
    drillFromTitle,
    selectMonth,
    selectYear,
    isDisabled,
    reset,
  };
}

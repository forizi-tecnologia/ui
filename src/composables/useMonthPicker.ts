import { computed, ref, watch, type Ref } from 'vue';
import { getMonthNames, type DateLocale } from '@/utils/date';

export type MonthFormat = 'mm/yyyy' | 'yyyy-mm';

export interface MonthParts {
  year: number;
  month: number;
}

export interface UseMonthPickerParams {
  modelValue: Ref<string>;
  min?: Ref<string | null>;
  max?: Ref<string | null>;
  locale?: Ref<DateLocale>;
  allowFuture?: Ref<boolean>;
}

const MONTH_PATTERN = /^(\d{4})-(\d{2})$/;

const MONTHS_PER_YEAR = 12;

const MIN_YEAR = 1;

const MAX_YEAR = 9999;

function pad(value: number, length: number): string {
  return String(value).padStart(length, '0');
}

export function parseMonth(value: string | null | undefined): MonthParts | null {
  if (!value) return null;

  const match = MONTH_PATTERN.exec(value);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (year < MIN_YEAR || year > MAX_YEAR) return null;

  if (month < 1 || month > MONTHS_PER_YEAR) return null;

  return { year, month };
}

export function toMonthIso(parts: MonthParts): string {
  return `${pad(parts.year, 4)}-${pad(parts.month, 2)}`;
}

export function formatMonth(value: string, format: MonthFormat): string {
  const parts = parseMonth(value);

  if (!parts) return '';

  if (format === 'yyyy-mm') return toMonthIso(parts);

  return `${pad(parts.month, 2)}/${parts.year}`;
}

export function shiftMonth(value: string, delta: number): string {
  const base = parseMonth(value) ?? parseMonth(getCurrentMonth()) as MonthParts;
  const totalMonths = base.year * MONTHS_PER_YEAR + (base.month - 1) + delta;
  const year = Math.floor(totalMonths / MONTHS_PER_YEAR);
  const month = ((totalMonths % MONTHS_PER_YEAR) + MONTHS_PER_YEAR) % MONTHS_PER_YEAR + 1;

  return toMonthIso({ year, month });
}

export function isMonthWithinRange(
  value: string,
  min: string | null | undefined,
  max: string | null | undefined,
): boolean {
  if (min && value < min) return false;

  if (max && value > max) return false;

  return true;
}

export function getCurrentMonth(): string {
  const now = new Date();

  return toMonthIso({ year: now.getFullYear(), month: now.getMonth() + 1 });
}

export function getMonthLabel(value: string, locale: DateLocale): string {
  const parts = parseMonth(value);

  if (!parts) return '';

  const monthName = getMonthNames(locale)[parts.month - 1];

  return `${monthName} ${parts.year}`;
}

export function useMonthPicker(params: UseMonthPickerParams) {
  const min = params.min ?? ref<string | null>(null);
  const max = params.max ?? ref<string | null>(null);
  const locale = params.locale ?? ref<DateLocale>('pt-BR');
  const allowFuture = params.allowFuture ?? ref(true);

  const currentMonth = ref(getCurrentMonth());
  const selectedParts = computed(() => parseMonth(params.modelValue.value));
  const baseParts = computed<MonthParts>(() => selectedParts.value ?? parseMonth(currentMonth.value) as MonthParts);
  const focusedYear = ref(baseParts.value.year);

  const monthNames = computed(() => getMonthNames(locale.value));

  const label = computed(() => getMonthLabel(params.modelValue.value || currentMonth.value, locale.value));

  const minYear = computed(() => parseMonth(min.value)?.year ?? null);

  const maxYear = computed(() => {
    const explicit = parseMonth(max.value)?.year ?? null;

    if (allowFuture.value) return explicit;

    const current = parseMonth(currentMonth.value) as MonthParts;

    if (explicit === null) return current.year;

    return Math.min(explicit, current.year);
  });

  const canGoPreviousYear = computed(() => minYear.value === null || focusedYear.value > minYear.value);

  const canGoNextYear = computed(() => maxYear.value === null || focusedYear.value < maxYear.value);

  const canGoPrevious = computed(() => isMonthAllowed(shiftMonth(params.modelValue.value, -1)));

  const canGoNext = computed(() => isMonthAllowed(shiftMonth(params.modelValue.value, 1)));

  watch(baseParts, (parts) => {
    focusedYear.value = clampYear(parts.year);
  });

  function clampYear(year: number): number {
    let value = year;

    if (minYear.value !== null) value = Math.max(value, minYear.value);

    if (maxYear.value !== null) value = Math.min(value, maxYear.value);

    return value;
  }

  function isMonthAllowed(value: string): boolean {
    if (!isMonthWithinRange(value, min.value, max.value)) return false;

    if (!allowFuture.value) return value <= currentMonth.value;

    return true;
  }

  function getShiftedValue(delta: number): string {
    return shiftMonth(params.modelValue.value, delta);
  }

  function isMonthDisabled(month: number): boolean {
    return !isMonthAllowed(toMonthIso({ year: focusedYear.value, month }));
  }

  function isCurrentMonth(month: number): boolean {
    const current = parseMonth(currentMonth.value) as MonthParts;

    return current.year === focusedYear.value && current.month === month;
  }

  function isSelectedMonth(month: number): boolean {
    if (!selectedParts.value) return false;

    return selectedParts.value.year === focusedYear.value && selectedParts.value.month === month;
  }

  function goPrevious(): string {
    return getShiftedValue(-1);
  }

  function goNext(): string {
    return getShiftedValue(1);
  }

  function goPreviousYear(): void {
    if (!canGoPreviousYear.value) return;

    focusedYear.value -= 1;
  }

  function goNextYear(): void {
    if (!canGoNextYear.value) return;

    focusedYear.value += 1;
  }

  function selectMonth(month: number): string | null {
    const value = toMonthIso({ year: focusedYear.value, month });

    return isMonthAllowed(value) ? value : null;
  }

  function resetFocus(): void {
    focusedYear.value = clampYear(baseParts.value.year);
  }

  return {
    currentMonth,
    focusedYear,
    monthNames,
    label,
    canGoPrevious,
    canGoNext,
    canGoPreviousYear,
    canGoNextYear,
    isMonthDisabled,
    isCurrentMonth,
    isSelectedMonth,
    goPrevious,
    goNext,
    goPreviousYear,
    goNextYear,
    selectMonth,
    resetFocus,
  };
}

export type UseMonthPickerReturn = ReturnType<typeof useMonthPicker>;

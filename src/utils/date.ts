export type DateFormat = 'dd/mm/yyyy' | 'yyyy-mm-dd';

export type DateLocale = 'pt-BR' | 'en';

export interface DateParts {
  day: number;
  month: number;
  year: number;
}

export interface DayCell {
  day: number;
  iso: string;
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const CALENDAR_CELLS = 42;

export const DEFAULT_MIN_YEAR = 1900;

export const DEFAULT_MAX_YEAR = 2100;

const MONTH_NAMES: Record<DateLocale, string[]> = {
  'pt-BR': [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const WEEKDAY_INITIALS: Record<DateLocale, string[]> = {
  'pt-BR': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

function pad(value: number, length: number): string {
  return String(value).padStart(length, '0');
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year)) return 29;

  return DAYS_IN_MONTH[month - 1];
}

export function isRealDate(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;

  if (month < 1 || month > 12) return false;

  if (year < 1 || year > 9999) return false;

  if (day < 1 || day > daysInMonth(year, month)) return false;

  return true;
}

export function toIso(parts: DateParts): string {
  return `${pad(parts.year, 4)}-${pad(parts.month, 2)}-${pad(parts.day, 2)}`;
}

export function parseIso(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!isRealDate(day, month, year)) return null;

  return { day, month, year };
}

export function parseDisplay(value: string, format: DateFormat): DateParts | null {
  if (format === 'yyyy-mm-dd') return parseIso(value);

  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (!isRealDate(day, month, year)) return null;

  return { day, month, year };
}

export function formatDisplay(iso: string, format: DateFormat): string {
  const parts = parseIso(iso);

  if (!parts) return '';

  if (format === 'yyyy-mm-dd') return toIso(parts);

  return `${pad(parts.day, 2)}/${pad(parts.month, 2)}/${pad(parts.year, 4)}`;
}

export function maskForFormat(format: DateFormat): string {
  return format === 'yyyy-mm-dd' ? '####-##-##' : '##/##/####';
}

export function isWithinRange(iso: string, min: string | null, max: string | null): boolean {
  if (min && iso < min) return false;

  if (max && iso > max) return false;

  return true;
}

export function todayIso(): string {
  const now = new Date();

  return toIso({ day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() });
}

export function buildMonthMatrix(year: number, month: number): (DayCell | null)[] {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const total = daysInMonth(year, month);

  const leading: (DayCell | null)[] = Array.from({ length: firstWeekday }, () => null);

  const days: (DayCell | null)[] = Array.from({ length: total }, (_unused, index) => {
    const day = index + 1;

    return { day, iso: toIso({ day, month, year }) };
  });

  const cells = [...leading, ...days];
  const trailingLength = Math.max(0, CALENDAR_CELLS - cells.length);
  const trailing: (DayCell | null)[] = Array.from({ length: trailingLength }, () => null);

  return [...cells, ...trailing];
}

export function getMonthNames(locale: DateLocale): string[] {
  return [...MONTH_NAMES[locale]];
}

export function getWeekdayInitials(locale: DateLocale): string[] {
  return [...WEEKDAY_INITIALS[locale]];
}

export function getYearRange(min: string | null, max: string | null): number[] {
  const minYear = parseIso(min ?? '')?.year ?? DEFAULT_MIN_YEAR;
  const maxYear = parseIso(max ?? '')?.year ?? DEFAULT_MAX_YEAR;

  const start = Math.min(minYear, maxYear);
  const end = Math.max(minYear, maxYear);

  return Array.from({ length: end - start + 1 }, (_unused, index) => start + index);
}

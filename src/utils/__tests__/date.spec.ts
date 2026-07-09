import { describe, it, expect } from 'vitest';
import {
  isLeapYear,
  daysInMonth,
  isRealDate,
  toIso,
  parseIso,
  parseDisplay,
  formatDisplay,
  maskForFormat,
  isWithinRange,
  todayIso,
  buildMonthMatrix,
  getMonthNames,
  getWeekdayInitials,
  getYearRange,
  DEFAULT_MIN_YEAR,
  DEFAULT_MAX_YEAR,
} from '../date';

describe('isLeapYear', () => {
  const CASES = [
    { year: 2024, expected: true },
    { year: 2000, expected: true },
    { year: 1900, expected: false },
    { year: 2023, expected: false },
    { year: 2100, expected: false },
  ] as const;

  it.each(CASES)('should return $expected for year $year', ({ year, expected }) => {
    expect(isLeapYear(year)).toBe(expected);
  });
});

describe('daysInMonth', () => {
  const CASES = [
    { year: 2024, month: 2, expected: 29 },
    { year: 2023, month: 2, expected: 28 },
    { year: 2023, month: 4, expected: 30 },
    { year: 2023, month: 1, expected: 31 },
    { year: 2023, month: 12, expected: 31 },
  ] as const;

  it.each(CASES)('should return $expected days for $year-$month', ({ year, month, expected }) => {
    expect(daysInMonth(year, month)).toBe(expected);
  });
});

describe('isRealDate', () => {
  const CASES = [
    { day: 29, month: 2, year: 2024, expected: true },
    { day: 29, month: 2, year: 2023, expected: false },
    { day: 31, month: 4, year: 2023, expected: false },
    { day: 0, month: 1, year: 2023, expected: false },
    { day: 15, month: 0, year: 2023, expected: false },
    { day: 15, month: 13, year: 2023, expected: false },
    { day: 15, month: 6, year: 0, expected: false },
    { day: 15, month: 6, year: 10000, expected: false },
    { day: 1.5, month: 6, year: 2023, expected: false },
    { day: 15, month: 6.5, year: 2023, expected: false },
    { day: 15, month: 6, year: 2023.5, expected: false },
    { day: 15, month: 6, year: 2023, expected: true },
  ] as const;

  it.each(CASES)('should return $expected for $day/$month/$year', ({ day, month, year, expected }) => {
    expect(isRealDate(day, month, year)).toBe(expected);
  });
});

describe('toIso', () => {
  it('should pad day, month and year to their canonical widths', () => {
    expect(toIso({ day: 5, month: 3, year: 2024 })).toBe('2024-03-05');
  });
});

describe('parseIso', () => {
  const VALID_CASES = [
    { iso: '2024-02-29', expected: { day: 29, month: 2, year: 2024 } },
    { iso: '2023-12-31', expected: { day: 31, month: 12, year: 2023 } },
  ] as const;

  it.each(VALID_CASES)('should parse "$iso"', ({ iso, expected }) => {
    expect(parseIso(iso)).toEqual(expected);
  });

  const INVALID_CASES = ['', 'invalid', '2024-13-01', '2023-02-29', '31/12/2023', '2024-02-9'] as const;

  it.each(INVALID_CASES)('should return null for invalid iso "%s"', (iso) => {
    expect(parseIso(iso)).toBeNull();
  });
});

describe('parseDisplay', () => {
  it('should parse a valid dd/mm/yyyy string', () => {
    expect(parseDisplay('05/03/2024', 'dd/mm/yyyy')).toEqual({ day: 5, month: 3, year: 2024 });
  });

  it('should return null for an incomplete dd/mm/yyyy string', () => {
    expect(parseDisplay('05/03/20', 'dd/mm/yyyy')).toBeNull();
  });

  it('should return null for a dd/mm/yyyy string with an invalid calendar date', () => {
    expect(parseDisplay('31/04/2024', 'dd/mm/yyyy')).toBeNull();
  });

  it('should parse a valid yyyy-mm-dd string', () => {
    expect(parseDisplay('2024-03-05', 'yyyy-mm-dd')).toEqual({ day: 5, month: 3, year: 2024 });
  });

  it('should return null for an invalid yyyy-mm-dd string', () => {
    expect(parseDisplay('2024-13-05', 'yyyy-mm-dd')).toBeNull();
  });
});

describe('formatDisplay', () => {
  it('should format an iso date as dd/mm/yyyy', () => {
    expect(formatDisplay('2024-03-05', 'dd/mm/yyyy')).toBe('05/03/2024');
  });

  it('should format an iso date as yyyy-mm-dd', () => {
    expect(formatDisplay('2024-03-05', 'yyyy-mm-dd')).toBe('2024-03-05');
  });

  it('should return an empty string for an invalid iso', () => {
    expect(formatDisplay('invalid', 'dd/mm/yyyy')).toBe('');
  });

  it('should return an empty string for an empty iso', () => {
    expect(formatDisplay('', 'yyyy-mm-dd')).toBe('');
  });
});

describe('maskForFormat', () => {
  it('should return the numeric mask for dd/mm/yyyy', () => {
    expect(maskForFormat('dd/mm/yyyy')).toBe('##/##/####');
  });

  it('should return the numeric mask for yyyy-mm-dd', () => {
    expect(maskForFormat('yyyy-mm-dd')).toBe('####-##-##');
  });
});

describe('isWithinRange', () => {
  const CASES = [
    { iso: '2024-06-15', min: null, max: null, expected: true },
    { iso: '2024-06-15', min: '2024-06-01', max: '2024-06-30', expected: true },
    { iso: '2024-06-15', min: '2024-06-16', max: null, expected: false },
    { iso: '2024-06-15', min: null, max: '2024-06-14', expected: false },
    { iso: '2024-06-01', min: '2024-06-01', max: '2024-06-01', expected: true },
  ] as const;

  it.each(CASES)('should return $expected for $iso within [$min, $max]', ({ iso, min, max, expected }) => {
    expect(isWithinRange(iso, min, max)).toBe(expected);
  });
});

describe('todayIso', () => {
  it('should return a string matching the yyyy-mm-dd pattern', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should match the native Date fields', () => {
    const now = new Date();
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    expect(todayIso()).toBe(expected);
  });
});

describe('buildMonthMatrix', () => {
  it('should always return 42 cells', () => {
    expect(buildMonthMatrix(2024, 2)).toHaveLength(42);
  });

  it('should pad leading nulls matching the first weekday', () => {
    const matrix = buildMonthMatrix(2024, 1);
    const firstWeekday = new Date(2024, 0, 1).getDay();

    for (let index = 0; index < firstWeekday; index += 1) {
      expect(matrix[index]).toBeNull();
    }

    expect(matrix[firstWeekday]).toEqual({ day: 1, iso: '2024-01-01' });
  });

  it('should list every day of the month with its iso value', () => {
    const matrix = buildMonthMatrix(2023, 2);
    const days = matrix.filter((cell) => cell !== null);

    expect(days).toHaveLength(28);
    expect(days[0]).toEqual({ day: 1, iso: '2023-02-01' });
    expect(days[27]).toEqual({ day: 28, iso: '2023-02-28' });
  });

  it('should pad trailing nulls to complete 42 cells', () => {
    const matrix = buildMonthMatrix(2023, 2);
    const trailing = matrix.slice(-1);

    expect(trailing.every((cell) => cell === null)).toBe(true);
  });
});

describe('getMonthNames', () => {
  it('should return 12 pt-BR month names starting with Janeiro', () => {
    const names = getMonthNames('pt-BR');

    expect(names).toHaveLength(12);
    expect(names[0]).toBe('Janeiro');
    expect(names[11]).toBe('Dezembro');
  });

  it('should return 12 english month names starting with January', () => {
    const names = getMonthNames('en');

    expect(names).toHaveLength(12);
    expect(names[0]).toBe('January');
    expect(names[11]).toBe('December');
  });

  it('should return a new array instance on every call', () => {
    expect(getMonthNames('pt-BR')).not.toBe(getMonthNames('pt-BR'));
  });
});

describe('getWeekdayInitials', () => {
  it('should return 7 pt-BR weekday initials starting on Sunday', () => {
    expect(getWeekdayInitials('pt-BR')).toEqual(['D', 'S', 'T', 'Q', 'Q', 'S', 'S']);
  });

  it('should return 7 english weekday initials starting on Sunday', () => {
    expect(getWeekdayInitials('en')).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  });

  it('should return a new array instance on every call', () => {
    expect(getWeekdayInitials('en')).not.toBe(getWeekdayInitials('en'));
  });
});

describe('getYearRange', () => {
  it('should default to the [1900, 2100] range when min and max are null', () => {
    const years = getYearRange(null, null);

    expect(years[0]).toBe(DEFAULT_MIN_YEAR);
    expect(years[years.length - 1]).toBe(DEFAULT_MAX_YEAR);
    expect(years).toHaveLength(DEFAULT_MAX_YEAR - DEFAULT_MIN_YEAR + 1);
  });

  it('should derive bounds from min and max iso dates', () => {
    const years = getYearRange('2020-01-01', '2025-12-31');

    expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
  });

  it('should normalize when min is greater than max', () => {
    const years = getYearRange('2025-01-01', '2020-01-01');

    expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
  });

  it('should fall back to defaults when min or max are invalid strings', () => {
    const years = getYearRange('invalid', 'also-invalid');

    expect(years[0]).toBe(DEFAULT_MIN_YEAR);
    expect(years[years.length - 1]).toBe(DEFAULT_MAX_YEAR);
  });
});

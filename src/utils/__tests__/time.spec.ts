import { describe, it, expect } from 'vitest';
import {
  buildHourOptions,
  buildMeridiemOptions,
  buildMinuteOptions,
  findNearestOptionIndex,
  formatDisplay,
  getMeridiem,
  indexOfMeridiem,
  isValidHour,
  isValidMinute,
  maskForTime,
  meridiemAtIndex,
  normalizeMinuteStep,
  parseCanonical,
  parseDisplay,
  snapToStep,
  to12Hour,
  to24Hour,
  toCanonical,
} from '../time';

describe('isValidHour', () => {
  const CASES = [
    { hour: 0, expected: true },
    { hour: 23, expected: true },
    { hour: 24, expected: false },
    { hour: -1, expected: false },
    { hour: 1.5, expected: false },
  ] as const;

  it.each(CASES)('should return $expected for $hour', ({ hour, expected }) => {
    expect(isValidHour(hour)).toBe(expected);
  });
});

describe('isValidMinute', () => {
  const CASES = [
    { minute: 0, expected: true },
    { minute: 59, expected: true },
    { minute: 60, expected: false },
    { minute: -1, expected: false },
    { minute: 2.5, expected: false },
  ] as const;

  it.each(CASES)('should return $expected for $minute', ({ minute, expected }) => {
    expect(isValidMinute(minute)).toBe(expected);
  });
});

describe('toCanonical', () => {
  it.each([
    { parts: { hour: 9, minute: 5 }, expected: '09:05' },
    { parts: { hour: 14, minute: 30 }, expected: '14:30' },
    { parts: { hour: 0, minute: 0 }, expected: '00:00' },
  ])('should format $parts as $expected', ({ parts, expected }) => {
    expect(toCanonical(parts)).toBe(expected);
  });
});

describe('parseCanonical', () => {
  const VALID = [
    { value: '00:00', expected: { hour: 0, minute: 0 } },
    { value: '14:30', expected: { hour: 14, minute: 30 } },
    { value: '23:59', expected: { hour: 23, minute: 59 } },
  ] as const;

  it.each(VALID)('should parse $value', ({ value, expected }) => {
    expect(parseCanonical(value)).toEqual(expected);
  });

  it.each(['', '24:00', '12:60', '1:30', 'aa:bb', '12:3'])('should reject %s', (value) => {
    expect(parseCanonical(value)).toBeNull();
  });
});

describe('to12Hour', () => {
  it.each([
    { hour: 0, expected: 12 },
    { hour: 1, expected: 1 },
    { hour: 11, expected: 11 },
    { hour: 12, expected: 12 },
    { hour: 13, expected: 1 },
    { hour: 23, expected: 11 },
  ])('should convert $hour to $expected', ({ hour, expected }) => {
    expect(to12Hour(hour)).toBe(expected);
  });
});

describe('to24Hour', () => {
  it.each([
    { hour12: 12, meridiem: 'AM', expected: 0 },
    { hour12: 12, meridiem: 'PM', expected: 12 },
    { hour12: 1, meridiem: 'AM', expected: 1 },
    { hour12: 1, meridiem: 'PM', expected: 13 },
    { hour12: 11, meridiem: 'PM', expected: 23 },
  ] as const)('should convert $hour12 $meridiem to $expected', ({ hour12, meridiem, expected }) => {
    expect(to24Hour(hour12, meridiem)).toBe(expected);
  });
});

describe('getMeridiem', () => {
  it.each([
    { hour: 0, expected: 'AM' },
    { hour: 11, expected: 'AM' },
    { hour: 12, expected: 'PM' },
    { hour: 23, expected: 'PM' },
  ] as const)('should return $expected for $hour', ({ hour, expected }) => {
    expect(getMeridiem(hour)).toBe(expected);
  });
});

describe('meridiem index helpers', () => {
  it('should map an index to a meridiem', () => {
    expect(meridiemAtIndex(0)).toBe('AM');
    expect(meridiemAtIndex(1)).toBe('PM');
  });

  it('should map a meridiem to an index', () => {
    expect(indexOfMeridiem('AM')).toBe(0);
    expect(indexOfMeridiem('PM')).toBe(1);
  });
});

describe('formatDisplay', () => {
  it.each([
    { value: '14:30', use24Hour: true, expected: '14:30' },
    { value: '00:05', use24Hour: true, expected: '00:05' },
    { value: '14:30', use24Hour: false, expected: '02:30 PM' },
    { value: '00:05', use24Hour: false, expected: '12:05 AM' },
    { value: '12:00', use24Hour: false, expected: '12:00 PM' },
  ])('should format $value with use24Hour=$use24Hour as $expected', ({ value, use24Hour, expected }) => {
    expect(formatDisplay(value, use24Hour)).toBe(expected);
  });

  it('should return an empty string for an invalid canonical value', () => {
    expect(formatDisplay('99:99', true)).toBe('');
    expect(formatDisplay('', true)).toBe('');
  });
});

describe('parseDisplay', () => {
  it('should parse a 24h display', () => {
    expect(parseDisplay('14:30', true)).toEqual({ hour: 14, minute: 30 });
  });

  it('should parse a 12h display with AM/PM', () => {
    expect(parseDisplay('02:30 PM', false)).toEqual({ hour: 14, minute: 30 });
    expect(parseDisplay('12:05 am', false)).toEqual({ hour: 0, minute: 5 });
    expect(parseDisplay('12:00PM', false)).toEqual({ hour: 12, minute: 0 });
  });

  it.each([
    { value: '13:00 PM', use24Hour: false },
    { value: '00:30 AM', use24Hour: false },
    { value: '99:99', use24Hour: true },
    { value: '14:30', use24Hour: false },
    { value: '02:30', use24Hour: false },
    { value: '02:70 PM', use24Hour: false },
  ])('should reject $value with use24Hour=$use24Hour', ({ value, use24Hour }) => {
    expect(parseDisplay(value, use24Hour)).toBeNull();
  });
});

describe('maskForTime', () => {
  it('should return the 24h mask', () => {
    expect(maskForTime(true)).toBe('##:##');
  });

  it('should return the 12h mask', () => {
    expect(maskForTime(false)).toBe('##:## AM');
  });
});

describe('normalizeMinuteStep', () => {
  it.each([
    { step: 1, expected: 1 },
    { step: 5, expected: 5 },
    { step: 30, expected: 30 },
    { step: 59, expected: 59 },
    { step: 0, expected: 1 },
    { step: 60, expected: 1 },
    { step: -5, expected: 1 },
    { step: 2.5, expected: 1 },
  ])('should normalize $step to $expected', ({ step, expected }) => {
    expect(normalizeMinuteStep(step)).toBe(expected);
  });
});

describe('snapToStep', () => {
  it('should return the same minute when step is 1', () => {
    expect(snapToStep(37, 1)).toBe(37);
  });

  it('should floor the minute to the configured step', () => {
    expect(snapToStep(37, 5)).toBe(35);
    expect(snapToStep(59, 5)).toBe(55);
    expect(snapToStep(59, 15)).toBe(45);
  });

  it('should fall back to step 1 for invalid steps', () => {
    expect(snapToStep(37, 0)).toBe(37);
  });
});

describe('buildHourOptions', () => {
  it('should build the 24h hour list', () => {
    const options = buildHourOptions(true);

    expect(options).toHaveLength(24);
    expect(options[0]).toEqual({ value: 0, label: '00' });
    expect(options[23]).toEqual({ value: 23, label: '23' });
  });

  it('should build the 12h hour list', () => {
    const options = buildHourOptions(false);

    expect(options).toHaveLength(12);
    expect(options[0]).toEqual({ value: 1, label: '01' });
    expect(options[11]).toEqual({ value: 12, label: '12' });
  });
});

describe('buildMinuteOptions', () => {
  it('should build every minute when step is 1', () => {
    const options = buildMinuteOptions(1);

    expect(options).toHaveLength(60);
    expect(options[0]).toEqual({ value: 0, label: '00' });
    expect(options[59]).toEqual({ value: 59, label: '59' });
  });

  it('should build stepped minutes', () => {
    const options = buildMinuteOptions(15);

    expect(options.map((option) => option.value)).toEqual([0, 15, 30, 45]);
  });

  it('should fall back to every minute for an invalid step', () => {
    expect(buildMinuteOptions(0)).toHaveLength(60);
  });
});

describe('buildMeridiemOptions', () => {
  it('should build the AM/PM list', () => {
    expect(buildMeridiemOptions()).toEqual([
      { value: 0, label: 'AM' },
      { value: 1, label: 'PM' },
    ]);
  });
});

describe('findNearestOptionIndex', () => {
  const options = buildMinuteOptions(15);

  it('should find the exact match', () => {
    expect(findNearestOptionIndex(options, 30)).toBe(2);
  });

  it('should find the nearest option for a value between steps', () => {
    expect(findNearestOptionIndex(options, 37)).toBe(2);
    expect(findNearestOptionIndex(options, 44)).toBe(3);
  });

  it('should return 0 for an empty option list', () => {
    expect(findNearestOptionIndex([], 10)).toBe(0);
  });
});

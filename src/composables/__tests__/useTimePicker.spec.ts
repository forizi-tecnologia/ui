import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useTimePicker } from '../useTimePicker';

function createPicker(overrides?: { selected?: string; use24Hour?: boolean; minuteStep?: number }) {
  return useTimePicker({
    selected: ref(overrides?.selected ?? ''),
    use24Hour: ref(overrides?.use24Hour ?? true),
    minuteStep: ref(overrides?.minuteStep ?? 1),
  });
}

describe('useTimePicker', () => {
  it('should start on the selected time in 24h mode', () => {
    const picker = createPicker({ selected: '14:30' });

    expect(picker.hour.value).toBe(14);
    expect(picker.minute.value).toBe(30);
    expect(picker.meridiem.value).toBe('PM');
  });

  it('should convert the selected time to 12h when use24Hour is false', () => {
    const picker = createPicker({ selected: '14:30', use24Hour: false });

    expect(picker.hour.value).toBe(2);
    expect(picker.meridiem.value).toBe('PM');
  });

  it('should default to midnight when there is no selected time', () => {
    const picker = createPicker();

    expect(picker.hour.value).toBe(0);
    expect(picker.minute.value).toBe(0);
    expect(picker.meridiem.value).toBe('AM');
  });

  it('should snap the initial minute to the configured step', () => {
    const picker = createPicker({ selected: '10:37', minuteStep: 15 });

    expect(picker.minute.value).toBe(30);
  });

  it('should expose the option lists', () => {
    const picker = createPicker({ minuteStep: 30 });

    expect(picker.hourOptions.value).toHaveLength(24);
    expect(picker.minuteOptions.value.map((option) => option.value)).toEqual([0, 30]);
    expect(picker.meridiemOptions.value.map((option) => option.label)).toEqual(['AM', 'PM']);
  });

  it('should convert the wheel values back to a canonical 24h value', () => {
    const picker = createPicker({ selected: '09:05' });

    expect(picker.toCanonicalValue()).toBe('09:05');

    picker.hour.value = 23;
    picker.minute.value = 45;

    expect(picker.toCanonicalValue()).toBe('23:45');
  });

  it('should build a canonical value from 12h wheel values and meridiem', () => {
    const picker = createPicker({ use24Hour: false });

    picker.hour.value = 2;
    picker.setMeridiemIndex(1);

    expect(picker.meridiem.value).toBe('PM');
    expect(picker.toCanonicalValue()).toBe('14:00');

    picker.hour.value = 12;
    picker.setMeridiemIndex(0);

    expect(picker.toCanonicalValue()).toBe('00:00');
  });

  it('should expose the meridiem index', () => {
    const picker = createPicker({ selected: '20:00' });

    expect(picker.meridiemIndex.value).toBe(1);

    picker.setMeridiemIndex(0);

    expect(picker.meridiemIndex.value).toBe(0);
  });

  it('should reset the wheel values from the selected time', () => {
    const picker = createPicker({ selected: '08:15' });

    picker.hour.value = 22;
    picker.minute.value = 59;
    picker.setMeridiemIndex(0);
    picker.reset();

    expect(picker.hour.value).toBe(8);
    expect(picker.minute.value).toBe(15);
    expect(picker.meridiem.value).toBe('AM');
  });

  it('should reset to midnight when there is no selected time', () => {
    const picker = createPicker({ selected: '18:40' });

    picker.reset();

    const emptyPicker = createPicker();

    emptyPicker.hour.value = 12;
    emptyPicker.reset();

    expect(emptyPicker.hour.value).toBe(0);
    expect(emptyPicker.minute.value).toBe(0);
    expect(emptyPicker.meridiem.value).toBe('AM');
  });
});

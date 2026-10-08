import { ref, computed, type Ref } from 'vue';
import {
  buildHourOptions,
  buildMeridiemOptions,
  buildMinuteOptions,
  getMeridiem,
  indexOfMeridiem,
  meridiemAtIndex,
  parseCanonical,
  snapToStep,
  to12Hour,
  to24Hour,
  toCanonical,
  type Meridiem,
} from '@/utils/time';

export interface UseTimePickerParams {
  selected: Ref<string>;
  use24Hour: Ref<boolean>;
  minuteStep: Ref<number>;
}

export function useTimePicker(params: UseTimePickerParams) {
  const { selected, use24Hour, minuteStep } = params;

  const initial = parseCanonical(selected.value);
  const initialHour = initial ? initial.hour : 0;
  const initialMinute = initial ? initial.minute : 0;

  const hour = ref(use24Hour.value ? initialHour : to12Hour(initialHour));
  const minute = ref(snapToStep(initialMinute, minuteStep.value));
  const meridiem = ref<Meridiem>(getMeridiem(initialHour));

  const hourOptions = computed(() => buildHourOptions(use24Hour.value));
  const minuteOptions = computed(() => buildMinuteOptions(minuteStep.value));
  const meridiemOptions = computed(() => buildMeridiemOptions());
  const meridiemIndex = computed(() => indexOfMeridiem(meridiem.value));

  function reset(): void {
    const parts = parseCanonical(selected.value);
    const hour24 = parts ? parts.hour : 0;
    const minute24 = parts ? parts.minute : 0;

    hour.value = use24Hour.value ? hour24 : to12Hour(hour24);
    minute.value = snapToStep(minute24, minuteStep.value);
    meridiem.value = getMeridiem(hour24);
  }

  function setMeridiemIndex(index: number): void {
    meridiem.value = meridiemAtIndex(index);
  }

  function toCanonicalValue(): string {
    const hour24 = use24Hour.value ? hour.value : to24Hour(hour.value, meridiem.value);

    return toCanonical({ hour: hour24, minute: minute.value });
  }

  return {
    hour,
    minute,
    meridiem,
    meridiemIndex,
    hourOptions,
    minuteOptions,
    meridiemOptions,
    reset,
    setMeridiemIndex,
    toCanonicalValue,
  };
}

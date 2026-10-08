export type Meridiem = 'AM' | 'PM';

export interface TimeParts {
  hour: number;
  minute: number;
}

export interface TimeWheelOption {
  value: number;
  label: string;
}

export const HOURS_IN_DAY = 24;

export const MINUTES_IN_HOUR = 60;

const MERIDIEM_ORDER: Meridiem[] = ['AM', 'PM'];

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function range(start: number, endExclusive: number): number[] {
  return Array.from({ length: endExclusive - start }, (_unused, index) => start + index);
}

export function isValidHour(hour: number): boolean {
  return Number.isInteger(hour) && hour >= 0 && hour <= 23;
}

export function isValidMinute(minute: number): boolean {
  return Number.isInteger(minute) && minute >= 0 && minute <= 59;
}

export function toCanonical(parts: TimeParts): string {
  return `${pad(parts.hour)}:${pad(parts.minute)}`;
}

export function parseCanonical(value: string): TimeParts | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);

  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (!isValidHour(hour)) return null;

  if (!isValidMinute(minute)) return null;

  return { hour, minute };
}

export function to12Hour(hour: number): number {
  const hour12 = hour % 12;

  return hour12 === 0 ? 12 : hour12;
}

export function to24Hour(hour12: number, meridiem: Meridiem): number {
  const normalized = hour12 % 12;

  return meridiem === 'PM' ? normalized + 12 : normalized;
}

export function getMeridiem(hour: number): Meridiem {
  return hour < 12 ? 'AM' : 'PM';
}

export function meridiemAtIndex(index: number): Meridiem {
  return index === 1 ? 'PM' : 'AM';
}

export function indexOfMeridiem(meridiem: Meridiem): number {
  return meridiem === 'PM' ? 1 : 0;
}

export function formatDisplay(value: string, use24Hour: boolean): string {
  const parts = parseCanonical(value);

  if (!parts) return '';

  if (use24Hour) return toCanonical(parts);

  return `${pad(to12Hour(parts.hour))}:${pad(parts.minute)} ${getMeridiem(parts.hour)}`;
}

export function parseDisplay(value: string, use24Hour: boolean): TimeParts | null {
  const trimmed = value.trim();

  if (use24Hour) return parseCanonical(trimmed);

  const match = /^(\d{1,2}):(\d{2})\s?([AaPp][Mm])$/.exec(trimmed);

  if (!match) return null;

  const hour12 = Number(match[1]);
  const minute = Number(match[2]);

  if (hour12 < 1 || hour12 > 12) return null;

  if (!isValidMinute(minute)) return null;

  const meridiem = match[3].toUpperCase() as Meridiem;

  return { hour: to24Hour(hour12, meridiem), minute };
}

export function maskForTime(use24Hour: boolean): string {
  return use24Hour ? '##:##' : '##:## AM';
}

export function normalizeMinuteStep(step: number): number {
  if (!Number.isInteger(step) || step < 1 || step >= MINUTES_IN_HOUR) return 1;

  return step;
}

export function snapToStep(minute: number, step: number): number {
  const normalizedStep = normalizeMinuteStep(step);

  if (normalizedStep === 1) return minute;

  return Math.floor(minute / normalizedStep) * normalizedStep;
}

export function buildHourOptions(use24Hour: boolean): TimeWheelOption[] {
  const hours = use24Hour ? range(0, HOURS_IN_DAY) : range(1, 13);

  return hours.map((hour) => ({ value: hour, label: pad(hour) }));
}

export function buildMinuteOptions(step: number): TimeWheelOption[] {
  const normalizedStep = normalizeMinuteStep(step);

  return range(0, MINUTES_IN_HOUR)
    .filter((minute) => minute % normalizedStep === 0)
    .map((minute) => ({ value: minute, label: pad(minute) }));
}

export function buildMeridiemOptions(): TimeWheelOption[] {
  return MERIDIEM_ORDER.map((meridiem) => ({ value: indexOfMeridiem(meridiem), label: meridiem }));
}

export function findNearestOptionIndex(options: TimeWheelOption[], value: number): number {
  if (options.length === 0) return 0;

  return options.reduce((closestIndex, option, index) => {
    const closestDistance = Math.abs(options[closestIndex].value - value);
    const currentDistance = Math.abs(option.value - value);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
}

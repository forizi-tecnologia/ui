export type DocumentType = 'cpf' | 'cnpj';

const CPF_LENGTH = 11;
const CPF_BASE_LENGTH = 9;
const CNPJ_LENGTH = 14;
const CNPJ_BASE_LENGTH = 12;
const ASCII_DIGIT_OFFSET = 48;
const CHECK_DIGIT_MODULO = 11;

const CPF_WEIGHTS_FIRST = [10, 9, 8, 7, 6, 5, 4, 3, 2];
const CPF_WEIGHTS_SECOND = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_WEIGHTS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_WEIGHTS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

const CPF_PATTERN = '###.###.###-##';
const CNPJ_PATTERN = '**.***.***/****-##';
const ALPHANUMERIC_PATTERN = /[^0-9A-Z]/g;
const LETTER_PATTERN = /[A-Z]/;

export function normalizeDocument(value: string): string {
  return value.toUpperCase().replace(ALPHANUMERIC_PATTERN, '');
}

export function detectDocumentType(value: string): DocumentType | null {
  const normalized = normalizeDocument(value);

  if (!normalized) return null;

  if (LETTER_PATTERN.test(normalized)) return 'cnpj';

  if (normalized.length > CPF_LENGTH) return 'cnpj';

  return 'cpf';
}

export function isValidCpf(value: string): boolean {
  const digits = normalizeDocument(value);

  if (digits.length !== CPF_LENGTH) return false;

  if (LETTER_PATTERN.test(digits)) return false;

  if (isRepeatedCharacter(digits)) return false;

  const base = digits.slice(0, CPF_BASE_LENGTH);
  const firstDigit = calculateCheckDigit(base, CPF_WEIGHTS_FIRST);
  const secondDigit = calculateCheckDigit(`${base}${firstDigit}`, CPF_WEIGHTS_SECOND);

  return digits === `${base}${firstDigit}${secondDigit}`;
}

export function isValidCnpj(value: string): boolean {
  const characters = normalizeDocument(value);

  if (characters.length !== CNPJ_LENGTH) return false;

  const base = characters.slice(0, CNPJ_BASE_LENGTH);
  const checkDigits = characters.slice(CNPJ_BASE_LENGTH);

  if (!/^\d{2}$/.test(checkDigits)) return false;

  if (/^0+$/.test(base)) return false;

  const firstDigit = calculateCheckDigit(base, CNPJ_WEIGHTS_FIRST);
  const secondDigit = calculateCheckDigit(`${base}${firstDigit}`, CNPJ_WEIGHTS_SECOND);

  return checkDigits === `${firstDigit}${secondDigit}`;
}

export function isValidCpfCnpj(value: string): boolean {
  const type = detectDocumentType(value);

  if (type === 'cpf') return isValidCpf(value);

  if (type === 'cnpj') return isValidCnpj(value);

  return false;
}

export function formatCpf(value: string): string {
  return applyPattern(normalizeDocument(value).slice(0, CPF_LENGTH), CPF_PATTERN);
}

export function formatCnpj(value: string): string {
  return applyPattern(normalizeDocument(value).slice(0, CNPJ_LENGTH), CNPJ_PATTERN);
}

export function formatCpfCnpj(value: string): string {
  const normalized = normalizeDocument(value);

  if (!normalized) return '';

  if (detectDocumentType(normalized) === 'cnpj') return formatCnpj(normalized);

  return formatCpf(normalized);
}

function calculateCheckDigit(characters: string, weights: number[]): number {
  const total = characters
    .split('')
    .reduce((sum, character, index) => sum + (character.charCodeAt(0) - ASCII_DIGIT_OFFSET) * weights[index], 0);

  const remainder = total % CHECK_DIGIT_MODULO;

  return remainder < 2 ? 0 : CHECK_DIGIT_MODULO - remainder;
}

function isRepeatedCharacter(value: string): boolean {
  return value.split('').every((character) => character === value[0]);
}

function applyPattern(value: string, pattern: string): string {
  let result = '';
  let valueIndex = 0;

  for (const patternCharacter of pattern) {
    if (valueIndex >= value.length) break;

    if (patternCharacter === '#' || patternCharacter === '*') {
      result += value[valueIndex];
      valueIndex += 1;

      continue;
    }

    result += patternCharacter;
  }

  return result;
}

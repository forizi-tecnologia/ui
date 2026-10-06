import { describe, it, expect } from 'vitest';
import {
  normalizeDocument,
  detectDocumentType,
  isValidCpf,
  isValidCnpj,
  isValidCpfCnpj,
  formatCpf,
  formatCnpj,
  formatCpfCnpj,
} from '../document';

const NORMALIZE_CASES = [
  { value: '', expected: '' },
  { value: '123.456.789-01', expected: '12345678901' },
  { value: '12.abc.345/01de-35', expected: '12ABC34501DE35' },
  { value: 'a1b2 c3', expected: 'A1B2C3' },
] as const;

const DETECT_CASES = [
  { value: '', expected: null },
  { value: '123', expected: 'cpf' },
  { value: '12345678901', expected: 'cpf' },
  { value: '123456789012', expected: 'cnpj' },
  { value: '12ABC', expected: 'cnpj' },
  { value: '12.ABC.345/01DE-35', expected: 'cnpj' },
  { value: '11222333000181', expected: 'cnpj' },
] as const;

const VALID_CPF = ['11144477735', '52998224725', '111.444.777-35'] as const;

const INVALID_CPF = [
  '',
  '123',
  '11144477734',
  '12345678900',
  '11111111111',
  '00000000000',
  '99999999999',
  '1114447773a',
] as const;

const VALID_CNPJ = [
  '11222333000181',
  '18781203000128',
  '12ABC34501DE35',
  '12.ABC.345/01DE-35',
  'a1b2c3d4e5f668',
  'XYZABC12345693',
  '00000000000191',
] as const;

const INVALID_CNPJ = [
  '',
  '112223330001',
  '11222333000182',
  '12abc34501de34',
  '00000000000000',
  '11111111111111',
  'A1B2C3D4E5F600',
  '12ABC34501DE3X',
] as const;

const FORMAT_CPF_CASES = [
  { value: '', expected: '' },
  { value: '1', expected: '1' },
  { value: '123', expected: '123' },
  { value: '1234', expected: '123.4' },
  { value: '1234567', expected: '123.456.7' },
  { value: '1234567890', expected: '123.456.789-0' },
  { value: '12345678901', expected: '123.456.789-01' },
  { value: '123456789012', expected: '123.456.789-01' },
] as const;

const FORMAT_CNPJ_CASES = [
  { value: '', expected: '' },
  { value: '1', expected: '1' },
  { value: '12', expected: '12' },
  { value: '123', expected: '12.3' },
  { value: '12ABC', expected: '12.ABC' },
  { value: '12ABC3', expected: '12.ABC.3' },
  { value: '12ABC34501DE', expected: '12.ABC.345/01DE' },
  { value: '12abc34501de35', expected: '12.ABC.345/01DE-35' },
  { value: '12ABC34501DE355', expected: '12.ABC.345/01DE-35' },
] as const;

describe('normalizeDocument', () => {
  it.each(NORMALIZE_CASES)('should normalize "$value" to "$expected"', ({ value, expected }) => {
    expect(normalizeDocument(value)).toBe(expected);
  });
});

describe('detectDocumentType', () => {
  it.each(DETECT_CASES)('should detect "$value" as $expected', ({ value, expected }) => {
    expect(detectDocumentType(value)).toBe(expected);
  });
});

describe('isValidCpf', () => {
  it.each(VALID_CPF)('should accept valid CPF "%s"', (value) => {
    expect(isValidCpf(value)).toBe(true);
  });

  it.each(INVALID_CPF)('should reject invalid CPF "%s"', (value) => {
    expect(isValidCpf(value)).toBe(false);
  });
});

describe('isValidCnpj', () => {
  it.each(VALID_CNPJ)('should accept valid CNPJ "%s"', (value) => {
    expect(isValidCnpj(value)).toBe(true);
  });

  it.each(INVALID_CNPJ)('should reject invalid CNPJ "%s"', (value) => {
    expect(isValidCnpj(value)).toBe(false);
  });
});

describe('isValidCpfCnpj', () => {
  it.each([...VALID_CPF, ...VALID_CNPJ])('should accept valid document "%s"', (value) => {
    expect(isValidCpfCnpj(value)).toBe(true);
  });

  it.each(['', '123', '12345678901234', '12ABC34501DE34'])('should reject invalid document "%s"', (value) => {
    expect(isValidCpfCnpj(value)).toBe(false);
  });
});

describe('formatCpf', () => {
  it.each(FORMAT_CPF_CASES)('should format "$value" as "$expected"', ({ value, expected }) => {
    expect(formatCpf(value)).toBe(expected);
  });
});

describe('formatCnpj', () => {
  it.each(FORMAT_CNPJ_CASES)('should format "$value" as "$expected"', ({ value, expected }) => {
    expect(formatCnpj(value)).toBe(expected);
  });
});

describe('formatCpfCnpj', () => {
  it('should format CPF when up to 11 numeric characters', () => {
    expect(formatCpfCnpj('12345678901')).toBe('123.456.789-01');
  });

  it('should format CNPJ when there are letters', () => {
    expect(formatCpfCnpj('12ABC34501DE35')).toBe('12.ABC.345/01DE-35');
  });

  it('should format CNPJ when longer than 11 characters', () => {
    expect(formatCpfCnpj('11222333000181')).toBe('11.222.333/0001-81');
  });

  it('should return empty string for empty value', () => {
    expect(formatCpfCnpj('')).toBe('');
  });
});

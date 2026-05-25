import { describe, it, expect } from 'vitest';
import { useLoading } from '../useLoading';

const SHOW_CASES = [
  { msg: undefined, expected: 'Carregando...' },
  { msg: 'Saving...', expected: 'Saving...' },
  { msg: 'Processing...', expected: 'Processing...' },
] as const;

describe('useLoading', () => {
  it('should start with isActive false and default message when initialized', () => {
    const { isActive, message } = useLoading();

    expect(isActive.value).toBe(false);
    expect(message.value).toBe('Carregando...');
  });

  it.each(SHOW_CASES)('should set isActive true and message to "$expected" when show is called', ({ msg, expected }) => {
    const { isActive, message, show } = useLoading();

    show(msg);

    expect(isActive.value).toBe(true);
    expect(message.value).toBe(expected);
  });

  it('should toggle isActive between true and false when show then hide are called', () => {
    const { isActive, show, hide } = useLoading();

    expect(isActive.value).toBe(false);

    show();
    expect(isActive.value).toBe(true);

    hide();
    expect(isActive.value).toBe(false);
  });

  it('should not clear the message when hide is called', () => {
    const { isActive, message, show, hide } = useLoading();

    show('Processing...');
    hide();

    expect(isActive.value).toBe(false);
    expect(message.value).toBe('Processing...');
  });

  it('should override the previous message when show is called consecutively', () => {
    const { message, show } = useLoading();

    show('First');
    show('Second');

    expect(message.value).toBe('Second');
  });
});

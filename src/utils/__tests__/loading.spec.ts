import { describe, it, expect } from 'vitest';
import { loading } from '../loading';

describe('loading', () => {
  it('should export show and hide functions', () => {
    expect(typeof loading.show).toBe('function');
    expect(typeof loading.hide).toBe('function');
  });

  it('should not throw when show is called without arguments', () => {
    expect(() => loading.show()).not.toThrow();
  });

  it('should not throw when show is called with a message', () => {
    expect(() => loading.show('Processing...')).not.toThrow();
  });

  it('should not throw when hide is called', () => {
    expect(() => loading.hide()).not.toThrow();
  });

  it('should not throw when show is called consecutively', () => {
    expect(() => {
      loading.show();
      loading.show('Second');
      loading.hide();
    }).not.toThrow();
  });
});

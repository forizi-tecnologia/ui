import { describe, it, expect } from 'vitest';
import { loading, useLoadingRefs } from '../loading';

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

  it('should return reactive refs reflecting loading state via useLoadingRefs', () => {
    const refs = useLoadingRefs();

    loading.show('Salvando...');

    expect(refs.isActive.value).toBe(true);
    expect(refs.message.value).toBe('Salvando...');

    loading.hide();

    expect(refs.isActive.value).toBe(false);
  });

  it('should return the same singleton instance on repeated calls', () => {
    const first = useLoadingRefs();
    const second = useLoadingRefs();

    expect(first).toBe(second);
  });
});

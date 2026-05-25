import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNotifyStore, notify } from '../notify';
import { NOTIFY_DURATION } from '../types';

describe('useNotifyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with default values when initialized', () => {
    const store = useNotifyStore();

    expect(store.isVisible).toBe(false);
    expect(store.type).toBe('info');
    expect(store.title).toBe('');
    expect(store.message).toBe('');
  });

  it('should set visible true and update type, title, message when show is called', () => {
    const store = useNotifyStore();

    store.show('success', 'Title', 'Message');

    expect(store.isVisible).toBe(true);
    expect(store.type).toBe('success');
    expect(store.title).toBe('Title');
    expect(store.message).toBe('Message');
  });

  it('should default message to empty string when show is called without message', () => {
    const store = useNotifyStore();

    store.show('error', 'Title');

    expect(store.message).toBe('');
  });

  it('should set isVisible false when hide is called', () => {
    const store = useNotifyStore();

    store.show('info', 'Test');
    store.hide();

    expect(store.isVisible).toBe(false);
  });

  it('should clear timeoutId when hide is called after show', () => {
    const store = useNotifyStore();

    store.show('info', 'Test');
    store.hide();

    // After hide, the auto-hide timer should be cleared
    vi.advanceTimersByTime(NOTIFY_DURATION + 100);

    expect(store.isVisible).toBe(false);
  });

  it('should auto-hide after NOTIFY_DURATION milliseconds', () => {
    const store = useNotifyStore();

    store.show('info', 'Auto');

    expect(store.isVisible).toBe(true);

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(false);
  });

  it('should clear previous timeout when show is called again', () => {
    const store = useNotifyStore();

    store.show('info', 'First');
    store.show('warning', 'Second');

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(false);
    expect(store.title).toBe('Second');
  });

  it('should reset type when show is called with a different type', () => {
    const store = useNotifyStore();

    store.show('success', 'OK');
    store.show('error', 'Fail');

    expect(store.type).toBe('error');
  });

  describe('pause / resume', () => {
    it('should pause the auto-hide timer and keep notification visible', () => {
      const store = useNotifyStore();

      store.show('info', 'Test');

      vi.advanceTimersByTime(NOTIFY_DURATION / 2);

      store.pause();

      vi.advanceTimersByTime(NOTIFY_DURATION);

      expect(store.isVisible).toBe(true);
    });

    it('should resume the auto-hide timer from where it was paused', () => {
      const store = useNotifyStore();

      store.show('info', 'Test');

      vi.advanceTimersByTime(NOTIFY_DURATION / 2);

      store.pause();
      store.resume();

      vi.advanceTimersByTime(NOTIFY_DURATION / 2 - 100);

      expect(store.isVisible).toBe(true);

      vi.advanceTimersByTime(200);

      expect(store.isVisible).toBe(false);
    });

    it('should hide immediately if remaining time is 0 when pausing', () => {
      const store = useNotifyStore();

      store.show('info', 'Test');

      vi.advanceTimersByTime(NOTIFY_DURATION);

      store.pause();

      expect(store.isVisible).toBe(false);
    });

    it('should not throw when pausing without visible notification', () => {
      const store = useNotifyStore();

      expect(() => store.pause()).not.toThrow();
    });

    it('should not throw when resuming without paused notification', () => {
      const store = useNotifyStore();

      expect(() => store.resume()).not.toThrow();
    });
  });

  describe('cleanup', () => {
    it('should clear timeout and make no changes to visibility', () => {
      const store = useNotifyStore();

      store.show('info', 'Test');
      store.cleanup();

      // cleanup clears the timeout but doesn't change visibility
      expect(store.isVisible).toBe(true);

      // The auto-hide should not fire since timeout was cleared
      vi.advanceTimersByTime(NOTIFY_DURATION + 100);

      expect(store.isVisible).toBe(true);
    });
  });
});

describe('notify singleton', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const NOTIFY_METHODS = [
    { method: 'success' as const, type: 'success' as const },
    { method: 'error' as const, type: 'error' as const },
    { method: 'warning' as const, type: 'warning' as const },
    { method: 'info' as const, type: 'info' as const },
  ] as const;

  it.each(NOTIFY_METHODS)('should call store.show with "$type" type when $method() is called', ({ method, type }) => {
    const store = useNotifyStore();

    notify[method]('Title', 'Message');

    expect(store.isVisible).toBe(true);
    expect(store.type).toBe(type);
    expect(store.title).toBe('Title');
    expect(store.message).toBe('Message');
  });

  it.each(NOTIFY_METHODS)('should call store.show without message when $method() is called with only title', ({ method }) => {
    const store = useNotifyStore();

    notify[method]('Only Title');

    expect(store.title).toBe('Only Title');
    expect(store.message).toBe('');
  });
});

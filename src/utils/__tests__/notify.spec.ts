import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNotifyStore, notify, MAX_NOTIFY_QUEUE } from '../notify';
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

  it('should not throw when hide is called twice in a row', () => {
    const store = useNotifyStore();

    store.show('info', 'Test');
    store.hide();

    expect(() => store.hide()).not.toThrow();
    expect(store.isVisible).toBe(false);
  });

  it('should auto-hide after NOTIFY_DURATION milliseconds', () => {
    const store = useNotifyStore();

    store.show('info', 'Auto');

    expect(store.isVisible).toBe(true);

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(false);
  });

  it('should queue a new notification while one is visible', () => {
    const store = useNotifyStore();

    store.show('info', 'First');
    store.show('warning', 'Second');

    expect(store.isVisible).toBe(true);
    expect(store.title).toBe('First');
    expect(store.pendingCount).toBe(1);
  });

  it('should advance to the queued notification after the first auto-hides', () => {
    const store = useNotifyStore();

    store.show('info', 'First');
    store.show('warning', 'Second');

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(true);
    expect(store.title).toBe('Second');
    expect(store.pendingCount).toBe(0);

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(false);
  });

  it('should advance to the queued notification when dismiss is called', () => {
    const store = useNotifyStore();

    store.show('success', 'First');
    store.show('error', 'Second');

    store.dismiss();

    expect(store.isVisible).toBe(true);
    expect(store.type).toBe('error');
    expect(store.title).toBe('Second');
  });

  it('should stop being visible when dismiss is called without a queued notification', () => {
    const store = useNotifyStore();

    store.show('info', 'Only');
    store.dismiss();

    expect(store.isVisible).toBe(false);
    expect(store.currentId).toBeNull();
  });

  it('should not change the visible notification when dismiss is called while hidden', () => {
    const store = useNotifyStore();

    store.dismiss();

    expect(store.isVisible).toBe(false);
    expect(store.title).toBe('');
  });

  it('should use the per-call duration for the auto-hide timer', () => {
    const store = useNotifyStore();

    store.show('info', 'Slow', '', { duration: 5000 });

    vi.advanceTimersByTime(NOTIFY_DURATION);

    expect(store.isVisible).toBe(true);
    expect(store.duration).toBe(5000);

    vi.advanceTimersByTime(2000);

    expect(store.isVisible).toBe(false);
  });

  it('should drop the oldest queued notification when the queue is full', () => {
    const store = useNotifyStore();

    store.show('info', 'First');
    store.show('info', 'Second');
    store.show('info', 'Third');
    store.show('info', 'Fourth');
    store.show('info', 'Fifth');
    store.show('info', 'Sixth');
    store.show('info', 'Seventh');

    expect(store.pendingCount).toBe(MAX_NOTIFY_QUEUE);
    expect(store.title).toBe('First');

    store.dismiss();

    expect(store.title).toBe('Third');

    store.dismiss();

    expect(store.title).toBe('Fourth');
  });

  it('should reset the show duration to the default after the queue is empty', () => {
    const store = useNotifyStore();

    store.show('info', 'Custom', '', { duration: 5000 });
    store.dismiss();

    expect(store.duration).toBe(NOTIFY_DURATION);
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

      vi.setSystemTime(Date.now() + NOTIFY_DURATION);

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

    it('should be a no-op when resume is called while a timer is already running', () => {
      const store = useNotifyStore();

      store.show('info', 'Test');
      store.resume();

      vi.advanceTimersByTime(NOTIFY_DURATION);

      expect(store.isVisible).toBe(false);
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

    it('should not throw when cleanup is called without an active timeout', () => {
      const store = useNotifyStore();

      expect(() => store.cleanup()).not.toThrow();
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

  it('should call store.show with the given type when notify.show is called directly', () => {
    const store = useNotifyStore();

    notify.show('warning', 'Direct Title', 'Direct Message');

    expect(store.isVisible).toBe(true);
    expect(store.type).toBe('warning');
    expect(store.title).toBe('Direct Title');
    expect(store.message).toBe('Direct Message');
  });

  it('should default message to empty string when notify.show is called without message', () => {
    const store = useNotifyStore();

    notify.show('info', 'Only Title');

    expect(store.message).toBe('');
  });

  it.each(NOTIFY_METHODS)('should forward the duration option when $method() is called', ({ method }) => {
    const store = useNotifyStore();

    notify[method]('Title', 'Message', { duration: 5000 });

    expect(store.duration).toBe(5000);
  });

  it('should forward the duration option when notify.show is called directly', () => {
    const store = useNotifyStore();

    notify.show('info', 'Title', 'Message', { duration: 4000 });

    expect(store.duration).toBe(4000);
  });

  it('should advance the queue when notify.dismiss is called', () => {
    const store = useNotifyStore();

    notify.success('First');
    notify.info('Second');

    notify.dismiss();

    expect(store.title).toBe('Second');
  });

  it('should advance the queue when notify.hide is called', () => {
    const store = useNotifyStore();

    notify.success('First');
    notify.info('Second');

    notify.hide();

    expect(store.title).toBe('Second');
  });
});

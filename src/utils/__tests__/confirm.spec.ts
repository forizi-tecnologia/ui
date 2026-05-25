import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useConfirmStore, confirm } from '../confirm';
import type { ConfirmComponentRef, ConfirmOptions } from '../types';

function createMockConfirmRef(resolveValue: boolean): ConfirmComponentRef {
  return {
    confirmDialog: (
      _title: string,
      _message: string,
      _options?: ConfirmOptions,
    ): Promise<boolean> => {
      return Promise.resolve(resolveValue);
    },
  };
}

describe('useConfirmStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return false when show is called without a confirmRef set', async () => {
    const store = useConfirmStore();

    const result = await store.show('Title', 'Message');

    expect(result).toBe(false);
  });

  it('should resolve with true after setConfirmRef when confirmDialog returns true', async () => {
    const store = useConfirmStore();

    store.setConfirmRef(createMockConfirmRef(true));

    const result = await store.show('Title', 'Message');

    expect(result).toBe(true);
  });

  it('should resolve with false after setConfirmRef when confirmDialog returns false', async () => {
    const store = useConfirmStore();

    store.setConfirmRef(createMockConfirmRef(false));

    const result = await store.show('Title', 'Message');

    expect(result).toBe(false);
  });

  it('should pass options to confirmDialog', async () => {
    const store = useConfirmStore();
    const options: ConfirmOptions = { confirmText: 'Yes', cancelText: 'No' };
    let capturedOptions: ConfirmOptions | undefined;

    store.setConfirmRef({
      confirmDialog: (
        _title: string,
        _message: string,
        opts?: ConfirmOptions,
      ): Promise<boolean> => {
        capturedOptions = opts;

        return Promise.resolve(true);
      },
    });

    await store.show('Title', 'Message', options);

    expect(capturedOptions).toEqual(options);
  });

  it('should pass title and message to confirmDialog', async () => {
    const store = useConfirmStore();
    let capturedTitle = '';
    let capturedMessage = '';

    store.setConfirmRef({
      confirmDialog: (
        title: string,
        message: string,
        _options?: ConfirmOptions,
      ): Promise<boolean> => {
        capturedTitle = title;
        capturedMessage = message;

        return Promise.resolve(true);
      },
    });

    await store.show('Dialog Title', 'Dialog Message');

    expect(capturedTitle).toBe('Dialog Title');
    expect(capturedMessage).toBe('Dialog Message');
  });
});

describe('confirm singleton', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return false when no confirmRef is set', async () => {
    const result = await confirm.show('Title', 'Message');

    expect(result).toBe(false);
  });

  it('should return true when confirmRef resolves to true', async () => {
    const store = useConfirmStore();

    store.setConfirmRef(createMockConfirmRef(true));

    const result = await confirm.show('Title', 'Message');

    expect(result).toBe(true);
  });
});

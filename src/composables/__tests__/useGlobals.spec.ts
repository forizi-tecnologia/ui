import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import { defineComponent } from 'vue';
import { useGlobals } from '../useGlobals';
import globalsPlugin from '../../plugins/globals';
import { notify } from '../../utils/notify';
import { loading } from '../../utils/loading';
import { confirm } from '../../utils/confirm';

describe('useGlobals', () => {
  it('should throw when called outside of setup()', () => {
    expect(() => useGlobals()).toThrow('useGlobals must be called within setup()');
  });

  describe('when called inside a component', () => {
    let result: ReturnType<typeof useGlobals> | null = null;

    const Host = defineComponent({
      setup() {
        result = useGlobals();
      },
      template: '<div />',
    });

    beforeEach(() => {
      result = null;

      const vuetify = createVuetify();
      const pinia = createPinia();

      mount(Host, {
        global: {
          plugins: [vuetify, pinia, globalsPlugin],
        },
      });
    });

    it('should return an object with notify, loading, and confirm keys', () => {
      expect(result).not.toBeNull();
      expect(Object.keys(result!)).toEqual(['notify', 'loading', 'confirm']);
    });

    it('should return notify as the global notify singleton', () => {
      expect(result!.notify).toBe(notify);
    });

    it('should return loading as the global loading singleton', () => {
      expect(result!.loading).toBe(loading);
    });

    it('should return confirm as the global confirm singleton', () => {
      expect(result!.confirm).toBe(confirm);
    });

    it('should return notify with the expected methods', () => {
      expect(typeof result!.notify.success).toBe('function');
      expect(typeof result!.notify.error).toBe('function');
      expect(typeof result!.notify.warning).toBe('function');
      expect(typeof result!.notify.info).toBe('function');
    });

    it('should return loading with the expected methods', () => {
      expect(typeof result!.loading.show).toBe('function');
      expect(typeof result!.loading.hide).toBe('function');
    });

    it('should return confirm with the expected methods', () => {
      expect(typeof result!.confirm.show).toBe('function');
    });
  });
});

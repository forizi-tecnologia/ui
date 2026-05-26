/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { h, defineComponent } from 'vue';
import { createVuetify } from 'vuetify';
import FzConfigProvider from '@/components/FzConfigProvider.vue';
import { useFzDefaults } from '../useFzDefaults';

const vuetify = createVuetify();

const DEFAULT_CASES = [
  { provided: { variant: 'outlined' as const }, expected: 'outlined' },
  { provided: { variant: 'filled' as const }, expected: 'filled' },
  { provided: { variant: 'solo' as const }, expected: 'solo' },
  { provided: {}, expected: 'underlined' },
] as const;

const Consumer = defineComponent({
  setup() {
    const fzDefaults = useFzDefaults();

    return () => h('span', { 'data-test': 'variant' }, fzDefaults.variant ?? 'underlined');
  },
});

describe('useFzDefaults', () => {
  function mountWithProvider(defaults: Record<string, unknown>): VueWrapper {
    return mount(FzConfigProvider, {
      props: { defaults },
      slots: { default: () => h(Consumer) },
      global: { plugins: [vuetify] },
    });
  }

  describe('without FzConfigProvider', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      const EmptyConsumer = defineComponent({
        setup() {
          const fzDefaults = useFzDefaults();

          return () => h('span', { 'data-test': 'result' }, JSON.stringify(fzDefaults));
        },
      });

      wrapper = mount(EmptyConsumer, {
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should return empty object when no FzConfigProvider ancestor exists', () => {
      expect(wrapper.find('[data-test="result"]').text()).toBe('{}');
    });
  });

  describe('with FzConfigProvider', () => {
    it.each(DEFAULT_CASES)('should resolve variant as "$expected" when provider has $provided', ({ provided, expected }) => {
      const wrapper = mountWithProvider(provided);

      expect(wrapper.find('[data-test="variant"]').text()).toBe(expected);
    });
  });
});

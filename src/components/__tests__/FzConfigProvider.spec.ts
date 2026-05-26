 
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { h, defineComponent } from 'vue';
import { createVuetify } from 'vuetify';
import FzConfigProvider from '../FzConfigProvider.vue';
import { useFzDefaults } from '@/composables/useFzDefaults';

const vuetify = createVuetify();

const Consumer = defineComponent({
  setup() {
    const fzDefaults = useFzDefaults();

    return () => h('span', { 'data-test': 'variant' }, fzDefaults.variant ?? 'underlined');
  },
});

describe('FzConfigProvider', () => {
  describe('slot rendering', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(FzConfigProvider, {
        props: { defaults: { variant: 'outlined' } },
        slots: { default: () => h('span', { 'data-test': 'child' }, 'Hello') },
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should render slot content', () => {
      expect(wrapper.find('[data-test="child"]').exists()).toBe(true);
      expect(wrapper.text()).toBe('Hello');
    });
  });

  describe('provide/inject — single child', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(FzConfigProvider, {
        props: { defaults: { variant: 'outlined' } },
        slots: { default: () => h(Consumer) },
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should inject variant default into a single child component', () => {
      expect(wrapper.find('[data-test="variant"]').text()).toBe('outlined');
    });
  });

  describe('provide/inject — multiple children', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(FzConfigProvider, {
        props: { defaults: { variant: 'filled' } },
        slots: {
          default: () => [h(Consumer, { key: 1 }), h(Consumer, { key: 2 })],
        },
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should inject variant default into multiple sibling components', () => {
      const variants = wrapper.findAll('[data-test="variant"]');

      expect(variants).toHaveLength(2);
      expect(variants[0].text()).toBe('filled');
      expect(variants[1].text()).toBe('filled');
    });
  });

  describe('provide/inject — empty defaults', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(FzConfigProvider, {
        props: { defaults: {} },
        slots: { default: () => h(Consumer) },
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should fallback to underlined when no defaults provided', () => {
      expect(wrapper.find('[data-test="variant"]').text()).toBe('underlined');
    });
  });

  describe('provide/inject — nested providers', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(FzConfigProvider, {
        props: { defaults: { variant: 'outlined' } },
        slots: {
          default: () =>
            h(FzConfigProvider, { defaults: { variant: 'solo' } }, () => h(Consumer)),
        },
        global: { plugins: [vuetify] },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should let inner provider override outer provider', () => {
      expect(wrapper.find('[data-test="variant"]').text()).toBe('solo');
    });
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzSelectBase from '../FzSelectBase.vue';
import FzConfigProvider from '@/components/FzConfigProvider.vue';

const ITEMS = [
  { title: 'Alpha', value: 'a' },
  { title: 'Beta', value: 'b' },
] as const;

describe('FzSelectBase', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getSelect() {
    return wrapper.findComponent({ name: 'v-select' });
  }

  function getRules() {
    return getSelect().props('rules') as ((value: unknown) => boolean | string)[];
  }

  it('should render v-select when component is select', () => {
    expect(getSelect().exists()).toBe(true);
  });

  it('should render v-autocomplete when component is autocomplete', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'autocomplete', items: ITEMS },
    });

    expect(wrapper.findComponent({ name: 'v-autocomplete' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'v-select' }).exists()).toBe(false);
  });

  it('should forward items, label and item accessors', () => {
    wrapper = createComponent(FzSelectBase, {
      props: {
        component: 'select',
        items: ITEMS,
        label: 'Categoria',
        itemTitle: 'name',
        itemValue: 'id',
      },
    });

    expect(getSelect().props('items')).toEqual([...ITEMS]);
    expect(getSelect().props('label')).toBe('Categoria');
    expect(getSelect().props('itemTitle')).toBe('name');
    expect(getSelect().props('itemValue')).toBe('id');
  });

  it('should apply the provider defaults', () => {
    const providerWrapper = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined', density: 'compact', hideDetails: false } },
      slots: { default: () => h(FzSelectBase, { component: 'select', items: ITEMS }) },
      global: { plugins: [createVuetify()] },
    });

    const select = providerWrapper.findComponent({ name: 'v-select' });

    expect(select.props('variant')).toBe('outlined');
    expect(select.props('density')).toBe('compact');
    expect(select.props('hideDetails')).toBe(false);

    providerWrapper.unmount();
  });

  it('should prioritize explicit props over provider defaults', () => {
    wrapper = createComponent(FzSelectBase, {
      props: {
        component: 'select',
        items: ITEMS,
        variant: 'filled',
        density: 'default',
        hideDetails: 'auto',
      },
    });

    expect(getSelect().props('variant')).toBe('filled');
    expect(getSelect().props('density')).toBe('default');
    expect(getSelect().props('hideDetails')).toBe('auto');
  });

  it('should build a required rule with the label fallback', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, label: 'Categoria', required: true },
    });

    expect(getRules()[0]('')).toBe('Categoria é obrigatório');
    expect(getRules()[0]('a')).toBe(true);
  });

  it('should fall back to "Campo obrigatório" without a label', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true },
    });

    expect(getRules()[0](null)).toBe('Campo obrigatório');
  });

  it('should use a custom required message', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true, requiredMessage: 'Escolha' },
    });

    expect(getRules()[0](undefined)).toBe('Escolha');
  });

  it('should not require a value when required is false', () => {
    expect(getRules()[0](null)).toBe(true);
  });

  it('should treat an empty array as empty when multiple', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true, multiple: true, label: 'Categorias' },
    });

    expect(getRules()[0]([])).toBe('Categorias é obrigatório');
    expect(getRules()[0](['a'])).toBe(true);
  });

  it('should emit update:modelValue on change', async () => {
    getSelect().vm.$emit('update:modelValue', 'b');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('b');
  });

  it('should map validateOnBlur to validate-on', () => {
    expect(getSelect().props('validateOn')).toBe('blur');

    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, validateOnBlur: false },
    });

    expect(getSelect().props('validateOn')).toBe('input');
  });

  it('should emit isValid false on blur when required and empty', async () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid true on blur when a value is selected', async () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true, modelValue: 'a' },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should emit isValid only when the validity changes', async () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toHaveLength(1);
  });

  it('should emit isValid on update when validateOnBlur is false', async () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true, validateOnBlur: false },
    });

    getSelect().vm.$emit('update:modelValue', 'a');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, required: true, validateOnBlur: false },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should evaluate custom rules', async () => {
    const customRule = (value: unknown) => value === 'a' ? true : 'Selecione Alpha';

    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, modelValue: 'b', rules: [customRule] },
    });

    expect(getRules()).toHaveLength(2);
    expect(getRules()[1]('b')).toBe('Selecione Alpha');

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should forward prepend, append and selection slots', () => {
    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS, modelValue: 'a' },
      slots: {
        prepend: '<span class="custom-prepend">Pre</span>',
        append: '<span class="custom-append">Post</span>',
        selection: '<span class="custom-selection">Alpha</span>',
      },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.custom-append').exists()).toBe(true);
    expect(wrapper.find('.custom-selection').exists()).toBe(true);
  });

  it('should pass through attributes and native listeners', async () => {
    const blurHandler = vi.fn();

    wrapper = createComponent(FzSelectBase, {
      props: { component: 'select', items: ITEMS },
      attrs: { class: 'custom-class', 'data-test': 'base-select', onBlur: blurHandler },
    });

    expect(wrapper.classes()).toContain('custom-class');
    expect(wrapper.attributes('data-test')).toBe('base-select');

    await wrapper.find('input').trigger('focus');
    await wrapper.find('input').trigger('blur');

    expect(blurHandler).toHaveBeenCalled();
  });
});

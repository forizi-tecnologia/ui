import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzAutocompleteField from '../FzAutocompleteField.vue';
import FzConfigProvider from '@/components/FzConfigProvider.vue';

const ITEMS = [
  { title: 'Alpha', value: 'a' },
  { title: 'Beta', value: 'b' },
  { title: 'Gamma', value: 'c' },
] as const;

describe('FzAutocompleteField', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getAutocomplete() {
    return wrapper.findComponent({ name: 'v-autocomplete' });
  }

  function getRules() {
    return getAutocomplete().props('rules') as ((value: unknown) => boolean | string)[];
  }

  it('should render the autocomplete with the items and defaults', () => {
    expect(getAutocomplete().exists()).toBe(true);
    expect(getAutocomplete().props('items')).toEqual([...ITEMS]);
    expect(getAutocomplete().props('itemTitle')).toBe('title');
    expect(getAutocomplete().props('itemValue')).toBe('value');
    expect(getAutocomplete().props('multiple')).toBe(false);
    expect(getAutocomplete().props('clearable')).toBe(false);
    expect(getAutocomplete().props('persistentHint')).toBe(false);
  });

  it('should render the label and persistent hint', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, label: 'Categoria', hint: 'Digite para filtrar', persistentHint: true },
    });

    expect(wrapper.text()).toContain('Categoria');
    expect(wrapper.text()).toContain('Digite para filtrar');
    expect(getAutocomplete().props('hint')).toBe('Digite para filtrar');
    expect(getAutocomplete().props('persistentHint')).toBe(true);
  });

  it('should use custom itemTitle and itemValue', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, itemTitle: 'name', itemValue: 'id' },
    });

    expect(getAutocomplete().props('itemTitle')).toBe('name');
    expect(getAutocomplete().props('itemValue')).toBe('id');
  });

  it('should emit update:modelValue when the selection changes', async () => {
    getAutocomplete().vm.$emit('update:modelValue', 'b');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('b');
  });

  it('should resolve variant and density from the provider defaults', () => {
    const providerWrapper = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined', density: 'compact', hideDetails: false } },
      slots: { default: () => h(FzAutocompleteField, { items: ITEMS }) },
      global: { plugins: [createVuetify()] },
    });

    const autocomplete = providerWrapper.findComponent({ name: 'v-autocomplete' });

    expect(autocomplete.props('variant')).toBe('outlined');
    expect(autocomplete.props('density')).toBe('compact');
    expect(autocomplete.props('hideDetails')).toBe(false);

    providerWrapper.unmount();
  });

  it('should prioritize explicit variant, density and hideDetails props', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: {
        items: ITEMS,
        variant: 'filled',
        density: 'default',
        hideDetails: 'auto',
      },
    });

    expect(getAutocomplete().props('variant')).toBe('filled');
    expect(getAutocomplete().props('density')).toBe('default');
    expect(getAutocomplete().props('hideDetails')).toBe('auto');
  });

  it('should default hideDetails to auto', () => {
    expect(getAutocomplete().props('hideDetails')).toBe('auto');
  });

  it('should build a required rule that fails on empty values', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, label: 'Categoria', required: true },
    });

    const requiredRule = getRules()[0];

    expect(requiredRule('')).toBe('Categoria é obrigatório');
    expect(requiredRule(null)).toBe('Categoria é obrigatório');
    expect(requiredRule('a')).toBe(true);
  });

  it('should fall back to "Campo obrigatório" when there is no label', () => {
    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS, required: true } });

    expect(getRules()[0](null)).toBe('Campo obrigatório');
  });

  it('should use a custom requiredMessage', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, required: true, requiredMessage: 'Escolha uma categoria' },
    });

    expect(getRules()[0]('')).toBe('Escolha uma categoria');
  });

  it('should not block empty values when required is false', () => {
    expect(getRules()[0]('')).toBe(true);
  });

  it('should invalidate an empty array when multiple and required', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, multiple: true, required: true, label: 'Categorias' },
    });

    expect(getRules()[0]([])).toBe('Categorias é obrigatório');
    expect(getRules()[0](['a'])).toBe(true);
  });

  it('should emit isValid false on blur when required and empty', async () => {
    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS, required: true } });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid true on blur when a value is selected', async () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, modelValue: 'a', required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should emit isValid only once when the resolved validity does not change', async () => {
    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS, required: true } });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toHaveLength(1);
  });

  it('should emit isValid on selection when validateOnBlur is false', async () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, required: true, validateOnBlur: false },
    });

    getAutocomplete().vm.$emit('update:modelValue', 'a');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, required: true, validateOnBlur: false },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should map validateOnBlur to the Vuetify validate-on prop', () => {
    expect(getAutocomplete().props('validateOn')).toBe('blur');

    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS, validateOnBlur: false } });

    expect(getAutocomplete().props('validateOn')).toBe('input');
  });

  it('should include custom rules in the merged rules', () => {
    const customRule = (value: unknown) => value === 'a' ? true : 'Selecione Alpha';

    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, rules: [customRule] },
    });

    expect(getRules()).toHaveLength(2);
    expect(getRules()[1]('b')).toBe('Selecione Alpha');
    expect(getRules()[1]('a')).toBe(true);
  });

  it('should emit isValid false when a custom rule fails', async () => {
    const customRule = (value: unknown) => value === 'a' ? true : 'Selecione Alpha';

    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, modelValue: 'b', rules: [customRule] },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should render disabled', () => {
    wrapper = createComponent(FzAutocompleteField, { props: { items: ITEMS, disabled: true } });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });

  it('should render prepend and append slots', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS },
      slots: {
        prepend: '<span class="custom-prepend">Pre</span>',
        append: '<span class="custom-append">Post</span>',
      },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should forward the item, selection and no-data slots', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS },
      slots: {
        item: '<span class="custom-item">Item</span>',
        selection: '<span class="custom-selection">Selection</span>',
        'no-data': '<span class="custom-no-data">Empty</span>',
      },
    });

    const autocomplete = getAutocomplete();

    expect(autocomplete.vm.$slots.item).toBeTruthy();
    expect(autocomplete.vm.$slots.selection).toBeTruthy();
    expect(autocomplete.vm.$slots['no-data']).toBeTruthy();
  });

  it('should render the selection slot content', () => {
    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS, modelValue: 'a' },
      slots: {
        selection: '<span class="custom-selection">Alpha</span>',
      },
    });

    expect(wrapper.find('.custom-selection').exists()).toBe(true);
  });

  it('should pass through class, data attributes and native listeners', async () => {
    const blurHandler = vi.fn();

    wrapper = createComponent(FzAutocompleteField, {
      props: { items: ITEMS },
      attrs: { class: 'custom-class', 'data-test': 'category-autocomplete', onBlur: blurHandler },
    });

    expect(wrapper.classes()).toContain('custom-class');
    expect(wrapper.attributes('data-test')).toBe('category-autocomplete');

    await wrapper.find('input').trigger('focus');
    await wrapper.find('input').trigger('blur');

    expect(blurHandler).toHaveBeenCalled();
  });
});

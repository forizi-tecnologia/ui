import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createComponent } from '@/testutils';
import FzChipsSelect from '../FzChipsSelect.vue';
import FzConfigProvider from '@/components/FzConfigProvider.vue';

const ITEMS = [
  { title: 'Alpha', value: 'a' },
  { title: 'Beta', value: 'b' },
  { title: 'Gamma', value: 'c' },
  { title: 'Delta', value: 'd' },
] as const;

describe('FzChipsSelect', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getAutocomplete() {
    return wrapper.findComponent({ name: 'v-autocomplete' });
  }

  function getChipTexts(): string[] {
    return wrapper.findAllComponents({ name: 'v-chip' }).map((chip) => chip.text());
  }

  it('should render the label', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, label: 'Tags' } });

    expect(wrapper.text()).toContain('Tags');
  });

  it('should be a multiple chip autocomplete with direct selection by default', () => {
    const autocomplete = getAutocomplete();

    expect(autocomplete.props('multiple')).toBe(true);
    expect(autocomplete.props('chips')).toBe(true);
    expect(autocomplete.props('closableChips')).toBe(true);
    expect(autocomplete.props('hideSelected')).toBe(true);
    expect(autocomplete.props('clearOnSelect')).toBe(true);
    expect(autocomplete.props('itemTitle')).toBe('title');
    expect(autocomplete.props('itemValue')).toBe('value');
  });

  it('should allow disabling hideSelected and clearOnSelect', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, hideSelected: false, clearOnSelect: false },
    });

    const autocomplete = getAutocomplete();

    expect(autocomplete.props('hideSelected')).toBe(false);
    expect(autocomplete.props('clearOnSelect')).toBe(false);
  });

  it('should render selected values as chips', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, modelValue: ['a', 'c'] } });

    expect(getChipTexts()).toEqual(['Alpha', 'Gamma']);
  });

  it('should render plain string items as chips', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ['sao-paulo', 'rio'], modelValue: ['sao-paulo'] },
    });

    expect(getChipTexts()).toEqual(['sao-paulo']);
  });

  it('should show an overflow chip with the hidden count', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, modelValue: ['a', 'b', 'c', 'd'], maxVisibleChips: 2 },
    });

    expect(getChipTexts()).toEqual(['Alpha', 'Beta', '+2']);
  });

  it('should not show an overflow chip when everything fits', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, modelValue: ['a', 'b'], maxVisibleChips: 2 },
    });

    expect(getChipTexts()).toEqual(['Alpha', 'Beta']);
  });

  it('should show all chips when maxVisibleChips is not set', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, modelValue: ['a', 'b', 'c', 'd'] },
    });

    expect(getChipTexts()).toEqual(['Alpha', 'Beta', 'Gamma', 'Delta']);
  });

  it('should make the overflow chip non-closable', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, modelValue: ['a', 'b', 'c'], maxVisibleChips: 1 },
    });

    const chips = wrapper.findAllComponents({ name: 'v-chip' });

    expect(chips[1].props('closable')).toBe(false);
  });

  it('should emit update:modelValue when the selection changes', async () => {
    getAutocomplete().vm.$emit('update:modelValue', ['b']);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['b']);
  });

  it('should build a required rule', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, required: true } });

    const rules = getAutocomplete().props('rules') as ((value: unknown) => boolean | string)[];

    expect(rules[0]([])).toBe('Selecione ao menos um item');
    expect(rules[0](['a'])).toBe(true);
  });

  it('should use a custom requiredMessage', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, required: true, requiredMessage: 'Escolha pelo menos uma tag' },
    });

    const rules = getAutocomplete().props('rules') as ((value: unknown) => boolean | string)[];

    expect(rules[0]([])).toBe('Escolha pelo menos uma tag');
  });

  it('should not add a required rule when required is false', () => {
    const rules = getAutocomplete().props('rules') as ((value: unknown) => boolean | string)[];

    expect(rules[0]([])).toBe(true);
  });

  it('should map validateOnBlur to the Vuetify validate-on prop', () => {
    expect(getAutocomplete().props('validateOn')).toBe('blur');

    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, validateOnBlur: false } });

    expect(getAutocomplete().props('validateOn')).toBe('input');
  });

  it('should emit isValid false on blur when required and empty', async () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, required: true } });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(false);
  });

  it('should emit isValid true on blur when a value is selected', async () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, modelValue: ['a'], required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should emit isValid on selection when validateOnBlur is false', async () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, validateOnBlur: false, required: true },
    });

    getAutocomplete().vm.$emit('update:modelValue', ['a']);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('isValid')![0][0]).toBe(true);
  });

  it('should not emit isValid on blur when validateOnBlur is false', async () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS, validateOnBlur: false, required: true },
    });

    const input = wrapper.find('input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('isValid')).toBeUndefined();
  });

  it('should resolve variant and density from the provider defaults', () => {
    const wrapperWithProvider = mount(FzConfigProvider, {
      props: { defaults: { variant: 'outlined', density: 'compact' } },
      slots: { default: () => h(FzChipsSelect, { items: ITEMS }) },
      global: { plugins: [createVuetify()] },
    });

    const autocomplete = wrapperWithProvider.findComponent({ name: 'v-autocomplete' });

    expect(autocomplete.props('variant')).toBe('outlined');
    expect(autocomplete.props('density')).toBe('compact');

    wrapperWithProvider.unmount();
  });

  it('should prioritize the variant and density props', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, variant: 'outlined', density: 'compact' } });

    const autocomplete = getAutocomplete();

    expect(autocomplete.props('variant')).toBe('outlined');
    expect(autocomplete.props('density')).toBe('compact');
  });

  it('should add vertical chip padding for non-outlined variants', () => {
    expect(getAutocomplete().classes()).toContain('fz-chips-select--padded');
  });

  it('should not add vertical chip padding for the outlined variant', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, variant: 'outlined' } });

    expect(getAutocomplete().classes()).not.toContain('fz-chips-select--padded');
  });

  it('should render hint text when provided', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, hint: 'Selecione as tags' } });

    expect(wrapper.text()).toContain('Selecione as tags');
  });

  it('should pass a custom noDataText to the autocomplete', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, noDataText: 'Nada aqui' } });

    expect(getAutocomplete().props('noDataText')).toBe('Nada aqui');
  });

  it('should render prepend and append slots', () => {
    wrapper = createComponent(FzChipsSelect, {
      props: { items: ITEMS },
      slots: {
        prepend: '<span class="custom-prepend">Pre</span>',
        append: '<span class="custom-append">Pos</span>',
      },
    });

    expect(wrapper.find('.custom-prepend').exists()).toBe(true);
    expect(wrapper.find('.custom-append').exists()).toBe(true);
  });

  it('should render with disabled state', () => {
    wrapper = createComponent(FzChipsSelect, { props: { items: ITEMS, disabled: true } });

    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
  });
});

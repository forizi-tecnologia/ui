import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { h } from 'vue';
import { createComponent } from '@/testutils';
import FzPagination from '../FzPagination.vue';

describe('FzPagination', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzPagination, {
      props: { length: 5 },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getButtons() {
    return wrapper.findAllComponents({ name: 'v-btn' });
  }

  function getPreviousButton() {
    return getButtons()[0];
  }

  function getNextButton() {
    return getButtons()[1];
  }

  it('should render the current page and the total length', () => {
    expect(wrapper.text()).toContain('1 de 5');
  });

  it('should render the custom page text through the default slot', () => {
    wrapper.unmount();

    wrapper = createComponent(FzPagination, {
      props: { modelValue: 2, length: 8 },
      slots: {
        default: ({ page, length }: { page: number; length: number }) => h('span', `${page}/${length}`),
      },
    });

    expect(wrapper.text()).toContain('2/8');
  });

  it('should disable the previous button on the first page', () => {
    expect(getPreviousButton().attributes('disabled')).toBeDefined();
  });

  it('should enable the previous button when the page is greater than one', async () => {
    await wrapper.setProps({ modelValue: 2 });

    expect(getPreviousButton().attributes('disabled')).toBeUndefined();
  });

  it('should disable the next button on the last page', async () => {
    await wrapper.setProps({ modelValue: 5 });

    expect(getNextButton().attributes('disabled')).toBeDefined();
  });

  it('should disable both buttons when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });

    expect(getPreviousButton().attributes('disabled')).toBeDefined();
    expect(getNextButton().attributes('disabled')).toBeDefined();
  });

  it('should emit the previous page when the previous button is clicked', async () => {
    await wrapper.setProps({ modelValue: 3 });

    await getPreviousButton().trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2]);
  });

  it('should emit the next page when the next button is clicked', async () => {
    await getNextButton().trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2]);
  });

  it('should not emit when both buttons are disabled', async () => {
    await wrapper.setProps({ disabled: true });

    await getPreviousButton().trigger('click');
    await getNextButton().trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should render the default aria labels', () => {
    expect(getPreviousButton().attributes('aria-label')).toBe('Página anterior');
    expect(getNextButton().attributes('aria-label')).toBe('Próxima página');
  });

  it('should render custom aria labels', async () => {
    await wrapper.setProps({ prevLabel: 'Anterior', nextLabel: 'Próxima' });

    expect(getPreviousButton().attributes('aria-label')).toBe('Anterior');
    expect(getNextButton().attributes('aria-label')).toBe('Próxima');
  });

  it('should render a custom icon when provided', async () => {
    await wrapper.setProps({ prevIcon: 'mdi-arrow-left' });

    expect(getPreviousButton().find('i').classes()).toContain('mdi-arrow-left');
  });
});

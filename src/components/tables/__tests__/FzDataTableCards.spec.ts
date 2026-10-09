import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import type { DataTableHeader } from 'vuetify';
import { createComponent } from '@/testutils';
import FzDataTableCards from '../FzDataTableCards.vue';
import FzPagination from '@/components/navigation/FzPagination.vue';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

const HEADERS: DataTableHeader[] = [
  { title: 'Nome', key: 'name' },
  { title: 'Cidade', key: 'city' },
];

const ITEMS = [
  { name: 'Ana', city: 'São Paulo' },
  { name: 'Bruno', city: 'Curitiba' },
];

describe('FzDataTableCards', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2 },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getCards() {
    return wrapper.findAllComponents({ name: 'v-card' });
  }

  it('should render one card per item', () => {
    expect(getCards()).toHaveLength(2);
  });

  it('should render the header title and the value for each column', () => {
    expect(wrapper.text()).toContain('Nome');
    expect(wrapper.text()).toContain('Ana');
    expect(wrapper.text()).toContain('São Paulo');
  });

  it('should not render the select or expand columns', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: {
        headers: [...HEADERS, { title: 'select', key: 'data-table-select' }],
        items: ITEMS,
        itemsLength: 2,
      },
    });

    expect(wrapper.text()).not.toContain('select');
  });

  it('should render the item slot when provided', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2 },
      slots: {
        'item.name': ({ item }: { item: Record<string, unknown> }) => h('strong', `#${item.name}`),
      },
    });

    expect(wrapper.text()).toContain('#Ana');
  });

  it('should render the card slot instead of the default rows', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2 },
      slots: {
        card: ({ item }: { item: Record<string, unknown> }) => h('div', `card:${item.name}`),
      },
    });

    expect(wrapper.text()).toContain('card:Ana');
    expect(wrapper.text()).not.toContain('Cidade');
  });

  it('should render the loading state', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: [], itemsLength: 0, loading: true },
    });

    expect(wrapper.findComponent({ name: 'v-progress-circular' }).exists()).toBe(true);
    expect(wrapper.text()).toContain('Carregando...');
    expect(getCards()).toHaveLength(0);
  });

  it('should render the empty state when there are no items', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: [], itemsLength: 0 },
    });

    expect(wrapper.text()).toContain('Nenhum registro encontrado');
  });

  it('should render a custom empty text', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: [], itemsLength: 0, noDataText: 'Sem dados' },
    });

    expect(wrapper.text()).toContain('Sem dados');
  });

  it('should not render the pagination when there is a single page', () => {
    expect(wrapper.findComponent(FzPagination).exists()).toBe(false);
  });

  it('should render the pagination when there is more than one page', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 30, itemsPerPage: 10 },
    });

    expect(wrapper.findComponent(FzPagination).exists()).toBe(true);
  });

  it('should not render the pagination when itemsPerPage is not positive', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 30, itemsPerPage: 0 },
    });

    expect(wrapper.findComponent(FzPagination).exists()).toBe(false);
  });

  it('should not scroll internally when height is not set', () => {
    expect(wrapper.find('.fz-data-table-cards__scroll').exists()).toBe(false);
  });

  it('should confine the scroll to the list when height is set', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, height: 400 },
    });

    expect(wrapper.find('.fz-data-table-cards__scroll').exists()).toBe(true);
    expect((wrapper.element as HTMLElement).style.height).toBe('400px');
  });

  it('should use a string height as-is', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, height: '50vh' },
    });

    expect((wrapper.element as HTMLElement).style.height).toBe('50vh');
  });

  it('should not scroll internally when height is an empty string', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, height: '' },
    });

    expect(wrapper.find('.fz-data-table-cards__scroll').exists()).toBe(false);
  });

  it('should apply elevation zero by default', () => {
    expect(getCards()[0].props('elevation')).toBe(0);
  });

  it('should apply a custom elevation', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, elevation: 1 },
    });

    expect(getCards()[0].props('elevation')).toBe(1);
  });

  it('should not render an accent border by default', () => {
    expect(getCards()[0].attributes('style') ?? '').not.toContain('border-left');
  });

  it('should render a left accent border with the default width when accentColor is set', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, accentColor: 'red' },
    });

    const style = getCards()[0].attributes('style') ?? '';

    expect(style).toContain('border-left');
    expect(style).toContain('4px');
    expect(style).toContain('red');
  });

  it('should resolve a theme color name for the accent', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 2, accentColor: 'primary', accentWidth: 6 },
    });

    const style = getCards()[0].attributes('style') ?? '';

    expect(style).toContain('6px');
    expect(style).toContain('solid');
  });

  it('should emit update:page when the pagination changes', async () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableCards, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 30, itemsPerPage: 10, page: 1 },
    });

    wrapper.findComponent(FzPagination).vm.$emit('update:modelValue', 2);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
  });
});

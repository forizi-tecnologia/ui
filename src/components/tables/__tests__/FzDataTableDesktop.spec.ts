import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { h } from 'vue';
import type { DataTableHeader } from 'vuetify';
import { createComponent } from '@/testutils';
import FzDataTableDesktop from '../FzDataTableDesktop.vue';

beforeAll(() => {
  vi.stubGlobal('visualViewport', {
    width: 1024,
    height: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

const HEADERS: DataTableHeader[] = [{ title: 'Nome', key: 'name' }];

const ITEMS = [{ name: 'Ana' }];

describe('FzDataTableDesktop', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    wrapper = createComponent(FzDataTableDesktop, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1 },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getTable() {
    return wrapper.findComponent({ name: 'v-data-table-server' });
  }

  it('should render the data table server', () => {
    expect(getTable().exists()).toBe(true);
  });

  it('should forward the controlled props to the table', () => {
    expect(getTable().props('headers')).toEqual(HEADERS);
    expect(getTable().props('items')).toEqual(ITEMS);
    expect(getTable().props('itemsLength')).toBe(1);
  });

  it('should forward the height to the table', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableDesktop, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1, height: 400 },
    });

    expect(getTable().props('height')).toBe(400);
  });

  it('should apply the pt-BR footer defaults', () => {
    expect(getTable().props('itemsPerPageText')).toBe('Itens por página');
    expect(getTable().props('pageText')).toBe('{0}-{1} de {2}');
  });

  it('should let tableProps override the footer defaults', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableDesktop, {
      props: {
        headers: HEADERS,
        items: ITEMS,
        itemsLength: 1,
        tableProps: { itemsPerPageText: 'Rows', density: 'compact' },
      },
    });

    expect(getTable().props('itemsPerPageText')).toBe('Rows');
    expect(getTable().props('density')).toBe('compact');
  });

  it('should render a forwarded slot without scope', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableDesktop, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1 },
      slots: {
        top: () => h('div', 'top content'),
      },
    });

    expect(wrapper.text()).toContain('top content');
  });

  it('should render a forwarded item slot', () => {
    wrapper.unmount();

    wrapper = createComponent(FzDataTableDesktop, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1 },
      slots: {
        'item.name': ({ item }: { item: Record<string, unknown> }) => h('strong', `#${item.name}`),
      },
    });

    expect(wrapper.text()).toContain('#Ana');
  });

  it('should re-emit update:page from the table', async () => {
    getTable().vm.$emit('update:page', 3);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:page')?.[0]).toEqual([3]);
  });

  it('should re-emit update:itemsPerPage from the table', async () => {
    getTable().vm.$emit('update:itemsPerPage', 25);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toEqual([25]);
  });

  it('should re-emit update:sortBy from the table', async () => {
    getTable().vm.$emit('update:sortBy', [{ key: 'name', order: 'asc' }]);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:sortBy')?.[0]).toEqual([[{ key: 'name', order: 'asc' }]]);
  });

  it('should re-emit update:options from the table', async () => {
    const options = { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: '' };

    getTable().vm.$emit('update:options', options);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:options')?.[0]).toEqual([options]);
  });

  describe('row click', () => {
    function getRows() {
      return wrapper.findAll('tbody tr');
    }

    it('should emit row-click with the item and the mouse event when clickableRows is true', async () => {
      wrapper.unmount();

      wrapper = createComponent(FzDataTableDesktop, {
        props: { headers: HEADERS, items: ITEMS, itemsLength: 1, clickableRows: true },
      });

      await getRows()[0].trigger('click');

      const emitted = wrapper.emitted('row-click');

      expect(emitted).toBeTruthy();
      expect(emitted![0][0]).toEqual(ITEMS[0]);
      expect(emitted![0][1]).toBeInstanceOf(MouseEvent);
    });

    it('should not emit row-click when clickableRows is false', async () => {
      await getRows()[0].trigger('click');

      expect(wrapper.emitted('row-click')).toBeFalsy();
    });

    it('should not emit row-click when the click target is an action button', async () => {
      wrapper.unmount();

      wrapper = createComponent(FzDataTableDesktop, {
        props: { headers: HEADERS, items: ITEMS, itemsLength: 1, clickableRows: true },
        slots: {
          'item.name': () => h('button', { class: 'row-action' }, 'Editar'),
        },
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('row-click')).toBeFalsy();
    });
  });

  describe('no-data slot', () => {
    it('should render the no-data slot content when there are no items', () => {
      wrapper.unmount();

      wrapper = createComponent(FzDataTableDesktop, {
        props: { headers: HEADERS, items: [], itemsLength: 0 },
        slots: {
          'no-data': () => h('div', { class: 'custom-empty' }, 'Nenhuma fatura'),
        },
      });

      expect(wrapper.find('.custom-empty').exists()).toBe(true);
    });

    it('should fall back to noDataText when the slot is not provided', () => {
      wrapper.unmount();

      wrapper = createComponent(FzDataTableDesktop, {
        props: { headers: HEADERS, items: [], itemsLength: 0, noDataText: 'Sem dados' },
      });

      expect(wrapper.text()).toContain('Sem dados');
    });
  });
});

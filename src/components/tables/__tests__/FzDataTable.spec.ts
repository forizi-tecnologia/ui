import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { h, type Slot } from 'vue';
import type { DataTableHeader } from 'vuetify';
import { createComponent } from '@/testutils';
import FzDataTable from '../FzDataTable.vue';

const breakpointState = vi.hoisted(() => ({ isMobile: false }));

vi.mock('@/composables/useBreakpoint', () => ({
  useBreakpoint: () => ({
    isMobile: {
      get value() {
        return breakpointState.isMobile;
      },
    },
    isMobileOrTablet: {
      get value() {
        return breakpointState.isMobile;
      },
    },
  }),
}));

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

describe('FzDataTable', () => {
  let wrapper: ReturnType<typeof createComponent>;

  beforeEach(() => {
    breakpointState.isMobile = false;

    wrapper = createComponent(FzDataTable, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1 },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function mountTable(props: Record<string, unknown>, slots?: Record<string, Slot>) {
    wrapper.unmount();

    wrapper = createComponent(FzDataTable, {
      props: { headers: HEADERS, items: ITEMS, itemsLength: 1, ...props },
      slots,
    });
  }

  it('should render the table on a large screen when mobile is not set', () => {
    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FzDataTableCards' }).exists()).toBe(false);
  });

  it('should render the cards on a small screen when mobile is not set', () => {
    breakpointState.isMobile = true;

    mountTable({});

    expect(wrapper.findComponent({ name: 'FzDataTableCards' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).exists()).toBe(false);
  });

  it('should render the table when mobile is false even on a small screen', () => {
    breakpointState.isMobile = true;

    mountTable({ mobile: false });

    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).exists()).toBe(true);
  });

  it('should render the cards when mobile is true even on a large screen', () => {
    mountTable({ mobile: true });

    expect(wrapper.findComponent({ name: 'FzDataTableCards' }).exists()).toBe(true);
  });

  it('should forward tableProps to the table', () => {
    mountTable({ tableProps: { density: 'compact' } });

    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).props('tableProps')).toEqual({ density: 'compact' });
  });

  it('should forward an item slot to the table', () => {
    mountTable({ mobile: false }, {
      'item.name': ({ item }) => [h('strong', `#${item.name}`)],
    });

    expect(wrapper.text()).toContain('#Ana');
  });

  it('should forward an item slot to the cards', () => {
    mountTable({ mobile: true }, {
      'item.name': ({ item }) => [h('strong', `#${item.name}`)],
    });

    expect(wrapper.text()).toContain('#Ana');
  });

  it('should forward the card slot to the cards', () => {
    mountTable({ mobile: true }, {
      card: ({ item }) => [h('div', `card:${item.name}`)],
    });

    expect(wrapper.text()).toContain('card:Ana');
  });

  it('should emit update:page when the table changes the page', async () => {
    wrapper.findComponent({ name: 'FzDataTableDesktop' }).vm.$emit('update:page', 3);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:page')?.[0]).toEqual([3]);
  });

  it('should emit update:page when the cards change the page', async () => {
    mountTable({ mobile: true });

    wrapper.findComponent({ name: 'FzDataTableCards' }).vm.$emit('update:page', 2);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
  });

  it('should emit update:itemsPerPage when the table changes the page size', async () => {
    wrapper.findComponent({ name: 'FzDataTableDesktop' }).vm.$emit('update:itemsPerPage', 25);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toEqual([25]);
  });

  it('should emit update:sortBy when the table changes the sort', async () => {
    const sort = [{ key: 'name', order: 'asc' }];

    wrapper.findComponent({ name: 'FzDataTableDesktop' }).vm.$emit('update:sortBy', sort);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:sortBy')?.[0]).toEqual([sort]);
  });

  it('should re-emit update:options from the table', async () => {
    const options = { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: '' };

    wrapper.findComponent({ name: 'FzDataTableDesktop' }).vm.$emit('update:options', options);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:options')?.[0]).toEqual([options]);
  });

  it('should forward the height to the table', () => {
    mountTable({ height: 400 });

    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).props('height')).toBe(400);
  });

  it('should forward the height to the cards', () => {
    mountTable({ mobile: true, height: 400 });

    expect(wrapper.findComponent({ name: 'FzDataTableCards' }).props('height')).toBe(400);
  });

  it('should forward the elevation and accent to the cards', () => {
    mountTable({ mobile: true, elevation: 1, accentColor: 'primary', accentWidth: 6 });

    const cards = wrapper.findComponent({ name: 'FzDataTableCards' });

    expect(cards.props('elevation')).toBe(1);
    expect(cards.props('accentColor')).toBe('primary');
    expect(cards.props('accentWidth')).toBe(6);
  });

  it('should pass the pt-BR labels to the children', () => {
    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).props('noDataText')).toBe('Nenhum registro encontrado');
    expect(wrapper.findComponent({ name: 'FzDataTableDesktop' }).props('loadingText')).toBe('Carregando...');
  });
});

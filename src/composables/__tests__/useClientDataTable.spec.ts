import { describe, it, expect } from 'vitest';
import { nextTick, ref } from 'vue';
import { useClientDataTable } from '../useClientDataTable';

interface Row {
  id: number;
  name?: string | null;
  amount?: number | null;
  user?: { name: string };
}

function createRows(count: number): Row[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    amount: index + 1,
  }));
}

describe('useClientDataTable', () => {
  it('should paginate with the default page size of 25', () => {
    const source = ref(createRows(60));
    const table = useClientDataTable(source);

    expect(table.total.value).toBe(60);
    expect(table.pageCount.value).toBe(3);
    expect(table.pageItems.value).toHaveLength(25);
    expect(table.pageItems.value[0].id).toBe(1);
  });

  it('should paginate with a custom page size', () => {
    const source = ref(createRows(60));
    const table = useClientDataTable(source, 10);

    expect(table.pageItems.value).toHaveLength(10);
    expect(table.pageCount.value).toBe(6);
  });

  it('should return the rows for the current page', () => {
    const source = ref(createRows(30));
    const table = useClientDataTable(source, 10);

    table.page.value = 2;

    expect(table.pageItems.value.map((row) => row.id)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('should return every row and a single page when itemsPerPage is zero', () => {
    const source = ref(createRows(30));
    const table = useClientDataTable(source, 0);

    expect(table.pageItems.value).toHaveLength(30);
    expect(table.pageCount.value).toBe(1);
  });

  it('should return every row and a single page when itemsPerPage is negative', () => {
    const source = ref(createRows(30));
    const table = useClientDataTable(source, -1);

    expect(table.pageItems.value).toHaveLength(30);
    expect(table.pageCount.value).toBe(1);
  });

  it('should sort numbers in ascending order', () => {
    const source = ref<Row[]>([
      { id: 1, amount: 30 },
      { id: 2, amount: 10 },
      { id: 3, amount: 20 },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'amount', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.amount)).toEqual([10, 20, 30]);
  });

  it('should sort numbers in descending order', () => {
    const source = ref<Row[]>([
      { id: 1, amount: 30 },
      { id: 2, amount: 10 },
      { id: 3, amount: 20 },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'amount', order: 'desc' }];

    expect(table.pageItems.value.map((row) => row.amount)).toEqual([30, 20, 10]);
  });

  it('should sort strings with the pt-BR collator', () => {
    const source = ref<Row[]>([
      { id: 1, name: 'Zebra' },
      { id: 2, name: 'água' },
      { id: 3, name: 'Abacaxi' },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'name', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.name)).toEqual(['Abacaxi', 'água', 'Zebra']);
  });

  it('should compare numeric strings numerically', () => {
    const source = ref<Row[]>([
      { id: 1, name: 'Item 10' },
      { id: 2, name: 'Item 2' },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'name', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.name)).toEqual(['Item 2', 'Item 10']);
  });

  it('should sort by a nested path', () => {
    const source = ref<Row[]>([
      { id: 1, user: { name: 'Bruno' } },
      { id: 2, user: { name: 'Ana' } },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'user.name', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.user?.name)).toEqual(['Ana', 'Bruno']);
  });

  it('should keep rows with null or undefined values at the end in ascending order', () => {
    const source = ref<Row[]>([
      { id: 1, amount: null },
      { id: 2, amount: 20 },
      { id: 3, amount: undefined },
      { id: 4, amount: 10 },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'amount', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.id)).toEqual([4, 2, 1, 3]);
  });

  it('should preserve the original order when there is no sort', () => {
    const source = ref(createRows(3));
    const table = useClientDataTable(source);

    expect(table.pageItems.value.map((row) => row.id)).toEqual([1, 2, 3]);
  });

  it('should preserve the original order when all sort values are equal', () => {
    const source = ref<Row[]>([
      { id: 1, amount: 10 },
      { id: 2, amount: 10 },
    ]);
    const table = useClientDataTable(source);

    table.sortBy.value = [{ key: 'amount', order: 'asc' }];

    expect(table.pageItems.value.map((row) => row.id)).toEqual([1, 2]);
  });

  it('should reset the page to 1 when the source changes', async () => {
    const source = ref(createRows(60));
    const table = useClientDataTable(source, 10);

    table.page.value = 3;

    source.value = createRows(5);
    await nextTick();

    expect(table.page.value).toBe(1);
    expect(table.pageItems.value).toHaveLength(5);
  });
});

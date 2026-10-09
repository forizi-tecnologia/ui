import type { DataTableHeader, DataTableSortItem } from 'vuetify';
import type { VDataTableServer } from 'vuetify/components';

export type DataTableServerProps = VDataTableServer['$props'];

export type DataTableControlledKey =
  | 'headers'
  | 'items'
  | 'itemsLength'
  | 'loading'
  | 'page'
  | 'itemsPerPage'
  | 'sortBy'
  | 'search';

export type DataTablePassthroughProps = Partial<Omit<DataTableServerProps, DataTableControlledKey>>;

export interface DataTableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: readonly DataTableSortItem[];
  groupBy: readonly DataTableSortItem[];
  search: string;
}

export interface VisibleColumn {
  title: string;
  key: string;
}

const NON_DATA_COLUMN_KEYS = new Set(['data-table-select', 'data-table-expand']);

export function getValueByPath(item: unknown, path: string): unknown {
  if (item === null || item === undefined || typeof item !== 'object') return undefined;

  return path.split('.').reduce<unknown>((current, key) => {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;

    return (current as Record<string, unknown>)[key];
  }, item);
}

export function getVisibleColumns(headers: DataTableHeader[]): VisibleColumn[] {
  return headers
    .filter((header) => header.key !== undefined && !NON_DATA_COLUMN_KEYS.has(String(header.key)))
    .map((header) => ({ title: header.title ?? '', key: String(header.key) }));
}

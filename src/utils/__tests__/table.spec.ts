import { describe, it, expect, afterEach } from 'vitest';
import type { DataTableHeader } from 'vuetify';
import { getValueByPath, getVisibleColumns, isInteractiveRowTarget } from '../table';

describe('getValueByPath', () => {
  const item = {
    id: 1,
    name: 'Ana',
    address: { city: 'São Paulo', geo: { lat: -23.5 } },
  };

  it('should return the top-level value when the path has a single segment', () => {
    expect(getValueByPath(item, 'name')).toBe('Ana');
  });

  it('should return the nested value when the path has multiple segments', () => {
    expect(getValueByPath(item, 'address.geo.lat')).toBe(-23.5);
  });

  it('should return undefined when the item is null', () => {
    expect(getValueByPath(null, 'name')).toBeUndefined();
  });

  it('should return undefined when the item is undefined', () => {
    expect(getValueByPath(undefined, 'name')).toBeUndefined();
  });

  it('should return undefined when the item is a primitive', () => {
    expect(getValueByPath('text', 'name')).toBeUndefined();
  });

  it('should return undefined when an intermediate segment is missing', () => {
    expect(getValueByPath(item, 'address.country.code')).toBeUndefined();
  });

  it('should return undefined when an intermediate segment is a primitive', () => {
    expect(getValueByPath(item, 'name.length')).toBeUndefined();
  });

  it('should return undefined when the final key is missing', () => {
    expect(getValueByPath(item, 'missing')).toBeUndefined();
  });
});

describe('getVisibleColumns', () => {
  const headers: DataTableHeader[] = [
    { title: 'Nome', key: 'name' },
    { title: '', key: 'data-table-select' },
    { title: '', key: 'data-table-expand' },
    { title: 'Cidade', key: 'city' },
  ];

  it('should remove the select and expand columns', () => {
    const columns = getVisibleColumns(headers);

    expect(columns.map((column) => column.key)).toEqual(['name', 'city']);
  });

  it('should keep every column when there are no internal columns', () => {
    const columns = getVisibleColumns([{ title: 'Nome', key: 'name' }]);

    expect(columns).toHaveLength(1);
  });

  it('should default the title to an empty string when it is missing', () => {
    const columns = getVisibleColumns([{ key: 'name' } as DataTableHeader]);

    expect(columns[0].title).toBe('');
  });
});

describe('isInteractiveRowTarget', () => {
  const container = document.createElement('div');

  afterEach(() => {
    container.innerHTML = '';
  });

  it('should return false when the target is null', () => {
    expect(isInteractiveRowTarget(null)).toBe(false);
  });

  it('should return false when the target is not an Element', () => {
    expect(isInteractiveRowTarget({} as EventTarget)).toBe(false);
  });

  it('should return false when the target is a plain element', () => {
    const span = document.createElement('span');

    container.append(span);

    expect(isInteractiveRowTarget(span)).toBe(false);
  });

  it.each([
    ['button', 'button'],
    ['a', 'a'],
    ['input', 'input'],
    ['select', 'select'],
    ['textarea', 'textarea'],
  ])('should return true when the target is a %s', (_label, tagName) => {
    const element = document.createElement(tagName);

    container.append(element);

    expect(isInteractiveRowTarget(element)).toBe(true);
  });

  it.each(['v-btn', 'v-icon--clickable', 'v-chip--clickable'])(
    'should return true when the target has the %s class',
    (className) => {
      const element = document.createElement('span');

      element.classList.add(className);
      container.append(element);

      expect(isInteractiveRowTarget(element)).toBe(true);
    },
  );

  it('should return true when an ancestor carries the data-row-click-ignore attribute', () => {
    const wrapper = document.createElement('div');
    const inner = document.createElement('span');

    wrapper.setAttribute('data-row-click-ignore', '');
    wrapper.append(inner);
    container.append(wrapper);

    expect(isInteractiveRowTarget(inner)).toBe(true);
  });
});

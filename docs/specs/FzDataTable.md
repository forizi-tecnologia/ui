# Spec — FzDataTable

> Status: implemented. Search is a plain prop (Vuetify never emits `update:search`).
> Written in English to match the sibling docs (`ARCHITECTURE.md`, `COGNITIVE.md`).
> UI label defaults are pt-BR (library convention).

## 1. Overview

`FzDataTable` is a responsive, server-side data table for the Forizi UI library.
On large screens it renders Vuetify's `v-data-table-server`; below the mobile
breakpoint it renders a list of `v-card`s plus a custom `FzPagination`. The
consumer imports a single component — the breakpoint decision is internal.

### Goals

- One public `FzDataTable` that switches between table (desktop) and cards (mobile).
- Server-side by default: `items` is the current page, `itemsLength` is the total.
- Mirror Vuetify's `v-data-table-server` props through an optional `tableProps`
  object (typed from Vuetify's own types), plus a small set of explicit controlled props.
- Forward **all** Vuetify slots (`item.<key>`, `header.<key>`, `top`, `bottom`,
  `no-data`, `loading`, ...) to the internal table, and reuse `item.<key>` inside
  the cards so custom cell rendering works in both layouts.
- Reusable, publicly exported `FzPagination` (prev / current page / total / next).
- pt-BR labels by default, overridable via props.

### Non-goals (v1)

- Client-side mode as a `clientSide` prop on `FzDataTable` — use the exported
  `useClientDataTable` composable instead.
- Mobile sorting / selection UI (cards are read-only; selection on mobile deferred).
- Column groups / tree data on the cards.
- Full custom card replacement (consumer replaces the whole `v-card`); v1 only
  offers content inside a standard `v-card`.
- Custom breakpoint value (fixed to `smAndDown`); a `mobileBreakpoint` prop may come later.

## 2. Public API

### `FzDataTable`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headers` | `FzDataTableHeader[]` | — (required) | Column definitions. `hideOnCard: true` drops the column from the mobile cards. |
| `items` | `unknown[]` | — (required) | Current page of rows. |
| `itemsLength` | `number` | — (required) | Total row count (server-side). |
| `loading` | `boolean` | `false` | Loading state for both layouts. |
| `page` | `number` | `1` | Current page (`v-model:page`). |
| `itemsPerPage` | `number` | `10` | Rows per page (`v-model:items-per-page`). |
| `sortBy` | `DataTableSortItem[]` | `[]` | Sort state (`v-model:sort-by`). |
| `search` | `string` | `''` | Search term (plain prop; forwarded to the table). |
| `height` | `string \| number` | `undefined` | Confines the scroll to the list. Desktop → forwarded to `v-data-table-server`; mobile → the card area scrolls with the pagination pinned below. |
| `elevation` | `number` | `0` | Card elevation (mobile cards only). |
| `accentColor` | `string` | `undefined` | Left accent border color on the cards (mobile only). Unset → no accent. |
| `accentWidth` | `number` | `4` | Left accent border width in px (mobile only). |
| `mobile` | `boolean \| undefined` | `undefined` | Force cards (`true`) or table (`false`). `undefined` → auto via `useBreakpoint().isMobileOrTablet`. |
| `noDataText` | `string` | `'Nenhum registro encontrado'` | Empty state text. |
| `loadingText` | `string` | `'Carregando...'` | Loading text (mobile layout). |
| `clickableRows` | `boolean` | `false` | Enables `row-click` on desktop rows and mobile cards. |
| `tableProps` | `Partial<Omit<VDataTableServer['$props'], ControlledKeys>>` | `{}` | Any other `v-data-table-server` prop. Merged before the controlled props. |

`ControlledKeys = 'headers' | 'items' | 'itemsLength' | 'loading' | 'page' | 'itemsPerPage' | 'sortBy' | 'search'`.

Types imported from Vuetify: `DataTableHeader`, `DataTableSortItem`, and the
`VDataTableServer` instance type (exported by `vuetify/components`). Validated:
the derived type compiles.

#### Events

| Event | Payload | When |
|-------|---------|------|
| `update:page` | `number` | Page changes (table footer or `FzPagination`). |
| `update:itemsPerPage` | `number` | Page size changes (desktop footer). |
| `update:sortBy` | `DataTableSortItem[]` | Sort changes (desktop header). |
| `update:options` | `{ page, itemsPerPage, sortBy, groupBy, search }` | Vuetify's consolidated fetch hook (forwarded from the internal table). |
| `row-click` | `(item: T, event: MouseEvent)` | A row/card is clicked while `clickableRows` is true and the target is not interactive (`isInteractiveRowTarget`). |

#### Slots

- `#card="{ item, index }"` — replaces the **content** inside the standard
  `v-card` (mobile). Without it, the card auto-renders `header.title` + value rows.
- `#no-data` — replaces `noDataText` in both the desktop table and the mobile
  empty state. It is not rendered while `loading` is true.
- Every other slot is forwarded verbatim to `v-data-table-server` (desktop) and,
  for `item.<key>`, also used as the value renderer inside the mobile cards.

```vue
<FzDataTable
  :headers="headers"
  :items="items"
  :items-length="total"
  v-model:page="page"
>
  <!-- custom cell: works in the table AND in the card value -->
  <template #item.codigo="{ item }">
    <span class="text-medium-emphasis">{{ formatCode(item.id) }}</span>
  </template>

  <!-- optional: full card body (mobile) -->
  <template #card="{ item }">
    <div class="d-flex flex-column ga-1">
      <span class="text-subtitle-1 font-weight-medium">{{ item.name }}</span>
      <span class="text-body-2">{{ item.email }}</span>
    </div>
  </template>
</FzDataTable>
```

### `FzPagination`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `1` | Current page (`v-model`). |
| `length` | `number` | — (required) | Total number of pages. |
| `disabled` | `boolean` | `false` | Disables both arrows. |
| `color` | `string` | `undefined` | Theme color for the arrows. |
| `prevLabel` | `string` | `'Página anterior'` | `aria-label` of the previous arrow. |
| `nextLabel` | `string` | `'Próxima página'` | `aria-label` of the next arrow. |

- Emits `update:modelValue` with the new page (clamped to `1..length`).
- Prev arrow disabled when `disabled || modelValue <= 1`; next when `disabled || modelValue >= length`.
- Layout: `[‹]  {page} de {length}  [›]`. The center text is overridable via the
  default slot `#default="{ page, length }"`.

## 3. Card behavior (mobile)

- One `v-card` per item, `v-for` over `items`.
- Default body: for each visible card header (`getCardColumns`), a row with the
  header title (muted) and the value. Value priority:
  1. forwarded slot `item.<key>` (scope `{ item, index, value }`),
  2. `getValueByPath(item, header.key)`.
- `getCardColumns` skips `data-table-select`, `data-table-expand` and every header
  with `hideOnCard: true`; the desktop keeps the column.
- `#card="{ item, index }"` overrides the body completely.
- Skipped headers: `data-table-select` and `data-table-expand` (no UI in v1).
- States:
  - `loading` → centered `v-progress-circular` + `loadingText`.
  - `!items.length && !loading` → `#no-data` slot or `noDataText` centered.
- Cards are clickable when `clickableRows` is true: `cursor-pointer` class and
  `row-click(item, event)`, unless the click target is interactive
  (button/link/input/`.v-btn`/`.v-icon--clickable`/`.v-chip--clickable`) or sits
  under `data-row-click-ignore`.
- Below the cards: `FzPagination` when `pageCount > 1`, where
  `pageCount = itemsPerPage > 0 ? Math.ceil(itemsLength / itemsPerPage) : 1`.
- With `height` set, the card area becomes a scroll region (`flex: 1 1 0; overflow-y: auto`)
  and the pagination stays pinned below. Without `height`, the page scrolls normally.
- Card body padding is 8px (`v-card-text.pa-2`).
- Cards are flat by default (`elevation: 0`); an optional left accent border is
  configured with `accentColor` / `accentWidth`.

## 4. Desktop behavior

- Renders `v-data-table-server` with `items`, `itemsLength`, `headers` and the
  controlled models.
- pt-BR footer defaults (overridable via `tableProps`):
  `itemsPerPageText: 'Itens por página'`, `pageText: '{0}-{1} de {2}'`.
- `tableProps` is merged first; the controlled props and pt-BR footer defaults are
  applied after so the API contract wins, except for the footer labels which the
  consumer may override through `tableProps`.
- `clickableRows` adds the `onClick:row` listener to Vuetify's row attrs when true
  (and stays absent when false, so Vuetify does not add its clickable-row class).
  The payload shape comes from Vuetify: `(event, { item, index })`.
- `#no-data` is rendered explicitly; it is excluded from the generic slot
  forwarding to avoid a duplicated slot.
- Interactive click targets are rejected by `isInteractiveRowTarget`.

## 5. Architecture / file decomposition

```
src/
  utils/
    table.ts                         ← pure: getValueByPath, getVisibleColumns, isInteractiveRowTarget
    __tests__/table.spec.ts
  composables/
    useClientDataTable.ts            ← PUBLIC: client-side pagination + sorting
    __tests__/useClientDataTable.spec.ts
  components/
    tables/
      FzDataTable.vue                ← PUBLIC wrapper: breakpoint + prop/slot routing
      FzDataTableDesktop.vue         ← internal: v-data-table-server
      FzDataTableCards.vue           ← internal: v-for → v-card + FzPagination
      FzDataTable.stories.ts
      __tests__/
        FzDataTable.spec.ts
        FzDataTableDesktop.spec.ts
        FzDataTableCards.spec.ts
    navigation/
      FzPagination.vue               ← PUBLIC
      FzPagination.stories.ts
      __tests__/FzPagination.spec.ts
```

Wrapper responsibilities (thin):

1. `useBreakpoint().isMobileOrTablet` unless `props.mobile` is defined.
2. Proxy models (`defineModel('page'|'itemsPerPage'|'sortBy'|'search')`) to whichever child renders.
3. Forward all slots except `#card` and `#no-data`, which are passed explicitly.
4. Re-emit `update:options` and `row-click` from the active child.

Slot forwarding (the key requirement):

```vue
<component :is="activeComponent" v-bind="bindings">
  <template v-for="(_, slotName) in forwardedSlots" #[slotName]="slotProps">
    <slot :name="slotName" v-bind="slotProps ?? {}" />
  </template>
</component>
```

`forwardedSlots = computed(() => omit($slots, ['card']))`. `#card` is passed
explicitly to `FzDataTableCards`.

### `src/utils/table.ts` — proposed pure API

```ts
getValueByPath(item: unknown, path: string): unknown   // dot paths, safe on missing
getVisibleColumns(headers: DataTableHeader[]): VisibleColumn[]
getCardColumns(headers: FzDataTableHeader[]): VisibleColumn[]
isInteractiveRowTarget(target: EventTarget | null): boolean
```

`useClientDataTable(source: Ref<T[]>, initialItemsPerPage = 25)` returns
`{ page, itemsPerPage, sortBy, pageItems, total, pageCount }`. It sorts with
`getValueByPath` (numeric + `pt-BR` `Intl.Collator`), disables pagination when
`itemsPerPage <= 0`, and resets `page` to 1 when the source ref changes.

## 6. CSS (scoped, only where Vuetify has no utility)

- Card list gap/spacing: Vuetify utilities (`d-flex flex-column ga-*`, `pa-*`).
- `FzPagination` internal layout: Vuetify utilities; any centering that Vuetify
  cannot express uses a minimal scoped rule.
- No `!important`, colors via theme.

## 7. Test plan (100% coverage required)

- **table.spec.ts**: `getValueByPath` (top-level, nested, missing → `undefined`),
  `getVisibleColumns` (filters `data-table-select` / `data-table-expand`),
  `getCardColumns` (also drops `hideOnCard`),
  `isInteractiveRowTarget` (native controls, Vuetify clickable classes, escape hatch).
- **useClientDataTable.spec.ts**: default/custom page size, pagination disabled,
  asc/desc by number, `pt-BR` collator and numeric strings, nested paths, null-safe,
  reset on source change.
- **FzPagination.spec.ts**: renders `page de length`; prev disabled at page 1;
  next disabled at page === length; emits on click; clamps; `disabled` blocks
  both; custom `prevLabel`/`nextLabel`; default slot override.
- **FzDataTableCards.spec.ts**: one card per item; default rows from headers;
  `item.<key>` slot used as value; `#card` override; loading state; empty state
  (`#no-data` + fallback); row click (enabled/disabled/interactive target);
  pagination shown only when `pageCount > 1`; emits `update:page`.
- **FzDataTableDesktop.spec.ts**: renders `v-data-table-server`; forwards slots;
  pt-BR footer defaults; `tableProps` merged; row click (enabled/disabled/
  interactive target); `#no-data` slot + fallback.
- **FzDataTable.spec.ts**: `mobile=false` → desktop child; `mobile=true` → cards
  child; `mobile=undefined` uses `useBreakpoint` (mocked) for both branches; model
  proxy emits; `update:options` and `row-click` re-emitted; `#no-data` reaches both
  layouts; `#card` not forwarded to desktop.

Notes: jsdom/Vuetify overlay helpers from `COGNITIVE.md` #27 apply (`visualViewport`
and `ResizeObserver` stubs where needed).

## 8. Registration & exports

- `src/components/index.ts`: export `FzDataTable` and `FzPagination`.
- `src/vuetifyComponents.ts`: add `VDataTableServer` (`VCard`, `VCardText`,
  `VProgressCircular`, `VBtn`, `VIcon` already listed).
- Storybook: `FzDataTable.stories.ts` (desktop table, mobile cards, custom cell,
  custom card, loading, empty) and `FzPagination.stories.ts`.
- Playground: add a `TablesPlayground.vue` view.

## 9. Docs to update (auto-learning rule)

- `ARCHITECTURE.md`: `tables/` and `navigation/` families, `utils/table.ts`.
- `COGNITIVE.md`: decisions — server-side first; wrapper + internal presenters
  (mirrors the FzDatePicker family); custom cards over Vuetify's native mobile
  mode (native renders a plain label/value list, not a card); typed `tableProps`
  derived from Vuetify; generic slot forwarding; `item.<key>` reused in cards;
  public `FzPagination`.

## 10. Acceptance criteria

- [ ] Large screen renders `v-data-table-server`; mobile renders `v-card`s + `FzPagination`.
- [ ] `mobile` prop overrides the auto breakpoint in both directions.
- [ ] Server-side models (`page`, `itemsPerPage`, `sortBy`, `search`) are proxied and emitted.
- [ ] `tableProps` accepts arbitrary `v-data-table-server` props with types, controlled props win.
- [ ] `#item.<key>` slots render the same in the table and in the cards.
- [ ] `#card` overrides the card body.
- [ ] `#no-data` replaces the empty state in both layouts, with `noDataText` fallback.
- [ ] `hideOnCard` drops a column from the cards while the desktop keeps it.
- [ ] `row-click` emits `(item, event)` on both layouts and ignores interactive targets.
- [ ] `useClientDataTable` is exported, tested and documented.
- [ ] `FzPagination` disables prev on first page and next on last.
- [ ] pt-BR labels by default, all overridable.
- [ ] Barrel exports + Storybook + playground entry.
- [ ] `pnpm check` green with 100% coverage; `pnpm build` green.
- [ ] Code in English, UI labels pt-BR, zero comments, no `any`, no `!important`.

## 11. Open / deferred

- A `clientSide` prop on `FzDataTable` itself (the composable is the current API).
- Mobile sorting / selection UI.
- Whole-card replacement slot.
- `mobileBreakpoint` prop (currently fixed to `smAndDown`).
- Column groups on the cards.
- Full pt-BR translation of Vuetify's built-in locale strings (v1 overrides only
  the footer labels via props).

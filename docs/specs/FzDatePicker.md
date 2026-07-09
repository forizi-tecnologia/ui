# Spec — FzDatePicker

> Status: draft — awaiting approval before implementation.
> Written in English to match the sibling docs (`ARCHITECTURE.md`, `COGNITIVE.md`).
> UI label defaults are pt-BR (library convention).

## 1. Overview

`FzDatePicker` is a date input for the Forizi UI library. It combines a masked text
field (type the date directly) with a calendar modal (pick the date visually). It lives
in `src/components/inputs/` and follows the same patterns as the other `Fz*` inputs
(`useFzDefaults` for `variant`, validation like `FzEmailField`, `prepend`/`append` slots).

### Goals

- Type a date directly in the field using a mask driven by the `format` prop.
- Pick a date in a fixed-size modal with three drill-down views (days → months → years).
- Show an "invalid date" validation message on blur.
- Labels (month names, weekday initials) in pt-BR or en via the `locale` prop.
- `v-model` is always a canonical ISO string (`yyyy-mm-dd`), independent of the display format.

### Non-goals (v1)

- No literal 3D iOS "wheel" (CSS transform rotation). The years view is a vertical
  scroll list with center highlight + scroll-snap — the iOS *feel*, not a 3D wheel.
- No time picker, no range selection, no multiple dates.
- No `minYear`/`maxYear` props (the year list bounds derive from `min`/`max`, or a
  default constant range). Deferred to keep the API small (YAGNI).
- No `weekStartsOn` prop (fixed to Sunday for both locales). Deferred.

## 2. Public API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Selected date as ISO `yyyy-mm-dd`. `''` = no date. |
| `format` | `'dd/mm/yyyy' \| 'yyyy-mm-dd'` | `'dd/mm/yyyy'` | Display format + mask. Does NOT affect `v-model` (always ISO). |
| `locale` | `'pt-BR' \| 'en'` | `'pt-BR'` | Language of month names and weekday initials. |
| `label` | `string` | `'Data'` | Field label. |
| `rules` | `ValidationRule[]` | `[]` | Extra rules, merged after the internal date validation. |
| `disabled` | `boolean` | `false` | Disables the field and the calendar trigger. |
| `hint` | `string` | `''` | Persistent helper text (shown when non-empty), like the other inputs. |
| `required` | `boolean` | `false` | Empty value fails validation when `true`. |
| `validateOnBlur` | `boolean` | `true` | Resolve validation / emit `isValid` on blur (else on input). |
| `requiredMessage` | `string` | `''` | Override for the required message (fallback `'Data é obrigatória'`). |
| `invalidMessage` | `string` | `''` | Override for invalid/out-of-range message (fallback `'Data inválida'`). |
| `variant` | `TextFieldVariant` | `undefined` | Resolved via `useFzDefaults`: `props.variant ?? defaults.variant ?? 'underlined'`. |
| `min` | `string \| null` | `null` | Minimum selectable date (ISO). `null` = unbounded. |
| `max` | `string \| null` | `null` | Maximum selectable date (ISO). `null` = unbounded. |
| `icon` | `string` | `'mdi-calendar'` | Calendar trigger icon (prepend-inner). |
| `width` | `string \| number` | `500` | Modal width (px). |
| `height` | `string \| number` | `500` | Modal fixed height (px). |

`ValidationRule = (value: string) => boolean | string` (same local type used by the other inputs).

### Events

| Event | Payload | When |
|-------|---------|------|
| `update:modelValue` | `string` (ISO or `''`) | A complete, valid, in-range date is typed or picked; `''` when cleared/invalid. |
| `isValid` | `boolean` | On blur (or on input when `validateOnBlur === false`), mirroring `FzEmailField`. |

### Slots

- `prepend`, `append` — same passthrough pattern as the other inputs.

### Exposed types (barrel)

- `FzDatePicker` (default export) via `src/components/index.ts`.
- Re-exported types from `src/utils/date.ts`: `DateFormat`, `DateLocale`.

## 3. Field behavior (text input)

- The mask is always active, derived from `format`:
  - `dd/mm/yyyy` → `##/##/####`
  - `yyyy-mm-dd` → `####-##-##`
- The displayed string is derived from the ISO `modelValue` via `formatDisplay(iso, format)`.
- On input: parse the typed string strictly (`parseDisplay`). If it is a complete, real,
  in-range calendar date → emit ISO via `update:modelValue`. Otherwise → emit `''`.
- On blur: run validation. If the raw text is non-empty but not a valid date → show the
  invalid message. If empty and `required` → show the required message.
- Clicking the prepend-inner calendar icon opens the modal (via `@click:prepend-inner`).
  The field stays editable for typing.

### Validation

Mirrors `FzEmailField`:

```
validateDate(value):
  if empty        → required ? (requiredMessage || 'Data é obrigatória') : true
  if not real/complete date per format → invalidMessage || 'Data inválida'
  if out of [min, max]                 → invalidMessage || 'Data inválida'
  else            → true

mergedRules = [validateDate, ...props.rules]
```

- `isValid` ref drives the `isValid` emit (and could tint the icon, optional).
- Out-of-range reuses `invalidMessage` (single message prop) to keep the API small.

## 4. Calendar modal

A `v-dialog` (non-persistent: backdrop/Escape closes without committing). Fixed size:
a `v-card` with `width`/`height` from props. Internal layout is a flex column:

```
┌─────────────────────────────┐  ← v-card, fixed width × height
│  ‹   {title}   ›             │  header (fixed height)
├─────────────────────────────┤
│                             │
│      active view (100%)      │  content area: flex-grow-1, overflow hidden
│                             │
└─────────────────────────────┘
```

The content area keeps the same box across all three views; each view fills 100% of it.

### Header

- Left arrow ‹ and right arrow › on the sides; clickable title text in the center.
- Title text and arrow actions depend on the active view:

| View | Title | ‹ / › arrows | Title click → |
|------|-------|--------------|----------------|
| days | `Janeiro de 2026` | previous / next month (rolls year over) | months view |
| months | `2026` | previous / next year | years view |
| years | `2020 – 2029` (visible page) | previous / next page of years | months view |

### Drill-down / drill-up flow

- days view: click a day → set value (emit ISO) + close modal.
- months view: click a month → go to days view for that month/year.
- years view: click a year → go to months view for that year.
- "Hoje" button (days view only, centered at the bottom): select today → emit ISO + close.
  Disabled when today is outside `[min, max]`.

### Views

- **Days view**: row of weekday initials (`getWeekdayInitials(locale)`), then a 7-column
  grid of day cells (`buildMonthMatrix`). Cells outside `[min, max]` are disabled/muted.
  The selected day and "today" are highlighted (theme colors, no hardcoded colors).
- **Months view**: 3-column × 4-row grid filling 100% of the content area. Month labels
  from `getMonthNames(locale)`. Selected month highlighted.
- **Years view**: vertical scroll list filling 100%, `overflow-y: auto` + CSS scroll-snap,
  selected year highlighted and scrolled into view on open. Bounds:
  `[min.year ?? 1900, max.year ?? 2100]`.

### Transitions

Vue `<Transition>` between views (fade/slide). Transition class names are the only place
custom CSS is used for the switch (no Vuetify utility for that).

### Open state

- On open, focused month/year = selected date's, or today's when no selection.
- Initial view = days.

## 5. Internationalization

- `locale: 'pt-BR' | 'en'` selects label sets in `src/utils/date.ts`:
  - Month names (`Janeiro…` / `January…`).
  - Weekday initials starting Sunday (`D S T Q Q S S` / `S M T W T F S`).
- No i18n library (consistent with the lib's no-i18n decision). Pure lookup tables.

## 6. Architecture / file decomposition

Grouped as a component family under `inputs/datepicker/`. Only `FzDatePicker` is exported.

```
src/
  utils/
    date.ts                         ← pure functions, no Vue (fully unit-tested)
    __tests__/date.spec.ts
  composables/
    useDatePicker.ts                ← reactive calendar state/navigation (no inject → testable directly)
    __tests__/useDatePicker.spec.ts
  components/
    inputs/
      datepicker/
        FzDatePicker.vue            ← PUBLIC: field + mask + validation + modal orchestration
        FzDatePickerCalendar.vue    ← modal shell: v-dialog + header + transition + view switch
        FzDatePickerDaysView.vue
        FzDatePickerMonthsView.vue
        FzDatePickerYearsView.vue
        __tests__/
          FzDatePicker.spec.ts
          FzDatePickerCalendar.spec.ts
      FzDatePicker.stories.ts       ← Storybook (or inside datepicker/)
  components/index.ts               ← add: export { default as FzDatePicker } from './inputs/datepicker/FzDatePicker.vue'
```

Rationale: keeps each file within the ~250-line guideline, isolates pure logic for 100%
coverage, and reuses only already-registered Vuetify components (VDialog, VCard, VBtn,
VIcon, VTextField, VSpacer) — no need to add `VDatePicker` to `requiredVuetifyComponents`.

### `src/utils/date.ts` — proposed pure API

```ts
export type DateFormat = 'dd/mm/yyyy' | 'yyyy-mm-dd';
export type DateLocale = 'pt-BR' | 'en';

maskForFormat(format): string
isRealDate(day, month, year): boolean          // month lengths + leap years
parseDisplay(value, format): DateParts | null  // strict; null when invalid/incomplete
parseIso(iso): DateParts | null
toIso(parts): string
formatDisplay(iso, format): string             // '' when iso invalid/empty
isWithinRange(iso, min, max): boolean
todayIso(): string
buildMonthMatrix(year, month): (DateCell | null)[]  // 7-col weeks, Sunday first
getMonthNames(locale): string[]
getWeekdayInitials(locale): string[]
```

### `src/composables/useDatePicker.ts` — proposed reactive API

State: `activeView` (`'days' | 'months' | 'years'`), `focusedYear`, `focusedMonth`.
Actions: `prevMonth`, `nextMonth`, `prevYear`, `nextYear`, `prevYearPage`, `nextYearPage`,
`openMonths`, `openYears`, `selectYear`, `selectMonth`.
Computed: `dayMatrix`, `monthLabels`, `weekdayLabels`, `yearList`, `isDisabled(iso)`.

## 7. CSS (scoped, only where Vuetify has no utility)

- Days grid: `grid-template-columns: repeat(7, 1fr)`.
- Months grid: `grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(4, 1fr); height: 100%`.
- Years list: `overflow-y: auto; scroll-snap-type: y proximity`.
- Content area: `flex-grow-1` (Vuetify util) + `overflow: hidden`.
- `<Transition>` class names.
- Everything else via Vuetify utility classes. No `!important`. Colors via theme.

## 8. Test plan (100% coverage required)

- **date.spec.ts** (`it.each` heavy): mask per format; `isRealDate` (29/02 leap vs non-leap,
  31/04 invalid, 00 invalid); `parseDisplay` strict for both formats; `formatDisplay`
  round-trip; `buildMonthMatrix` shape + leading blanks; month/weekday labels per locale;
  `isWithinRange`; `toIso`/`parseIso`.
- **useDatePicker.spec.ts**: month roll-over across year boundary; year navigation; view
  switches (openMonths/openYears, selectYear→months, selectMonth→days); year list bounds
  from min/max vs default; `isDisabled` with min/max.
- **FzDatePicker.spec.ts**: default label; display for a modelValue in both formats; typing
  a valid date emits ISO; typing invalid → blur shows 'Data inválida' + `isValid=false`;
  empty + required → 'Data é obrigatória'; custom messages; icon click opens modal;
  selecting a day emits ISO + closes; "Hoje" selects today; `disabled`; min/max (typed
  out-of-range invalid, disabled days not selectable, "Hoje" disabled out of range);
  `variant` resolves via `FzConfigProvider`; prepend/append slots; merged custom rules.
- **FzDatePickerCalendar.spec.ts**: header title per view; arrow navigation; drill flow.

## 9. Storybook

`FzDatePicker.stories.ts` with `argTypes` for every public prop (`control` + `description`).
Stories: Default (pt-BR, dd/mm/yyyy), IsoFormat (yyyy-mm-dd), EnglishLocale, WithValue,
Required, MinMax, Disabled.

## 10. Docs to update (auto-learning rule)

- `ARCHITECTURE.md`: add FzDatePicker to the inputs list + the `datepicker/` family note.
- `COGNITIVE.md`: record the decisions (custom calendar over `v-date-picker`; ISO `v-model`
  independent of display format; no date library; deferred `minYear`/`maxYear`/`weekStartsOn`).

## 11. Acceptance criteria

- [ ] Type + mask works for both formats; `v-model` emits ISO `yyyy-mm-dd`.
- [ ] Invalid date on blur shows the validation message; `isValid` emitted.
- [ ] Modal opens from the calendar icon; three views with the specified header/flow.
- [ ] Modal keeps the same width/height across all three views; grids/list fill 100%.
- [ ] Labels switch with `locale`.
- [ ] `disabled`, `min`, `max` respected in field validation and in the calendar.
- [ ] Barrel export + types; Storybook story; playground entry.
- [ ] `pnpm check` (lint + test) green, 100% coverage; `pnpm build` green.
- [ ] Code in English, UI labels pt-BR, zero comments, no `any`, no `!important`.

## 12. Open / deferred

- Separate out-of-range message prop (reuse `invalidMessage` for now).
- `weekStartsOn`, `minYear`/`maxYear`, fullscreen-on-mobile — deferred unless requested.

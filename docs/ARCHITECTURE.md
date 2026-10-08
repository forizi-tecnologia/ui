# Architecture

## Folder structure

```
docs/
  specs/           ─ Component specs written before implementation
    FzDatePicker.md
src/
  components/       ─ Reusable Vue components
    buttons/        ─ Icon-only button with tooltip (FzIconToolTip)
    inputs/         ─ Form inputs (FzZipCodeField, FzEmailField, FzCpfCnpjField, FzChipsSelect, FzPasswordField, FzFullAddress, FzDateRangeField, etc.)
      datepicker/   ─ FzDatePicker family (public component + internal calendar shell/views)
      timepicker/   ─ FzTimePicker family (public component + internal menu/wheel)
    layout/         ─ App shell components (FzLoadingOverlay)
    modals/         ─ Modal dialogs (FzModalBase)
    messages/       ─ Notification/confirm (FzFloatingNotify, FzConfirmDialog, FzCustomConfirmDialog)
    FzConfigProvider.vue ─ Global defaults via provide/inject
    index.ts        ─ Barrel — exports every component

  composables/      ─ Vue composables
    useBreakpoint   ─ Responsive breakpoints
    useGlobals      ─ Access $notify/$loading/$confirm from setup
    useLoading      ─ Reactive loading state (isActive, message, show, hide)
    useFzDefaults   ─ Resolve component defaults from FzConfigProvider
    useNumericInput ─ Shared numeric keydown handler + input formatting
    useDatePicker   ─ Reactive calendar state (navigation, drill-down, focused month/year)

  types/            ─ Library-specific TypeScript types
    FzDefaults.ts   ─ Shared defaults interface for FzConfigProvider

  constants/        ─ Injection keys and library constants
    index.ts        ─ FZ_DEFAULTS_KEY (Symbol for provide/inject)

  utils/            ─ Pure utility functions, no Vue dependency
    notify.ts       ─ Global notification singleton
    loading.ts      ─ Global loading singleton (wraps useLoading)
    confirm.ts      ─ Global confirm dialog singleton
    api.ts          ─ Axios wrapper
    date.ts         ─ Date parsing, formatting, validation, calendar grid
    document.ts     ─ CPF/CNPJ (numeric + alphanumeric) normalization, detection, validation, formatting
    types.ts        ─ Shared types and constants
    vuetify-check.ts

  plugins/          ─ Vue plugins
    globals.ts      ─ Registers $notify, $loading, $confirm on app

  index.ts          ─ Main entry point
```

## Component pattern

### Props down, Events up

```
parent template:
  <LoadingOverlay :is-loading="state.isActive" :message="state.message" />

parent script:
  const state = useLoading()
  state.show('Saving...')   // sets isActive = true
  state.hide()              // sets isActive = false
```

- **Props** control component state (isLoading, message, delay)
- **Events** communicate back to parent (update:modelValue, click, etc.)
- **No defineExpose** for imperative control — use composables or props

### Exception: imperative dialogs (ConfirmDialog)

`ConfirmDialog` / `CustomConfirmDialog` still use `defineExpose` because they are Promise-based — the consumer calls `confirmDialog(title, message, options)` which returns a `Promise<boolean>`. This pattern is necessary for the async confirm UX:

```
template ref → confirmDialog() → Promise<boolean> → resolve on button click
```

The exposed method follows camelCase: `confirmDialog`. Exported type: `ConfirmComponentRef`.

### LoadingOverlay flow

1. Consumer calls `loading.show('msg')` or uses `useLoading()` composable
2. Reactive state (`isActive`) is bound via `:is-loading` prop
3. Component renders overlay immediately (fade transition)
4. Content (spinner + text) appears after 300ms delay (delayed transition)
5. On `hide()`, overlay fades out + timeout is cleaned up

### Theme system

The library does not manage theme state. Consumers control themes directly via Vuetify:

```ts
// Set theme mode
vuetify.theme.global.name.value = 'dark';

// Configure custom colors
vuetify({ theme: { themes: { light: { colors: { primary: '#00008B' } } } } })
```

For localStorage persistence, consumers implement their own toggle:

```ts
const isDark = ref(false);
function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('app-theme', isDark.value ? 'dark' : 'light');
  vuetify.theme.global.name.value = isDark.value ? 'dark' : 'light';
}
```

### Global defaults — FzConfigProvider + useFzDefaults

The `FzConfigProvider` component uses Vue's `provide`/`inject` to set default props for all `Fz*` components in its subtree. Components resolve their props with this priority:

1. Prop passed directly to the component (highest)
2. Default from `FzConfigProvider`
3. Hardcoded fallback in the component (`'underlined'`, `'auto'` for `hideDetails`)

```vue
<!-- App.vue -->
<FzConfigProvider :defaults="{ variant: 'outlined' }">
  <router-view />
  <!-- All Fz inputs inherit variant="outlined" -->
</FzConfigProvider>
```

Individual overrides still work:
```vue
<FzPhoneField variant="filled" />  <!-- one-off override -->
```

Architecture:
- `FzConfigProvider` → `provide(FZ_DEFAULTS_KEY, props.defaults)`
- `useFzDefaults()` → `inject(FZ_DEFAULTS_KEY, {})`
- Each component → `props.variant ?? defaults.variant ?? 'underlined'`

The `FzDefaults` interface is extensible for future shared props (density, color, etc.).

`hideDetails` is a shared default: every input resolves `props.hideDetails ?? defaults.hideDetails ?? 'auto'`, so setting `hideDetails: 'auto'` (or `false`) once in `FzConfigProvider` applies to all fields, and a single field can still override it with `hide-details`.

### Global utilities

- `notify.show()`, `loading.show()`, `confirm()` are singletons
- Available via `$notify`, `$loading`, `$confirm` in templates
- Or via `useGlobals()` composable in script setup
- Internally use composables, not component refs

### Keyboard shortcuts in dialogs

Both `FzConfirmDialog` and `FzModalBase` support keyboard shortcuts — disabled by default for safety:

| Key | Prop | Default | Action |
|-----|------|---------|--------|
| Enter | `enterToConfirm` | `false` | Triggers the primary/confirm action |
| Escape | gated by `persistent` | `true` | Triggers cancel (only when `persistent: false`) |

```ts
// ConfirmDialog
confirm.show('Tem certeza?', 'Essa ação é irreversível', {
  enterToConfirm: true,   // Enter confirma
  persistent: false,       // Escape fecha
});

// ModalBase
<FzModalBase
  v-model="open"
  :enter-to-confirm="true"
  :persistent="false"
  :actions="actions"
/>
```

Both dialogs follow the same contract: the consumer explicitly opts into shortcuts. This prevents accidental confirmations on destructive operations.

### FzModalBase — spacing contract

Vertical rhythm lives entirely in the modal chrome; the body is neutral so consumers
control the spacing of the content they pass through the default slot.

| Section | Classes | Result |
|---------|---------|--------|
| Title | `px-6 pt-6 pb-4` | 24px top inset, 16px below the title |
| Body (`v-card-text`) | `px-6 py-0` (with title) / `px-6 pt-6 pb-0` (no title) | lateral only; top inset only when there is no title |
| Actions | `px-6 py-4` | 16px above and below the buttons |

All three sections use `px-6` (24px), so the title, body content and action buttons share
the same horizontal guides. The body has no vertical padding so consumers can add their
own (e.g. `<div class="py-4">` in the slot) without fighting the component. When no title
is provided, the body gets `pt-6`/`pb-0` so content never touches the card's top edge.

Measured with Playwright against the playground (`ModalPlayground.vue`).

### FzDatePicker — component family

`FzDatePicker` is composed of one public component and internal-only pieces under
`src/components/inputs/datepicker/`. Only `FzDatePicker` is exported from the barrel;
the rest are implementation details:

```
inputs/datepicker/
  FzDatePicker.vue           ─ public: masked v-text-field + validation + calendar trigger
  FzDatePickerCalendar.vue   ─ internal: v-menu dropdown shell (header nav + view switch)
  FzDatePickerDaysView.vue   ─ internal: day grid + weekday initials + "Hoje" shortcut
  FzDatePickerMonthsView.vue ─ internal: 3x4 month grid
  FzDatePickerYearsView.vue  ─ internal: scrollable year list
```

Supporting layers, following the standard Component → Composable → Utility split:

- `src/utils/date.ts` — pure date functions, no Vue dependency (parsing, formatting,
  validation, calendar matrix, locale labels). Fully unit-tested in isolation.
- `src/composables/useDatePicker.ts` — reactive calendar state (active view, focused
  month/year, navigation, drill-down/up) built on top of `date.ts`.

**v-model contract**: always a canonical ISO string (`yyyy-mm-dd`), independent of the
`format` prop used for display/mask. This keeps the value backend-friendly regardless of
how it is shown to the user.

**Calendar UI**: a `v-menu` dropdown anchored to the calendar icon (`append-inner`), not
a `v-dialog`. The dropdown keeps an identical fixed width/height across its three views
(days → months → years) via a flex column with `flex: 1 1 0; min-height: 0` on the
content area — without `min-height: 0` the years list (200+ items) stretches the
container instead of scrolling internally.

### FzDateRangeField — composite input

`FzDateRangeField` wraps two `FzDatePicker` instances side by side in a `v-row`/`v-col`
layout, separated by a configurable text (default `"até"`). It reuses all existing date
logic (parsing, formatting, calendar, validation) from `FzDatePicker`.

**v-model contract**: a `DateRange` object `{ start: string | null, end: string | null }`
with canonical ISO strings. `null` means "no date selected", distinct from an empty string.

**Range validation**: a cross-field rule on the end date checks that `start > end` never
occurs. The rule parses the displayed text to ISO before comparing. Custom message
overridable via `rangeInvalidMessage` prop.

**Global min/max**: `min` and `max` props pass through to both `FzDatePicker` instances
to constrain valid date ranges consistently.

### FzTimePicker — component family

`FzTimePicker` is a time-only input (mask + wheel picker) built in the same style as
`FzDatePicker`, grouped under `src/components/inputs/timepicker/`. Only `FzTimePicker` is
exported.

```
inputs/timepicker/
  FzTimePicker.vue        ─ public: masked field + validation + wheel trigger
  FzTimePickerMenu.vue    ─ internal: v-menu shell + wheel row + highlight band
  FzTimeWheel.vue         ─ internal: generic scroll-snap wheel
```

Supporting layers, following the Component → Composable → Utility split:

- `src/utils/time.ts` — pure functions (parse/format 24h & 12h, wheel options, step
  snapping), fully unit-tested.
- `src/composables/useTimePicker.ts` — wheel state (`hour`/`minute`/`meridiem`) + option
  lists.

**v-model contract**: always canonical 24h `HH:mm`, independent of the display mode.
`use24Hour=false` only changes the mask/display (`hh:mm AM/PM`) and adds an AM/PM wheel.

**Wheel behavior**: native `scroll-snap-type: y mandatory` with top/bottom spacers so the
first and last items can center; a theme-aware highlight band marks the selection and a
mask gradient fades the edges. Scrolling updates the value live and emits on every change
(the menu stays open, unlike the calendar); `minuteStep` filters the minute options and
snaps non-aligned minutes on open.

**12h mask**: maska custom tokens (`A` → `[AaPp]`, `M` → `[Mm]`, both uppercasing) turn
`0230pm` into `02:30 PM`.

No new Vuetify component was added (`VMenu`, `VCard`, `VIcon`, `VTextField` are already in
`requiredVuetifyComponents`).

### FzCpfCnpjField — dynamic CPF/CNPJ input

A single input that auto-detects the document type and validates the check digits
(CPF and both numeric and alphanumeric CNPJ).

- **`src/utils/document.ts`** — pure logic, no Vue dependency (fully unit-tested):
  `normalizeDocument`, `detectDocumentType`, `isValidCpf`, `isValidCnpj`,
  `isValidCpfCnpj`, `formatCpf`, `formatCnpj`, `formatCpfCnpj`.
- **Detection** — `detectDocumentType(value)` returns `'cnpj'` when the value contains
  letters or has more than 11 characters, otherwise `'cpf'`. This drives the mask
  dynamically: 11 characters → CPF mask, 14 characters (or any letter) → CNPJ mask.
- **Canonical `v-model`** — always unmasked and uppercase (e.g. `12ABC34501DE35`),
  independent of the mask shown. Mirrors `FzPhoneField`/`FzZipCodeField`.
- **Masking** — `maska` with a function mask that chooses between `###.###.###-##` and
  `**.***.***/****-##`. A custom `*` token (`[a-zA-Z0-9]` + uppercase `transform`)
  allows the alphanumeric CNPJ. The display value is built with a `Mask` instance
  (`eager: true`) so the field and the directive agree on the partially-typed format.
- **Validation** — same contract as `FzEmailField`: `rules`, `required`,
  `requiredMessage`, `invalidMessage`, `validateOnBlur`, and an `isValid` event.
  Custom rules run after the built-in document rule.

### CNPJ alfanumérico — check digit algorithm

Source: *Manual de Cálculo do DV do CNPJ* (Receita Federal). Applies to new
registrations from July 2026; existing numeric CNPJs remain valid. The same algorithm
covers numeric and alphanumeric CNPJs:

1. Value of each character = `charCodeAt - 48` (`0-9` → 0–9, `A-Z` → 17–42).
2. First DV weights `5,4,3,2,9,8,7,6,5,4,3,2`; second DV weights
   `6,5,4,3,2,9,8,7,6,5,4,3,2` (second includes the first DV).
3. `dv = remainder < 2 ? 0 : 11 - remainder` where `remainder = sum % 11`.
4. The two DVs are always numeric; all-zero bases are rejected.

Reference vectors (covered in `document.spec.ts`): `12ABC34501DE35` (official
example), `11222333000181` and `18781203000128` (classic numeric).

### FzChipsSelect — multi-select with chips

`FzChipsSelect` wraps `VAutocomplete` (Vuetify) to build a multi-select that turns
options into removable chips, with a filtered menu and no selection checkbox.

- **Base**: `v-autocomplete` with `multiple`, `chips`, `closable-chips` and
  `clear-on-select` (the typed search is cleared after each pick so another can be
  added immediately).
- **No checkbox**: `hideSelected` (default `true`). Vuetify only renders the item
  checkbox for `multiple && !hideSelected`, so hiding the already-selected options
  also removes the checkmark — the user clicks a plain row to add.
- **Chips + overflow**: a custom `#chip` slot renders each chip; beyond
  `maxVisibleChips` the remainder collapses into a single non-closable `+N` chip.
- **Validation**: `rules`, `required`/`requiredMessage`, `validateOnBlur` and an
  `isValid` event, following the other inputs. `variant`/`density` resolve through
  `FzConfigProvider`.
- **Chip spacing**: Vuetify's non-outlined variants render `.v-field__input` with
  `padding-bottom: 0`, and each chip (26px) is taller than its selection wrapper (24px),
  so chips end up ~1px from the field line. A `fz-chips-select--padded` class (applied
  for every variant except `outlined`) adds 4px to the input's bottom padding via
  `:deep()`, yielding a visible ~3px gap. `outlined` already has 12px bottom padding and
  is left untouched. Measured with Playwright; the field height does not change.
- **Vuetify registration**: `requiredVuetifyComponents` gained `VAutocomplete` and
  `VChip` so consumers using the curated list still get this component.

### FzPasswordField — password input with visibility toggle

A password field that encapsulates the show/hide toggle and the usual validation.

- **Toggle**: `type` switches between `password` and `text`; the icon in
  `append-inner` toggles `isVisible`. The value is never touched by the toggle (no
  `update:modelValue` emitted).
- **Icons**: a custom `#append-inner` slot renders a `v-icon` (defaults `mdi-eye-outline`
  hidden / `mdi-eye-off-outline` visible, overridable via `showIcon`/`hideIcon`). The slot
  is used instead of the `append-inner-icon` prop because it allows controlling the
  element's `tabindex`.
- **Not in the tab order by default**: the toggle has `tabindex="-1"` and `aria-hidden`,
  so Tab moves straight to the next field (e.g. confirm password). Set `toggleFocusable`
  to include it in the tab order — then it gets `role="button"`, an `aria-label`
  (`showLabel`/`hideLabel`) and Enter/Space handling.
- **Validation**: `rules`, `required`/`requiredMessage`, `minlength`/`minlengthMessage`,
  `validateOnBlur` and an `isValid` event, following the other inputs. `variant`/`density`
  resolve through `FzConfigProvider`.
- **Extra props**: `maxlength` and `autocomplete` (default `current-password`).

### FzFullAddress — per-field validation and grid

`FzFullAddress` exposes per-field `rules` (`AddressRules`) and `maxlength`
(`AddressMaxLengths`, with pt-BR defaults: CEP 9, logradouro 200, número 20,
complemento 100, bairro 100, cidade 100, estado 2), plus `counter`, `required` and
`requiredMessage`. When `required` is set, a required rule is added to every field
except complemento. The layout is a responsive `v-row`/`v-col` grid
(`sm` breakpoints), stacking on mobile.

### FzDatePicker — calendar placement

`FzDatePickerCalendar` anchors its `v-menu` with `location="top right"` and
`origin="auto"` by default, so the calendar opens above the field with its **right edge
aligned to the calendar icon**, growing leftwards. Both values come from `FzDatePicker`'s
`menuLocation`/`menuOrigin` props (forwarded by `FzDateRangeField`).

Vuetify 3 does keep the `origin` prop (part of `VOverlay`'s location-strategy props,
default `auto`). With `origin="auto"`, the content's origin is `flipSide(location)`:
`top right` → content bottom-right at the activator's top-right, keeping the icon and the
menu's right edge on the same vertical line. A consumer-provided `menuLocation` is
respected and `menuOrigin` defaults to `auto` (Vuetify's standard behavior).

## CSS — Vuetify utilities first

Prefer Vuetify utility classes over custom CSS. Only write scoped CSS for what Vuetify cannot do (position: fixed, Vue transition names, etc.).

```vue
<!-- CORRECT: Vuetify classes for flex, spacing, typography -->
<div class="d-flex align-center ga-2 pa-4">
  <span class="text-body-1 font-weight-medium">Salvo</span>
</div>

<!-- AVOID: custom CSS when Vuetify covers it -->
<style scoped>
.message {
  display: flex;         /* → d-flex */
  align-items: center;   /* → align-center */
  gap: 8px;              /* → ga-2 */
  padding: 16px;         /* → pa-4 */
}
</style>
```

Common Vuetify utilities reference:

| Property | Vuetify utility |
|----------|----------------|
| `display: flex` | `d-flex` / `d-inline-flex` |
| `flex-direction: column` | `flex-column` |
| `align-items: center/start/end` | `align-center` / `align-start` / `align-end` |
| `justify-content: center` | `justify-center` |
| `gap: 4/8/12/16px` | `ga-1` / `ga-2` / `ga-3` / `ga-4` |
| `padding: 16px` | `pa-4` (p-1 to p-12 for 4px-48px) |
| `margin-top: 8px` | `mt-2` |
| `color: white / primary` | `text-white` / `text-primary` |
| `font-size: 1rem / 1.25rem` | `text-body-1` / `text-h6` |
| `font-weight: 500 / 700` | `font-weight-medium` / `font-weight-bold` |
| `text-align: center` | `text-center` |

## Imports — `@` alias

Always use the `@` alias instead of deep relative paths. The `@` maps to `src/` (configured in `tsconfig.json`, `vite.config.ts`, and `vitest.config.ts`).

```ts
// CORRECT
import type { TextFieldVariant } from '@/utils/types';
import { createComponent } from '@/testutils';

// WRONG — deep relative
import type { TextFieldVariant } from '../../utils/types';
import { createComponent } from '../../../tests/testutils';
```

Exception: same-directory imports can stay relative (`./FzZipCodeField.vue`).

Test utilities live in `src/testutils.ts` (not exported from barrel — test-only).

## Tests

- **Location**: `__tests__/` next to the file under test
- **Coverage**: 100% required (statements, branch, functions, lines). Run `pnpm test -- --coverage` before commit.
- **Scope**: Pure logic, events, UI states, edge cases
- **Avoid**: Vue/Vuetify internals, html(), snapshots, private methods
- **exists()** for `v-if`, **isVisible()** for `v-show`

```
src/composables/useLoading.ts           → __tests__/useLoading.spec.ts
src/components/inputs/FzZipCodeField.vue  → __tests__/FzZipCodeField.spec.ts
```

## Language conventions

- **Code**: english (variables, functions, types, tests, comments, docs, commits)
- **UI labels**: pt-BR fallback defaults. Consumer overrides via props.
- **Chat/AI interaction**: pt-BR (this is a team preference)
- **No i18n**, no vue-i18n dependency

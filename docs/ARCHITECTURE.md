# Architecture

## Folder structure

```
docs/
  specs/           ─ Component specs written before implementation
    FzDatePicker.md
src/
  components/       ─ Reusable Vue components
    buttons/        ─ Icon-only button with tooltip (FzIconToolTip)
    inputs/         ─ Form inputs (FzZipCodeField, FzEmailField, FzMoneyField, etc.)
      datepicker/   ─ FzDatePicker family (public component + internal calendar shell/views)
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
3. Hardcoded fallback in the component (`'underlined'`)

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

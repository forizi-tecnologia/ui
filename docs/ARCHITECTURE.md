# Architecture

## Folder structure

```
src/
  components/       ─ Reusable Vue components
    buttons/        ─ Icon-only button with tooltip (FzIconToolTip)
    inputs/         ─ Form inputs (FzZipCodeField, FzEmailField, FzMoneyField, etc.)
    layout/         ─ App shell components (FzLoadingOverlay)
    modals/         ─ Modal dialogs (FzModalBase)
    messages/       ─ Notification/confirm (FzFloatingNotify, FzConfirmDialog, FzCustomConfirmDialog)
    index.ts        ─ Barrel — exports every component

  composables/      ─ Vue composables
    useBreakpoint   ─ Responsive breakpoints
    useGlobals      ─ Access $notify/$loading/$confirm from setup
    useLoading      ─ Reactive loading state (isActive, message, show, hide)

  utils/            ─ Pure utility functions, no Vue dependency
    notify.ts       ─ Global notification singleton
    loading.ts      ─ Global loading singleton (wraps useLoading)
    confirm.ts      ─ Global confirm dialog singleton
    api.ts          ─ Axios wrapper
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

### Global utilities

- `notify.show()`, `loading.show()`, `confirm()` are singletons
- Available via `$notify`, `$loading`, `$confirm` in templates
- Or via `useGlobals()` composable in script setup
- Internally use composables, not component refs

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

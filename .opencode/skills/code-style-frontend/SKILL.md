---
name: code-style-frontend
description: Code style rules and examples for Vue 3 + TypeScript + Vuetify 3 in the BaseLib library. Use when creating or editing any file in src/.
---

# Code Style Frontend — BaseLib

Code rules for Vue 3 + TypeScript. Public library. No exceptions.

## Forbidden

- NEVER `.then().catch()` — always async/await
- NEVER logic in template — computed/methods only
- NEVER `var` — always const/let
- NEVER unnecessary `any` — type everything
- NEVER `!important` in CSS — use Vuetify variables
- NEVER hardcode colors — use `useTheme()` from Vuetify
- NEVER `console.log` in delivered code
- Booleans ALWAYS with is/has/can prefix: `isValid`, `hasError`, `canSave`
- Single quotes (`'`) always, never double quotes (`"`)
- Semicolons (`;`) required at the end of every statement
- Blank line before and after `if`/`for`/`while` blocks
- NEVER domain-specific business logic — generic library
- NEVER export without testing first

## Conditionals

Priority: Early Return > Ternary > If/Else
FORBIDDEN: switch/case, nested if/else

```ts
// CORRECT: Early return
function validate(v: string): boolean {
  if (!v) return false
  if (v.length < 3) return false
  return true
}

// CORRECT: Ternary (2 simple paths)
const label = computed(() => active.value ? 'Active' : 'Inactive')

// WRONG: Nested if/else
if (a) {
  if (b) { /* ... */ }
}
```

## One-line if (no braces)

```ts
// CORRECT: One line, no braces
if (!el) return
if (!el.value) throw new Error('Element not found')

// CORRECT: Multiple early returns
if (!id) return
if (!name) return

// WRONG: Unnecessary braces
if (!el) {
  return
}
```

## Async

Loading resets in `finally`. Never in try or catch.

```ts
async function load(): Promise<void> {
  loading.value = true
  try {
    data.value = await fetchData()
  } catch {
    // handle error
  } finally {
    loading.value = false
  }
}
```

## Template

Zero logic. Conditionals and class bindings → computed. Boolean props without value: `<v-btn disabled />`.

```vue
<!-- WRONG -->
<v-btn v-if="items.length > 0 && !loading">Save</v-btn>

<!-- CORRECT -->
<v-btn v-if="canProceed" :disabled="submitting">Save</v-btn>
```

```ts
const canProceed = computed(() => items.value.length > 0 && !loading.value)
```

## Components — props

Vue 3 Composition API. `defineProps` with interface, `withDefaults` for default values.

```vue
<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
  variant?: 'outlined' | 'filled' | 'underlined'
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
  variant: 'outlined',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// local modelValue synced with computed get/set
const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
```

## Components — structure

```
PascalCase: <ModalBase /> never <modal-base />
Max 250 lines (library may need more than an app)
Template repeated 2x+ = extract to component
Zero comments. Self-documenting names.
```

## Order in script setup

```ts
// 1. imports (vue → vuetify → internal lib → types)
// 2. interface/type definitions used by the component
// 3. defineProps / defineEmits / defineSlots
// 4. composables (useTheme, useDisplay, etc.)
// 5. refs
// 6. computed
// 7. methods/functions
// 8. watch / watchEffect
// 9. lifecycle (onMounted, onUnmounted...)
```

## TypeScript

```ts
// Type everything. No any.
const items = ref<string[]>([])
async function process(input: string): Promise<Result> {}

// Exportable interfaces for library consumers
export interface ModalAction {
  text: string
  icon?: string
  color?: string
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  handler?: () => void | Promise<void>
}
```

## File naming

```
Component:      ModalBase.vue, MoneyField.vue, IconToolTip.vue
Composable:     useBreakpoint.ts, useLoading.ts
Store (Pinia):  theme.ts, notify.ts
Utility:        api.ts, vuetify-check.ts
Type:           types.ts (reusable), FzDefaults.ts (domain-specific)
Constant:       index.ts (injection keys, shared symbols)
Barrel:         index.ts
```

### Directory conventions

- **`src/types/`** — Domain-specific interfaces consumed by multiple modules (e.g., `FzDefaults`). Reusable cross-cutting types stay in `src/utils/types.ts`.
- **`src/constants/`** — Injection keys (`InjectionKey<T>`), shared symbols. Always use `Symbol()` for uniqueness.
- **`src/components/`** — Flat for single-file components like `FzConfigProvider.vue`. Subdirectories for component families (`inputs/`, `modals/`, etc.).

## Layers and separation

Since this is a LIBRARY, there are no rigid application layers. But follow:

```
Component → internal logic (composable/handler)
Composable → Vue API (ref, computed, watch) + Vuetify composables
Store     → reusable global state (Pinia setup stores)
Utility   → pure functions, no Vue dependency
```

Single Responsibility (SRP):
- Component = rendering + UI events
- Composable = reusable reactive logic
- Store = shareable global state
- Utility = pure functions (formatting, validation)

### Provide/Inject for library defaults

When a value must flow to many descendant components without prop drilling, use `provide`/`inject`:

```ts
// src/constants/index.ts
export const FZ_DEFAULTS_KEY: InjectionKey<FzDefaults> = Symbol('fz-defaults');

// Provider component — provides defaults into the component tree
// src/components/FzConfigProvider.vue
provide(FZ_DEFAULTS_KEY, props.defaults);

// Consumer composable — every Fz* component calls this to resolve defaults
// src/composables/useFzDefaults.ts
export function useFzDefaults(): FzDefaults {
  return inject(FZ_DEFAULTS_KEY, {});
}

// Usage in component — props override provider, provider overrides fallback
const defaults = useFzDefaults();
const resolvedVariant = computed(() => props.variant ?? defaults.variant ?? 'underlined');
```

Rules for provide/inject:
- Always use `InjectionKey<T>` (not plain strings) for type safety
- The key constant lives in `src/constants/`
- The provider is a component (renders `<slot />`)
- The consumer is a composable (`use*`)
- Fallback value in the `inject()` call ensures components work without the provider

## Pinia — Composition API style

```ts
export const useThemeStore = defineStore('theme', () => {
  const dark = ref(false)

  function toggle() {
    dark.value = !dark.value
  }

  return { dark, toggle }
})
```

## Vuetify — use utility classes, not custom CSS

Prefer Vuetify utility classes over writing custom CSS. Only write scoped CSS when Vuetify has no utility for the property.

| Property | Vuetify utility | Avoid |
|----------|----------------|-------|
| `display: flex` | `d-flex` | — |
| `flex-direction: column` | `flex-column` | — |
| `align-items: center` | `align-center` | — |
| `justify-content: center` | `justify-center` | — |
| `padding: 16px` | `pa-4` | — |
| `padding-top: 8px` | `pt-2` | — |
| `margin-top: 12px` | `mt-3` | — |
| `gap: 16px` | `ga-4` | — |
| `color: white` | `text-white` | — |
| `font-size: 1rem` | `text-body-1` | — |
| `font-weight: 500` | `font-weight-medium` | — |
| `text-align: center` | `text-center` | — |

```vue
<!-- CORRECT: Vuetify utilities -->
<div class="d-flex align-center ga-2 pa-4">
  <v-icon>mdi-check</v-icon>
  <span class="text-body-1 font-weight-medium">Salvo</span>
</div>

<!-- WRONG: custom CSS for something Vuetify covers -->
<div class="saved-message">   // then  .saved-message { display: flex; align-items: center; gap: 8px; padding: 16px; }
  <v-icon>mdi-check</v-icon>
  <span>Salvo</span>
</div>
```

Scoped CSS only when Vuetify does not cover it. Never `!important`.
Use `:deep()` to style slots/inside Vuetify components.
Vuetify is a peerDependency — never import as a direct dependency.

## CSS (only for what Vuetify cannot do)

```vue
<style scoped>
/* CORRECT: position fixed + full-screen has no Vuetify utility */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
}

/* CORRECT: Vue transition class names are required */
.fade-enter-active {
  transition: opacity 0.2s ease;
}

/* CORRECT: use :deep() for Vuetify internal elements */
:deep(.v-field__input) {
  text-align: right;
}
</style>

<!-- WRONG: !important -->
<style>
.my-class {
  color: red !important;
}
</style>
```

## Exports — barrel files

Every component/composable/utility must be exported via a barrel file (`index.ts`).

```ts
// src/components/index.ts
export { default as IconToolTip } from './buttons/IconToolTip.vue'
export { default as ModalBase } from './modals/ModalBase.vue'
export { default as MoneyField } from './inputs/MoneyField.vue'
export type { ModalAction } from './modals/ModalBase.vue'

// src/composables/index.ts
export { useBreakpoint } from './useBreakpoint'
export { useGlobals } from './useGlobals'
```

## Tests

Every new component/composable must have a unit test.

Prefer `it.each` when testing the same behavior with different inputs:

```ts
const VALIDATION_CASES = [
  { value: '', expected: 'Required' },
  { value: 'invalid', expected: 'Invalid format' },
  { value: 'test@example.com', expected: true },
] as const;

it.each(VALIDATION_CASES)('returns "$expected" for "$value"', ({ value, expected }) => {
  const result = validate(value);
  expect(result).toBe(expected);
});
```

## Build and distribution

- Build: `pnpm build`
- Format: ES modules only (`"type": "module"`)
- Peer dependencies NEVER in the bundle — configured as external in vite.config.ts
- CSS included separately: `@forizi/ui/style.css`

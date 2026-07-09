# Cognitive System — Design Decisions

## What was removed and why

| Removed | Why |
|---------|-----|
| `vue-i18n` (peer dep) | Every label already overridable via props. Dead weight for consumers. |
| `src/locales/` (en-US, pt-BR) | Labels hardcoded in pt-BR. No need for translation files in a component lib. |
| `useLocale` composable | No i18n → no locale switching needed. |
| `LanguageSelector` component | No i18n → no language picker needed. |
| `ThemeToggle` component | Opinionated UI. Consumers can toggle with `vuetify.theme.global.name.value = 'dark'`. |
| `useThemeSync` composable | Vuetify handles theme natively. Custom sync was redundant. |
| `ThemeConfig` interface + theme.json | Domain-specific (app name, logo, favicon, copyright). Not a lib concern. |
| `LoadingComponentRef` type | Replaced by `useLoading()` composable — no more template ref + Pinia store hack. |
| `defineExpose({ show, hide })` in LoadingOverlay | Replaced by `:is-loading` prop (Props down, Events up). |
| `CepField` (renamed to `FzZipCodeField`) | Renamed for english naming consistency. Refactored: `any` → typed rules, `searching` → `isSearching`, `!!hint` → `hasHint` computed, if/else → early return, added AbortController, exported interface with english field names. |
| All components prefixed with `Fz` (Forizi) | Components renamed to Fz prefix: `EmailField` → `FzEmailField`, `ModalBase` → `FzModalBase`, etc. Creates brand identity, avoids global collisions. |
| Testes colados em `__tests__/` | Padrão da indústria pra component libraries. Testes ficam junto do arquivo que testam, não em pasta raiz. Primeiro teste: `useLoading` (lógica pura). |
| `PrimaryButton`, `SecondaryButton`, `TertiaryButton`, `QuartenaryButton` | 68 lines of prop-forwarding boilerplate. Consumers use `<v-btn>` directly. |
| `BaseButton` | Thin wrapper around `<v-btn>` adding only `class="text-none"`. Not enough value to justify being in the library. Consumers configure text-transform globally or per-btn. |
| `api.ts` auth/loading/notify | Application-layer concerns (auth token, redirect, loading spinner, error toasts) removed. `api.ts` is now a bare axios factory. |
| `maska` as `dependency` | Moved to `peerDependencies`. It is external in the build (not bundled), so it must be provided by the consumer. |
| `EmailField.persistentHint` | Declared but never used in template or logic. Dead code removed. |
| Duplicated `handleKeydown` in MoneyField/NumberField | Extracted to `createNumericKeydownHandler()` in `useNumericInput.ts`. Each component now provides only a `computeFromDigits` callback. |
| `vue-router`, `vite-plugin-dts` in devDependencies | Unused dependencies removed. |
| `vitest.config.ts` separate file | Merged into `vite.config.ts` with conditional Vuetify auto-import (VITEST env check). |
| `testutils.ts` shipped in dist | Excluded from build via rollup external. |
| Root `README.md` outdated | Rewritten with correct components, setup, labels in pt-BR, and sub-entry imports. |
| `plugins/index.ts` double export | Simplified to single named `globalsPlugin` export. |
| Missing `sideEffects` in package.json | Added `"sideEffects": ["**/*.css"]` for tree-shaking. |

### 8. defineExpose still valid for Promise-based dialogs

`ConfirmDialog` / `CustomConfirmDialog` use `defineExpose` because the confirm flow is inherently imperative:
1. Consumer calls `confirmDialog(title, message, options)`
2. Returns `Promise<boolean>`
3. Promise resolves when user clicks a button

This is the standard for confirm/prompt dialogs in Vue ecosystem. The method is named in camelCase (`confirmDialog`) and the component ref type is `ConfirmComponentRef`.

### 9. CustomConfirmDialog uses Vuetify `v-card` internally

Refactored from a fully custom HTML/CSS dialog to use Vuetify's `v-card`, `v-card-title`, `v-card-text`, `v-card-actions`. This eliminates ~120 lines of custom CSS (padding, typography, shadows, flexbox) in favor of Vuetify utility classes.

CSS that remains: overlay positioning (`position: fixed` + inset) and Vue transition classes. These have no Vuetify equivalent.

### 10. confirm.ts refactored to Composition API (Pinia)

`useConfirmStore` was migrated from Options API (`defineStore` with `state`/`actions` object) to Composition API style (`defineStore` with setup function), matching the project convention.

### 11. Exposed method renamed: `ConfirmDialog` → `confirmDialog`

The `defineExpose` method on both `CustomConfirmDialog` and `ConfirmDialog` was renamed from PascalCase `ConfirmDialog` to camelCase `confirmDialog` to follow JavaScript naming conventions for functions. The `ConfirmComponentRef` interface in `types.ts` was updated accordingly.

### 12. `api.ts` stripped to bare axios instance

`api.ts` was refactored from an opinionated HTTP client (auth token from localStorage, loading overlay on mutations, error notifications, `/login` redirect) to a minimal axios factory. The removed features are application-layer concerns — a component library should not dictate auth strategy, notification UX, or loading behavior. Consumers now configure their own interceptors per-project.

Removed from `ApiConfig`:
- `showLoadingOnMutations` — loading state is a UI concern
- `showErrorNotifications` — error handling belongs to the app
- `authTokenKey` — auth strategy is project-specific
- `onUnauthorized` — redirect/routing is app-level

The `env.d.ts` `VITE_API_BASE_URL` reference was removed alongside the coupling.

### 13. `maska` moved to `peerDependencies`

`maska` was listed as a direct `dependency` but marked `external` in rollup (not bundled). It is now a `peerDependency`, consistent with Vue, Vuetify, Pinia, and axios. Consumers must install `maska` themselves.

### 14. `EmailField.persistentHint` removed (dead prop)

The prop was declared in the interface and `withDefaults` but never referenced in the template or logic. Removed to eliminate dead code that pollutes the public API.

### 15. `CustomConfirmDialog` exported from barrel

Previously only `ConfirmDialog` was exported. `CustomConfirmDialog` is now exported as well, allowing consumers to use it directly without the wrapper.

### 16. `createNumericKeydownHandler` extracted to `useNumericInput`

`MoneyField` and `NumberField` duplicated ~40 lines of `handleKeydown` each with nearly identical logic (navigation keys, Backspace, digit append, sign toggle). The common pattern was extracted into `createNumericKeydownHandler()` in `src/composables/useNumericInput.ts`. Both components now share the handler and provide only the domain-specific `computeFromDigits` callback.

### 17. `package.json` tuned for npm publication

Added `"sideEffects": ["**/*.css"]` for optimal tree-shaking — bundlers can safely eliminate unused JS chunks while preserving CSS imports. Removed unused `devDependencies` (`vue-router`, `vite-plugin-dts`). Consolidated vitest config into `vite.config.ts` with conditional `vuetify({ autoImport: true })` — active only in test mode (`process.env.VITEST`), excluded from library build. The `plugins/index.ts` was simplified to a single named export, removing the ambiguous default export.

### 18. `testutils.ts` excluded from build

`src/testutils.ts` was generating `dist/testutils.d.ts` in the output. Added `/testutils/` to `rollupOptions.external` so it is excluded from library builds. This utility is for internal tests only and should not ship to consumers.

### 19. FzConfigProvider — provide/inject for global defaults

All `Fz*` input components had `variant` hardcoded to `'underlined'`. Projects wanting `'outlined'` would repeat the prop on every instance. The solution uses Vue's `provide`/`inject`:

- **`FzConfigProvider`** — wrapper component that `provide()`s defaults into the component tree
- **`useFzDefaults()`** — composable that `inject()`s and returns the provided defaults
- **`FzDefaults`** — interface (`variant`, extensible for density/color/etc.)
- **`FZ_DEFAULTS_KEY`** — `InjectionKey` symbol in `src/constants/`

Why not Vuetify's `defaults`? Vuetify's `createVuetify({ defaults: { VTextField: {...} } })` targets Vuetify internals (`VTextField`, `VSelect`). Our components are abstractions on top — `FzPhoneField`, `FzEmailField`, etc. The provider pattern applies at our library level, parallel to Vuetify's.

Why one-level (no per-component nesting)? Simple, sufficient for 90% of use cases. Expandable — the `FzDefaults` interface can grow with component-specific keys when needed.

Why `src/types/` and `src/constants/` directories? Previously all types lived in `src/utils/types.ts`. As the library grows, domain-specific types (`FzDefaults`) and injection keys (`FZ_DEFAULTS_KEY`) deserve their own modules. `src/types/` holds library interfaces, `src/constants/` holds injection keys and shared symbols.

### 20. Keyboard shortcuts opt-in for ConfirmDialog and ModalBase

Enter triggers the primary action, Escape triggers cancel — both controllable via props and disabled by default for safety.

Why opt-in: keyboard shortcuts are ergonomic but dangerous for destructive operations. `enterToConfirm` defaults to `false`; Escape only works when `persistent` is `false` (it defaults to `true`). Both dialogs follow the same contract: the consumer explicitly opts into shortcuts per invocation.

### 21. Root `README.md` rewritten for npm

The root `README.md` was completely rewritten to reflect the current state of the library:
- Added FzConfigProvider section with usage examples and resolution priority
- Removed references to deleted components (`PrimaryButton`, `ThemeToggle`, `LanguageSelector`, `CepField`)
- Removed `vue-i18n` from setup instructions
- Added correct setup with `FzConfirmDialog`, `FzFloatingNotify`, `FzLoadingOverlay` in `App.vue`
- Documented all sub-entry imports (`@forizi/ui/components`, `./composables`, `./utils`, `./plugins`)
- Added API section
- Labels in pt-BR in examples (consistent with code style)

### 22. FzDatePicker — custom calendar instead of Vuetify's `v-date-picker`

The requirements (fixed-size dropdown across three drill-down views, iOS-style scrollable
year list, specific header/navigation behavior) do not match Vuetify's built-in date
picker, and reshaping its internal CSS would fight the component more than build a small
one from scratch. The custom implementation only uses components already present in
`requiredVuetifyComponents` (`VMenu`, `VCard`, `VBtn`, `VIcon`, `VTextField`) — no new
Vuetify component was added to the curated list.

### 23. FzDatePicker — no date library dependency

All date logic (`src/utils/date.ts`) is implemented with the native `Date` object and
plain arithmetic — no `date-fns`/`dayjs`/`luxon`. The domain is small and fixed (parse,
format, validate, build a month matrix, leap years) and does not justify a new peer
dependency. This also keeps the pure functions trivially unit-testable.

### 24. FzDatePicker — v-model is always canonical ISO, independent of display format

`format` (`dd/mm/yyyy` or `yyyy-mm-dd`) only controls the text field's mask and displayed
value. `v-model` always emits/receives `yyyy-mm-dd`, so consumers get a backend-friendly
value regardless of what the user sees. `locale` is a separate prop (`pt-BR` | `en`) for
month/weekday labels, decoupled from `format`, mirroring how `FzMoneyField` keeps
`currency` and `locale` independent.

### 25. FzDatePicker — dropdown (`v-menu`), not a modal (`v-dialog`)

The calendar opens as a `v-menu` anchored to the calendar icon inside the field's
`append-inner`, not a centered `v-dialog`. This reads as part of the field rather than an
interruption, and lets the field remain directly typeable while the icon opens the
picker. The dropdown keeps one fixed `width`/`height` (default `400x400`) across all
three views — the content area needs `flex: 1 1 0; min-height: 0` or the years list (200+
buttons) stretches its flex container instead of scrolling inside a fixed box.

### 26. FzDatePicker — deferred props: `minYear`/`maxYear`, `weekStartsOn`

The year list bounds derive from `min`/`max` (defaulting to 1900–2100) instead of adding
separate `minYear`/`maxYear` props — one pair of bounds for both validation and the
calendar, avoiding prop duplication. The week always starts on Sunday for both locales; a
`weekStartsOn` prop was deferred until a concrete need appears (YAGNI).

### 27. FzDatePicker tests — jsdom/Vuetify overlay quirks

Testing the `v-menu`-based calendar surfaced three reusable gotchas for any future
Vuetify overlay (`v-menu`/`v-dialog`) test:
- jsdom lacks `visualViewport` and `ResizeObserver`, both required by Vuetify's overlay
  positioning. Stub both via `vi.stubGlobal` in `beforeAll`.
- `v-menu` teleports its content out of the wrapper's DOM subtree, so `wrapper.text()`
  returns `''` for menu content — read `document.body.textContent` instead.
  `findComponent`/`findAllComponents` still work across the teleport boundary because
  Vue Test Utils walks the component tree, not the DOM.
- `mdi-*` icons render as a CSS class on an inner `<i>`, not as text content — even
  `<v-icon>mdi-foo</v-icon>` yields `icon.text() === ''`. Assert via
  `icon.classes()`/`classList.contains(...)`, matching the existing pattern used for
  `FzModalBase`'s `titleIcon`.

## Key decisions

### 1. Code in english, UI labels in pt-BR

Code, types, tests, docs, and commits are all in english. Only UI labels/messages (shown to end users) are hardcoded in pt-BR as fallback defaults — every component accepts props to override them. i18n was removed entirely since consumers control labels via props.

### 2. Composables over defineExpose

LoadingOverlay used to expose `show()`/`hide()` via `defineExpose`, and a Pinia store held a template ref to call them. This was an imperative anti-pattern. Now:
- `useLoading()` composable creates reactive state
- LoadingOverlay receives state via `:is-loading` prop
- Global `loading` utility is a singleton of the composable

Same pattern applies to notify and confirm.

### 3. Vuetify handles themes — no theme store

Custom theme management (loading /theme.json, syncing colors, swapping favicons, dispatching custom events, Pinia store with localStorage persistence) was fighting Vuetify's built-in theme system. Theme state was removed entirely — consumers toggle directly via `vuetify.theme.global.name.value = 'dark'` and persist to localStorage themselves if needed.

### 4. No button wrappers — use `v-btn` directly

Every major Vue library ships a single button with props. Wrapping `v-btn` just to preset `color` + `variant` adds zero value. Even `BaseButton` added only `class="text-none"` — not enough to justify a component in the library.

Consumers use `v-btn` directly, configuring text-transform globally if needed:

```vue
<v-btn color="primary" variant="elevated">Save</v-btn>
<v-btn color="secondary" variant="outlined">Cancel</v-btn>
```

`IconToolTip` is kept because it solves a real ergonomic problem — wrapping Vuetify's `v-tooltip > v-btn` nesting pattern. That's actual value.

### 5. One-liner if without braces

```ts
// CORRECT
if (!loading) return;
if (!el.value) throw new Error('not found');

// WRONG — unnecessary braces
if (!loading) {
  return;
}
```

Only use braces when the `if` body has multiple statements.

### 5. Early return, never if/else

```ts
// CORRECT
watch(() => props.isLoading, (val) => {
  if (val) {
    startTimer();
    return;
  }
  stopTimer();
});

// WRONG
watch(() => props.isLoading, (val) => {
  if (val) {
    startTimer();
  } else {
    stopTimer();
  }
});
```

### 6. dist/ is gitignored

Build artifacts are not committed. `prepublishOnly` builds fresh on `npm publish`.

### 7. 100% coverage — no exceptions

All `src/` files must reach 100% coverage (statements, branch, functions, lines). If a branch is unreachable, remove it — code morto não deve existir.

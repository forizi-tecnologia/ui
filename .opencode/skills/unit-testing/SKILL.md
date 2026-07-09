---
name: unit-testing
description: Unit testing standards for BaseLib. Use before writing or reviewing tests.
---

# Unit Testing — BaseLib

## Philosophy

Test **behavior**, not implementation. A test should only break when public behavior changes, not when you refactor internal code.

Treat the component/composable as a **black box**: provide input (props, events, arguments) and verify output (render, emitted events, return values).

## What to test (priority)

1. **Pure logic** — utility functions, composables (ref, computed). Most valuable, simplest.
2. **Validation rules** — invalid email returns message, empty field + required = error.
3. **Emitted events** — button click emits `click`, zip code found emits `zip-code-found`.
4. **UI states** — loading shows spinner, empty shows placeholder, error shows message.
5. **Edge cases** — null value, empty string, API error response.

## What NOT to test

- ❌ Vue internals (reactivity, lifecycle, Virtual DOM)
- ❌ Vuetify internals (whether `v-btn` renders correctly)
- ❌ Internal implementation (don't test private methods, test public behavior)
- ❌ `wrapper.html()` — brittle, breaks on any markup change
- ❌ `wrapper.exists()` — pointless, if component fails to mount all other tests would fail
- ❌ Snapshot tests — false positives, nobody reviews the diff

## Test utilities

Use `tests/testutils.ts` which provides `createComponent` with Vuetify pre-configured:

```ts
import { createComponent } from '../../../tests/testutils';

// Default wrapper — extensible via options override
let wrapper = createComponent(MyComponent, {
  props: { /* overrides */ },
  slots: { /* overrides */ },
});
```

## beforeEach / afterEach pattern (MANDATORY)

**Always** create the wrapper in `beforeEach` and destroy in `afterEach`. Never create the wrapper inside an `it` block unless using `it.each` with varying configs that cannot be applied via `wrapper.setProps()`.

```ts
let wrapper: ReturnType<typeof createComponent>;

beforeEach(() => {
  wrapper = createComponent(MyComponent);
});

afterEach(() => {
  wrapper.unmount();
});
```

Use `wrapper.setProps()` inside individual tests when a different initial state is needed.

## Naming

```
File:       ComponentName.spec.ts    (never .test.ts)
Describe:   Component or composable name
It:         should [action] when [condition]
```

```ts
describe('MoneyField', () => {
  it('should format 0 as "R$ 0,00" when modelValue is 0', () => { ... });
  it('should parse "123456" to 1234.56 on user input', () => { ... });
  it('should not clear the message when hide is called', () => { ... });
});
```

## it.each for repeated logic

When 2+ test cases validate the same behavior with different inputs, use `it.each`:

```ts
const FORMAT_CASES = [
  { value: 0, expected: 'R$ 0,00' },
  { value: 1234.56, expected: 'R$ 1.234,56' },
] as const;

it.each(FORMAT_CASES)('should format $value as "$expected" when modelValue is set', async ({ value, expected }) => {
  await wrapper.setProps({ modelValue: value });

  expect(getInputValue()).toBe(expected);
});
```

## File structure

```
src/
  composables/
    useLoading.ts
    __tests__/
      useLoading.spec.ts
  components/
    inputs/
      ZipCodeField.vue
      __tests__/
        ZipCodeField.spec.ts
```

Tests live in `__tests__/` next to the file they test.

## Testing inject-based composables

Composables that use `inject()` (like `useFzDefaults`) **cannot** be called directly — they require a component setup context. Mount a wrapper component that calls the composable:

```ts
import { mount } from '@vue/test-utils';
import { h, defineComponent } from 'vue';

// WRONG — inject() fails outside setup context
const result = useFzDefaults(); // ❌

// CORRECT — mount a wrapper that uses the composable
const Consumer = defineComponent({
  setup() {
    const defaults = useFzDefaults();

    return () => h('span', { 'data-test': 'result' }, JSON.stringify(defaults));
  },
});

const wrapper = mount(Consumer, {
  global: { plugins: [vuetify] },
});
```

When testing the provider + consumer together, mount the provider with the consumer as a slot:

```ts
const wrapper = mount(FzConfigProvider, {
  props: { defaults: { variant: 'outlined' } },
  slots: { default: () => h(Consumer) },
  global: { plugins: [vuetify] },
});
```

## Multiple components in test files

Test files that define helper components (via `defineComponent`) trigger the `vue/one-component-per-file` eslint rule. Add the disable comment at the top:

```ts
/* eslint-disable vue/one-component-per-file */
import { describe, it, expect } from 'vitest';
```

Only use this in `__tests__/` files. Never in production code.

## Testing `provide`/`inject` with varying configs

When `it.each` needs different `provide` values, each iteration must remount the component — `wrapper.setProps()` does not update `provide`d values (Vue limitation). Use a helper function inside `it.each`:

```ts
function mountWithProvider(defaults: Record<string, unknown>): VueWrapper {
  return mount(FzConfigProvider, {
    props: { defaults },
    slots: { default: () => h(Consumer) },
    global: { plugins: [vuetify] },
  });
}

it.each(CASES)('should resolve variant', ({ provided, expected }) => {
  const wrapper = mountWithProvider(provided);

  expect(wrapper.find('[data-test="variant"]').text()).toBe(expected);
});
```

## exists vs isVisible (Vue Test Utils)

| Method | What it checks | When to use |
|--------|---------------|-------------|
| `exists()` | Element is in the DOM | Conditional elements with `v-if` / `v-show` |
| `isVisible()` | Element is **visible** (no `display: none`, `visibility: hidden`, or `v-show="false"`) | When element exists in DOM but may be hidden |

```ts
// exists: element removed from DOM (v-if)
expect(wrapper.find('[data-test="loading"]').exists()).toBe(false)

// isVisible: element in DOM but invisible (v-show)
expect(wrapper.find('[data-test="content"]').isVisible()).toBe(true)
```

**Rule of thumb:** `v-if` → `exists()`. `v-show` → `isVisible()`.

## Testing Vuetify overlays in jsdom

Vuetify overlays (`v-menu`, `v-dialog`, `v-tooltip`) rely on browser APIs not available in jsdom. Three patterns discovered while testing datepicker/calendar components:

### 1. Stub missing browser APIs (MANDATORY)

jsdom lacks `visualViewport` and `ResizeObserver`, both required by Vuetify's overlay positioning engine. Stub them before tests that mount Vuetify overlay components:

```ts
import { beforeAll } from 'vitest';

beforeAll(() => {
  vi.stubGlobal('visualViewport', { width: 1024, height: 768 });
  vi.stubGlobal('ResizeObserver', vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    trigger: vi.fn(),
  })));
});
```

Place in the top-level `describe` block. Without these stubs, components that render overlays will throw during mount.

### 2. Teleported content: read from `document.body`

`v-menu` and `v-dialog` teleport their overlay content out of the wrapper's DOM subtree into `v-overlay-container`. `wrapper.text()` returns `''` for teleported content. Use `document.body.textContent` for text assertions, or `wrapper.findComponent()` / `wrapper.findAllComponents()` which walk the Vue component tree — not the DOM — and work across the teleport boundary:

```ts
// WRONG — teleported content is not in the wrapper's DOM
expect(wrapper.text()).toContain('January');

// CORRECT — search the real document body
expect(document.body.textContent).toContain('January');

// CORRECT — findComponent walks the Vue tree, DOM position irrelevant
const card = wrapper.findComponent({ name: 'v-card' });
expect(card.exists()).toBe(true);
```

### 3. mdi icon assertions: use `classList`, not `text()`

`<v-icon>mdi-calendar</v-icon>` renders as `<i class="mdi mdi-calendar"></i>`. The icon name is a CSS class, not text content — `icon.text()` returns `''`:

```ts
// WRONG
expect(icon.text()).toBe('mdi-calendar');

// CORRECT
const i = icon.find('i');
expect(i.classes()).toContain('mdi-calendar');
```

This pattern is already used in `FzModalBase` tests for `titleIcon`. Apply consistently to any Vuetify icon assertion.

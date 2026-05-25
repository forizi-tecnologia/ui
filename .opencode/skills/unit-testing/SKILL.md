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

## beforeEach / afterEach pattern

Always create the wrapper in `beforeEach` and destroy in `afterEach`:

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

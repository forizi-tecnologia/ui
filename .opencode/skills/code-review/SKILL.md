---
name: code-review
description: Code review checklist for the BaseLib library. Use after implementing a task or when review is requested.
---

# Code Review — BaseLib

Code review checklist. CRITICAL = blocks delivery | ATTENTION = improvement

## Components

- [ ] PascalCase component name? (CRITICAL)
- [ ] Boolean props without value in template? (ATTENTION)
- [ ] Zero logic in template? (CRITICAL)
- [ ] `withDefaults` for optional props? (CRITICAL)
- [ ] Typed emits with `defineEmits<{...}>()`? (CRITICAL)
- [ ] Generic component (no domain-specific business logic)? (CRITICAL)
- [ ] Max ~250 lines? (ATTENTION)
- [ ] Provide/inject uses `InjectionKey<T>` from `src/constants/`? (ATTENTION)

## TypeScript

- [ ] Everything typed, no `any`? (CRITICAL)
- [ ] Interfaces exported for consumers? (CRITICAL)
- [ ] No `var` — always const/let? (CRITICAL)
- [ ] Domain-specific types in `src/types/`, cross-cutting types in `src/utils/types.ts`? (ATTENTION)
- [ ] Injection keys in `src/constants/` using `Symbol('...')` and `InjectionKey<T>`? (ATTENTION)

## Async / Side Effects

- [ ] No `.then().catch()` — always async/await? (CRITICAL)
- [ ] Loading resets in `finally`? (ATTENTION)
- [ ] Watch with cleanup when needed? (ATTENTION)

## Exports

- [ ] Component registered in barrel file (`index.ts`)? (CRITICAL)
- [ ] Types exported alongside the component? (CRITICAL)
- [ ] Composable exported from `src/composables/index.ts`? (CRITICAL)
- [ ] Types exported from `src/index.ts` entry point? (CRITICAL)
- [ ] Nothing imported from relative path outside the package? (ATTENTION)

## CSS / Vuetify

- [ ] No `!important`? (CRITICAL)
- [ ] :deep() used correctly for Vuetify slots? (ATTENTION)
- [ ] Colors via Vuetify variables, not hardcoded? (ATTENTION)

## Tests

- [ ] Every new component has at least a render test? (CRITICAL)
- [ ] Tests cover main props, events, and slots? (ATTENTION)

## Storybook

- [ ] New component has a `.stories.ts` file? (CRITICAL)
- [ ] `argTypes` include every public prop with `control` and `description`? (ATTENTION)
- [ ] New props added to existing component → corresponding `argTypes` updated? (ATTENTION)
- [ ] Stories cover key use cases (default, disabled, custom, edge case)? (ATTENTION)

## General

- [ ] Code in english? (CRITICAL)
- [ ] Labels/UI in pt-br? (CRITICAL)
- [ ] No comments in code? (ATTENTION)
- [ ] No `console.log` or dead code? (CRITICAL)
- [ ] No implementation beyond what was requested (YAGNI)? (ATTENTION)
- [ ] `pnpm lint` passing? (CRITICAL)
- [ ] `pnpm build` passing? (CRITICAL)
- [ ] `pnpm test` passing? (CRITICAL)
- [ ] Self-documenting names? (ATTENTION)

## SOLID / Clean Code

- [ ] Single Responsibility: component does one thing? (CRITICAL)
- [ ] DRY: no duplicated logic? (CRITICAL)
- [ ] KISS: simple and straightforward implementation? (ATTENTION)
- [ ] Small functions (max 20 lines)? (ATTENTION)
- [ ] Early return instead of nested if/else? (CRITICAL)

# @forizi/ui

Forizi UI — Vue 3 + TypeScript + Vuetify 3 component library.

## Commands

- **Build**: `pnpm build` — generates `dist/` with types and ES modules
- **Dev**: `pnpm dev` — build in watch mode
- **Lint**: `pnpm lint` — eslint with auto fix
- **Check**: `pnpm check` — lint + test (run after every change)
- **Test**: `pnpm test` — vitest run (busca `src/**/*.spec.ts`)
- **Test watch**: `pnpm test:watch` — iterative mode
- **Playground**: `pnpm dev:playground` — visual test environment

## Slash commands (opencode)

- **`/unit-test <nome>`** — Cria um teste unitário para um componente, composable ou utility. Segue automaticamente as skills `unit-testing` e `code-style-frontend`, lê o código fonte, busca testes similares como referência de padrão, cria o arquivo `.spec.ts`, e executa `pnpm test` + `pnpm lint`.
- **`/refactory <nome>`** — Refatora um componente, composable ou utility para seguir o code-style da BaseLib rigidamente. Converte para Composition API (`<script setup>`), async/await, early return, tipos corretos, aspas simples, ponto-e-vírgula, Vuetify utilities no CSS, zero `any`, zero `!important`, nomes auto-documentados (sem comentários), e mais. Executa `pnpm check`, `pnpm build` e `pnpm test` para verificar.
- **`/learn`** — Analisa o `git diff` da sessão e atualiza documentação (ARCHITECTURE.md, COGNITIVE.md, skills) com novos padrões, decisões de design e convenções descobertas. Rode ao final de sessões significativas.
- **`/pipeline`** — Pipeline completo de pré-merge: faz `git diff` contra `main`, verifica cobertura de testes unitários, detecta breaking changes, revisa code-style, corrige problemas encontrados, roda `pnpm check` + `pnpm build`, faz commit/push (SOMENTE neste contexto), e cria merge request no GitHub com descrição em inglês. Carrega automaticamente as skills `unit-testing`, `code-review` e `code-style-frontend`.

## Before making changes

Load the `code-style-frontend` skill — it contains the exact code rules and examples for this project. Follow it strictly.

## Verification after changes

Always run in this order:
0. Load `code-review` skill and run through the checklist
1. `pnpm check` — lint + test, zero warnings, all tests passing
2. `pnpm build` — clean build, no type errors

## Documentation

Before reading source files, check `docs/` for architecture and decisions:
- `docs/ARCHITECTURE.md` — Folder structure, component patterns, data flow
- `docs/COGNITIVE.md` — Design decisions, what was removed and why

### Auto-learning rule

After every significant change (refactor, new component, removed dep), update the docs to reflect the new reality. Keep ARCHITECTURE.md and COGNITIVE.md in sync with the codebase.

## Structure

```
src/
  components/       ← Reusable Vue components
    buttons/        ← Icon-only button with tooltip (FzIconToolTip)
    inputs/         ← Form inputs (FzZipCodeField, FzEmailField, FzMoneyField, etc.)
    layout/         ← App shell components (FzLoadingOverlay)
    modals/         ← Modal dialogs (FzModalBase)
    messages/       ← Notification/confirm (FzFloatingNotify, FzConfirmDialog, FzCustomConfirmDialog)
    FzConfigProvider.vue ← Global defaults via provide/inject
    index.ts        ← Barrel — exports every component

  composables/      ← Vue composables (useBreakpoint, useGlobals, useLoading, useFzDefaults, useNumericInput)

  types/            ← Domain-specific TypeScript interfaces (FzDefaults)

  constants/        ← Injection keys (FZ_DEFAULTS_KEY) and shared symbols

  utils/            ← Pure utility functions, no Vue dependency
    notify.ts       ← Global notify singleton
    loading.ts      ← Global loading singleton
    confirm.ts      ← Global confirm singleton
    api.ts          ← Axios wrapper
    types.ts        ← Cross-cutting shared types and constants
    vuetify-check.ts

  plugins/          ← Vue plugins (globalsPlugin)
  index.ts          ← Main entry point
```

## Stack

- Vue 3.5+ (Composition API, `<script setup>`)
- TypeScript 5.9+ (strict mode)
- Vuetify 3 (peer dependency)
- Pinia 3 (peer dependency, setup stores)
- Vite 7 (build/bundler)
- Vitest 4 (tests)
- ESLint 9 (flat config)

## Conventions

- **Components**: PascalCase with `Fz` prefix (`FzModalBase.vue`, `FzMoneyField.vue`)
- **Composables**: `use` prefix (`useBreakpoint.ts`)
- **Stores**: `use` prefix, composition API style
- **Interfaces**: exported for consumers (`ModalAction`, `Address`)
- **Props**: sensible defaults with `withDefaults`
- **CSS**: Vuetify utilities first, scoped CSS only when necessary (see `docs/ARCHITECTURE.md` for reference table)
- **Peer deps**: Never in bundle — external in `vite.config.ts`
- **Imports**: `@` alias for `src/` — no deep relative paths (`../../utils/types` → `@/utils/types`)
- **Labels**: pt-BR hardcoded, no i18n. Every component accepts props to override.

## Code style (required)

- async/await always — never .then().catch()
- Zero logic in template — computed/methods
- Early return — no `if/else`, always early return instead
- Self-documenting names — zero comments. No abreviações obscuras (`l` → `labels`, `t` → `translate`, `fn` → `format`)
- `const`/`let` — never `var`
- Type everything — never `any`
- Booleans with is/has/can prefix (`isValid`, `hasError`, `canSave`)
- **Code in english** (variables, functions, types, tests, docs) — **only UI labels pt-BR**
- Single quotes (`'`) always, never double quotes (`"`)
- Semicolons (`;`) required at the end of every statement
- Blank line before and after `if`/`for`/`while` blocks
- One-line if without braces when single statement
- Consecutive early returns (`if (!x) return; if (!y) return;`) can stay together (no blank line between)
- Never `!important` in CSS

## Library rules

- Generic components, no domain-specific business logic
- Every new component: export via barrel file + unit test
- Peer dependencies external in build
- Types exported alongside components
- Labels in pt-BR, overrideable via props
- No `defineExpose` for imperative control — use composables + props
- Consumers control colors via Vuetify theme config, not custom stores

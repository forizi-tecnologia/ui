---
name: pipeline
description: Pre-merge pipeline: diff against main, review code style, check tests, detect breaking changes, fix issues, commit/push, and create a GitHub merge request. Use when preparing to merge a feature branch into main.
---

# PR Pipeline — Forizi UI

Full pre-merge pipeline. Runs automatically and only commits/pushes inside this workflow.

## Workflow (execute in order)

### 1. Git diff analysis

```bash
git fetch origin main
git diff origin/main...HEAD --stat
git diff origin/main...HEAD
```

Identify:
- New files (components, composables, utils, types)
- Modified files
- Deleted files
- Public API changes (exports, prop changes, emit changes)

### 2. Unit test coverage

For every new or modified file under `src/`:
- If it's a component (`src/components/**/*.vue`), check if `__tests__/<Name>.spec.ts` exists
- If it's a composable (`src/composables/**/*.ts`), check if `__tests__/<name>.spec.ts` exists
- If it's a utility (`src/utils/**/*.ts`), check if `__tests__/<name>.spec.ts` exists

**CRITICAL**: Every new component / composable / utility MUST have a corresponding unit test. If missing, create one following the `unit-testing` skill rules.

Load the `unit-testing` skill before creating any missing tests.

### 3. Breaking changes detection

Scan the diff for:
- **Deleted exports** — any `export { ... }` removed from barrel files
- **Changed prop types** — narrowing types, changing defaults, removing optional markers
- **Changed emit signatures** — different payloads
- **Renamed props/emits** — breaking for consumers
- **Removed public types/interfaces**

Report breaking changes prominently. If found, flag as **BREAKING** in the MR description.

### 4. Code review

Load the `code-review` skill and run the full checklist against every changed file under `src/`. Focus on:
- CRITICAL items — fix immediately
- ATTENTION items — fix unless there's a valid reason not to

Also cross-check against `code-style-frontend` skill rules:
- Early return everywhere
- Zero logic in template
- Single quotes, semicolons
- No `any`, no `var`
- No `!important` in CSS
- Self-documenting names (no comments)
- Vuetify utilities before scoped CSS

### 5. Verification

Run in order (stop on failure):
```bash
pnpm lint
pnpm test
pnpm build
```

If any step fails, diagnose and fix before proceeding.

### 6. Auto-learning (antes do commit)

Run `/learn` to analyze the `git diff` and update documentation:

- `docs/ARCHITECTURE.md` — new patterns, folder structure changes, component additions
- `docs/COGNITIVE.md` — design decisions, removed dependencies, convention changes
- Skill files in `.opencode/skills/` — new conventions discovered

Load the `/learn` workflow: analyze `git diff origin/main...HEAD`, identify new patterns/conventions/decisions, and update the relevant docs. Keep docs in sync with code.

### 7. Commit and push (ONLY in this pipeline)

**IMPORTANT**: Only commit and push when running this pipeline. Never commit in any other context.

```bash
git add -A
git diff --cached --stat   # review what will be committed
```

Write a conventional commit message in Portuguese summarizing the changes:
- `feat: adiciona componente X com Y`
- `fix: corrige comportamento Z`
- `refactor: reorganiza W em subcomponentes`

```bash
git commit -m "<message>"
git push origin HEAD
```

### 8. Merge request

Create a merge request description in **English** with this structure:

```markdown
## Summary
<2-3 sentences describing what this PR does>

## Changes
- <bullet list of key changes>

## Breaking Changes
<list or "None">

## Verification
- [x] `pnpm lint` passing
- [x] `pnpm test` passing
- [x] `pnpm build` passing
```

Then create the MR on GitHub:
```bash
gh pr create \
  --base main \
  --head $(git branch --show-current) \
  --title "<conventional commit title in English>" \
  --body "<MR description>"
```

Report the PR URL to the user.

### 8. Auto-learning (if significant changes)

If this PR introduces new patterns, conventions, or architectural decisions, suggest running `/learn` to update docs. Do NOT run it automatically — ask the user.

## Rules

- **ZERO commits outside this pipeline** — if asked to commit, remind the user that commits are only allowed via `/pr-pipeline`
- **Fix, don't skip** — broken tests, lint errors, missing tests must be fixed
- **Breaking changes must be explicit** — never hide them
- **English for docs/commits/code** — Portuguese only for UI labels
- **Verify before MR** — never create an MR with failing checks

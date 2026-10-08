# Spec — FzTimePicker

> Status: approved — implementing.
> Written in English to match the sibling docs (`ARCHITECTURE.md`, `COGNITIVE.md`).
> UI label defaults are pt-BR (library convention).

## 1. Overview

`FzTimePicker` is a time-only input for the Forizi UI library. It combines a masked text
field (type the time directly) with a dropdown picker made of two (or three) scrollable
"wheels" — hour, minute and, in 12-hour mode, AM/PM. The wheel behavior mimics the iOS
time selector: vertical scroll with snap and a centered highlight band.

It lives in `src/components/inputs/timepicker/` and follows the same patterns as
`FzDatePicker` (`useFzDefaults` for `variant`/`density`, validation like `FzEmailField`,
`prepend`/`append` slots, `isValid` event).

### Goals

- Type a time directly using a mask (`##:##` in 24h, `##:## AM` in 12h).
- Pick hour/minute by scrolling two wheels; add an AM/PM wheel when `use24Hour=false`.
- `minuteStep` controls the minute wheel granularity (e.g. `5` → 00, 05, 10...).
- `v-model` is always the canonical 24-hour `HH:mm`, independent of the display format.
- pt-BR label defaults, overrideable.

### Non-goals (v1)

- No seconds, no `time` range, no timezone handling.
- No `min`/`max` time bounds (deferred — can be added like the date picker).
- No literal 3D wheel; native CSS scroll-snap is used (the iOS *feel*, not the 3D rotation).

## 2. Public API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Selected time as canonical 24h `HH:mm`. `''` = no time. |
| `use24Hour` | `boolean` | `true` | `false` switches the display/mask to 12h with AM/PM. Does NOT affect `v-model`. |
| `minuteStep` | `number` | `1` | Minute wheel granularity. Invalid values fall back to `1`. |
| `label` | `string` | `'Hora'` | Field label. |
| `placeholder` | `string` | `''` | Custom placeholder; falls back to `hh:mm` / `hh:mm AM/PM`. |
| `rules` | `ValidationRule[]` | `[]` | Extra rules, merged after the internal time validation. |
| `disabled` | `boolean` | `false` | Disables the field and the picker trigger. |
| `hint` | `string` | `''` | Persistent helper text when non-empty. |
| `required` | `boolean` | `false` | Empty value fails validation when `true`. |
| `validateOnBlur` | `boolean` | `true` | Resolve validation / emit `isValid` on blur (else on input). |
| `requiredMessage` | `string` | `''` | Override for the required message (fallback `'Hora é obrigatória'`). |
| `invalidMessage` | `string` | `''` | Override for the invalid message (fallback `'Hora inválida'`). |
| `variant` | `TextFieldVariant` | `undefined` | Resolved via `useFzDefaults`. |
| `density` | `TextFieldDensity` | `undefined` | Resolved via `useFzDefaults`. |
| `hideDetails` | `boolean` | `false` | Hide the hint/error area. |
| `fieldWidth` | `string` | `'160px'` | Field width. |
| `icon` | `string` | `'mdi-clock-outline'` | Trigger icon. |
| `width` | `string \| number` | `undefined` | Menu width; defaults per mode (24h → 180, 12h → 240). |
| `height` | `number` | `160` | Wheel viewport height. |
| `itemHeight` | `number` | `32` | Wheel item height. |
| `menuLocation` | `MenuAnchor` | `'top right'` | Vuetify menu location. |
| `menuOrigin` | `MenuOrigin` | `undefined` | Vuetify menu origin (resolved to `'auto'`). |
| `hourLabel` | `string` | `''` | Accessible label for the hour wheel. |
| `minuteLabel` | `string` | `''` | Accessible label for the minute wheel. |
| `meridiemLabel` | `string` | `''` | Accessible label for the AM/PM wheel. |

`ValidationRule = (value: string) => boolean | string`.

### Events

| Event | Payload | When |
|-------|---------|------|
| `update:modelValue` | `string` (`HH:mm` or `''`) | A valid time is typed or picked; `''` when cleared/invalid. |
| `isValid` | `boolean` | On blur (or on input when `validateOnBlur === false`). |

### Slots

- `prepend`, `append` — passthrough like the other inputs.

### Exposed types (barrel)

- `FzTimePicker` via `src/components/index.ts`.
- `Meridiem`, `TimeParts`, `TimeWheelOption` from `src/utils/time.ts`.

## 3. Field behavior

- Mask from `use24Hour`: `##:##` or `##:## AM`. The 12h mask uses custom maska tokens
  (`A` accepts `A`/`P`, `M` accepts `M`) that uppercase the input.
- Display comes from the canonical value via `formatDisplay(value, use24Hour)`:
  - 24h: `14:30`
  - 12h: `02:30 PM` (`00` → `12 AM`, `12` → `12 PM`)
- On input: parse strictly; valid → emit canonical `HH:mm`; invalid/incomplete → emit `''`.
- On blur: validate (empty+required → required message; otherwise invalid → invalid message).

## 4. Picker dropdown

A `v-menu` (`close-on-content-click=false`) anchored to the trigger icon, containing a
`v-card` with a centered wheel row. The wheel is a native scroll container:

```
fz-time-wheel:
  ┌─────────┐
  │  spacer │  (height-itemHeight)/2
  │   00    │  ← snap items
  │   01    │
  │  ...    │
  │  spacer │
  └─────────┘
```

- `scroll-snap-type: y mandatory`, each item `scroll-snap-align: center`.
- Top/bottom spacers let the first and last item center.
- A centered highlight band (theme-aware) marks the selection; scrolling updates the
  value live (`update:modelValue`) → picker emits canonical `select`.
- On open, wheels scroll to the selected time; without a value they show `00:00`.
- `minuteStep > 1` filters the minute options and snaps non-aligned minutes on reset.
- Keyboard: ArrowUp/ArrowDown move the wheel selection.

## 5. Architecture / file decomposition

```
src/
  utils/
    time.ts                              ← pure functions, no Vue (100% tested)
    __tests__/time.spec.ts
  composables/
    useTimePicker.ts                     ← wheel state (hour/minute/meridiem) + options
    __tests__/useTimePicker.spec.ts
  components/
    inputs/timepicker/
      FzTimePicker.vue                   ← PUBLIC: field + mask + validation + orchestration
      FzTimePickerMenu.vue               ← v-menu shell + wheels row + highlight band
      FzTimeWheel.vue                    ← generic scroll-snap wheel
      FzTimePicker.stories.ts
      __tests__/
        FzTimePicker.spec.ts
        FzTimePickerMenu.spec.ts
        FzTimeWheel.spec.ts
```

No new Vuetify component is needed (`VMenu`, `VCard`, `VIcon`, `VTextField` are already in
`requiredVuetifyComponents`).

## 6. CSS (scoped, only where Vuetify has no utility)

- Wheel: `overflow-y: auto`, `scroll-snap-type`, hidden scrollbar, top/bottom mask fade.
- Highlight band: `position: absolute` centered, theme color via `rgba(var(--v-theme-on-surface), .08)`.
- Active item: full-opacity text; inactive: 60% opacity.
- `<Transition>` is not required (menu handles enter/leave).

## 7. Test plan (100% coverage)

- `time.spec.ts`: parse/format both modes; `to12Hour`/`to24Hour`/`getMeridiem`; masks;
  hour/minute/meridiem options; `snapToStep`; `findNearestOptionIndex`; invalid/edge values.
- `useTimePicker.spec.ts`: initial state from selected; `reset`; `toCanonicalValue` in both
  modes; option lists; `setMeridiemIndex`.
- `FzTimeWheel.spec.ts`: renders options; scroll emits; click emits; keyboard; scrolls to value.
- `FzTimePickerMenu.spec.ts`: open resets; wheel change emits canonical; 12h meridiem wheel;
  width per mode.
- `FzTimePicker.spec.ts`: label/placeholder; display both modes; typing emits canonical;
  incomplete/invalid → `''`; blur validation (required/invalid/custom); `isValid`;
  `validateOnBlur=false`; icon opens menu; selecting a wheel updates display; disabled;
  hint; slots; variant resolution; menu location/origin; `use24Hour` reformat; `minuteStep`.

## 8. Acceptance criteria

- [ ] Mask + display work in 24h and 12h (with AM/PM).
- [ ] `v-model` always canonical `HH:mm`.
- [ ] Wheels scroll with snap, center highlight, live update.
- [ ] `minuteStep` filters/snaps minutes.
- [ ] Validation, `isValid`, `required`, custom messages.
- [ ] Barrel export + types, Storybook story, playground entry.
- [ ] `pnpm check` green (100% coverage on new files) and `pnpm build` green.

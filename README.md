# @forizi/ui

Forizi UI — Vue 3 + TypeScript + Vuetify 3 component library.

Reusable components and utilities for Vue 3 projects with Vuetify.

> 📚 **Full documentation**: visit the [Storybook](https://forizi.github.io/ui) for interactive examples of every component.

## Installation

```bash
pnpm add @forizi/ui
```

### Peer dependencies

Ensure your project has these installed:

```bash
pnpm add vue vuetify pinia axios maska
```

## Quick Setup

```ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { setupLib, requiredVuetifyComponents } from '@forizi/ui';
import '@forizi/ui/style.css';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components: requiredVuetifyComponents,
});

app.use(pinia); // Must come before setupLib
app.use(vuetify);
setupLib(app); // Registers all components + global utilities
app.mount('#app');
```

### App.vue — Required global components

For notifications, confirm dialogs, and loading overlay to work, include these in your `App.vue`:

```vue
<template>
  <v-app>
    <FzConfigProvider :defaults="{ variant: 'outlined' }">
      <router-view />

      <!-- Global utilities -->
      <FzFloatingNotify />
      <FzLoadingOverlay />
      <FzConfirmDialog />
    </FzConfigProvider>
  </v-app>
</template>
```

`FzFloatingNotify`, `FzLoadingOverlay` and `FzConfirmDialog` all connect to their global singletons with no props required. `FzLoadingOverlay` also accepts `isLoading`/`message` as local overrides.

## FzConfigProvider — Global defaults

Set default props for all `Fz*` components in one place, without repeating them on each instance.

```vue
<script setup lang="ts">
import { FzConfigProvider, FzFloatingNotify } from '@forizi/ui';
</script>

<template>
  <FzConfigProvider :defaults="{ variant: 'outlined' }">
    <FzFloatingNotify />
    <router-view />
  </FzConfigProvider>
</template>
```

All `Fz` input components (`FzPhoneField`, `FzMoneyField`, `FzEmailField`, `FzCpfCnpjField`, `FzChipsSelect`, `FzPasswordField`, `FzNumberField`, `FzZipCodeField`, `FzFullAddress`) will use `outlined` automatically. Override individually when needed:

```vue
<FzPhoneField variant="underlined" />  <!-- one-off override -->
```

### Resolution priority (highest to lowest)

1. Prop passed directly: `<FzPhoneField variant="filled" />`
2. FzConfigProvider default: `<FzConfigProvider :defaults="{ variant: 'outlined' }">`
3. Hardcoded fallback: `'underlined'`

### Extensible

The `FzDefaults` type is extendable for future shared props:

```ts
export interface FzDefaults {
  variant?: TextFieldVariant;
}
```

## Components

### Inputs

```vue
<template>
  <FzMoneyField v-model="price" label="Preço" />
  <FzNumberField v-model="quantity" label="Quantidade" :decimal-places="0" />
  <FzEmailField v-model="email" label="E-mail" required />
  <FzPhoneField v-model="phone" label="Telefone" />
  <FzCpfCnpjField v-model="document" label="CPF/CNPJ" required />
  <FzChipsSelect v-model="states" label="Estados" :items="states" :max-visible-chips="3" />
  <FzSelectField v-model="category" label="Categoria" :items="categories" required />
  <FzAutocompleteField v-model="bank" label="Banco" :items="banks" hint="Digite para filtrar" />
  <FzMonthPicker v-model="referenceMonth" label="Mês de referência" />
  <FzPasswordField v-model="password" label="Senha" :minlength="8" required />
  <FzZipCodeField v-model="cep" label="CEP" @zip-code-found="onAddress" />
  <FzFullAddress v-model="address" required counter />
</template>
```

`FzSelectField` and `FzAutocompleteField` follow the same contract as the other inputs: `rules`, `required`,
`requiredMessage`, `validateOnBlur`, `hideDetails`, `@isValid`, and `variant`/`density` resolved through
`FzConfigProvider`. `multiple` switches the model to an array. The autocomplete also forwards the `item`,
`selection` and `no-data` slots.

`FzMonthPicker` uses a canonical `yyyy-mm` `v-model`, independent of the display `format` (`mm/yyyy` or
`yyyy-mm`). `min`/`max` disable out-of-range months, and the current month is highlighted.

### Buttons

```vue
<template>
  <FzIconToolTip icon="mdi-pencil" tooltip="Editar" @click="edit" />
  <FzIconToolTip icon="mdi-delete" tooltip="Excluir" disabled disabled-tooltip="Sem permissão" />
  <FzIconToolTip icon="mdi-content-save" tooltip="Salvar" :size="28" />
</template>
```

`FzIconToolTip` is keyboard accessible: the icon-only mode gets `role="button"`, `tabindex="0"`, `aria-label`
(from `tooltip` or `disabledTooltip`) and triggers `@click` with Enter or Space. When disabled it leaves the tab
order (`tabindex="-1"`), sets `aria-disabled` and ignores activation. `size` is forwarded to the internal
`v-icon`/`v-btn`.

### Modals

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FzModalBase } from '@forizi/ui';
import type { ModalAction } from '@forizi/ui';

const open = ref(false);

const actions: ModalAction[] = [
  { text: 'Salvar', color: 'primary', handler: () => { save(); open.value = false; } },
  { text: 'Cancelar', color: 'secondary', handler: () => open.value = false },
];
</script>

<template>
  <FzModalBase v-model="open" title="Editar Produto" :actions="actions">
    <p>Conteúdo do modal</p>
  </FzModalBase>
</template>
```

**Events and options:**

- `@close` fires when the user dismisses the dialog (click outside or Esc with `persistent: false`). Programmatic `v-model` changes do not emit it.
- `close-on-action` closes the dialog and emits `close` after an action handler resolves.
- The `actions` slot replaces the default footer and receives `{ close, actions }`:

```vue
<FzModalBase v-model="open" title="Editar Produto" :actions="actions">
  <p>Conteúdo do modal</p>

  <template #actions="{ close }">
    <v-spacer />
    <v-btn color="error" variant="text" @click="close">Excluir</v-btn>
    <v-btn color="secondary" variant="outlined" @click="close">Cancelar</v-btn>
    <v-btn color="primary" variant="elevated" @click="close">Salvar</v-btn>
  </template>
</FzModalBase>
```

### Notifications

Notifications appear at the top-right with a colored card, progress bar, and auto-hide.
Colors follow your Vuetify theme automatically — change `success`/`error` in your theme config
and the notifications follow.

```vue
<script setup lang="ts">
import { notify } from '@forizi/ui';

notify.success('Salvo', 'Produto salvo com sucesso');
notify.error('Erro', 'Falha ao salvar produto');
notify.warning('Atenção', 'Estoque baixo');
notify.info('Info', 'Produto atualizado');

// Per-call duration (default: 3000ms)
notify.success('Salvo', 'Tudo certo', { duration: 5000 });

// Close the current item and advance to the next one
notify.dismiss();
</script>
```

**Features:**
- **Queue**: consecutive calls are shown one at a time, in order. Up to 5 notifications wait; when the queue is
  full, the oldest waiting notification is dropped.
- Decremental progress bar tracking the auto-hide timer
- Per-call `duration` (defaults to `NOTIFY_DURATION = 3000`)
- Hover the card to **pause** the timer of the visible item only (read at your own pace)
- Move the mouse away to **resume** with the remaining time
- `notify.dismiss()` (alias `notify.hide()`) closes the visible item and advances
- Theme-aware: border, title, icon and progress fill use the type color from your Vuetify theme

### Confirm Dialog

No manual setup required — just place `<FzConfirmDialog />` in `App.vue` and use `confirm.show()`.

The confirm renders above `FzModalBase` by design (`CONFIRM_Z_INDEX = 2600` > `MODAL_Z_INDEX = 2400`), so it can
be opened from inside a modal without local z-index overrides.

```vue
<script setup lang="ts">
import { confirm } from '@forizi/ui';

async function handleDelete() {
  const ok = await confirm.show('Excluir', 'Esta ação não pode ser desfeita.', {
    confirmText: 'Sim, excluir',
    confirmColor: 'error',
  });
  if (ok) deleteItem();
}
</script>
```

### Loading Overlay

`<FzLoadingOverlay />` requires no props: it follows the global loading singleton.

```vue
<script setup lang="ts">
import { loading } from '@forizi/ui';

loading.show('Salvando...');
await doSomething();
loading.hide();
</script>
```

`isLoading` and `message` are optional overrides for local usage (a component-level overlay instead of the
global one). `delay` (default 300ms) still applies before the spinner content appears.

### Data Table

`FzDataTable` renders a server-side `v-data-table-server` on desktop and a card list below the mobile
breakpoint. `page`, `itemsPerPage` and `sortBy` are proxied with `v-model`; `update:options` is the fetch hook.

```vue
<script setup lang="ts">
import { FzDataTable } from '@forizi/ui';
import type { DataTableHeader } from 'vuetify';

const headers: DataTableHeader[] = [
  { title: 'Nome', key: 'name' },
  { title: 'Valor', key: 'amount' },
];

const items = ref<Invoice[]>([]);
const page = ref(1);
const itemsPerPage = ref(25);

async function fetchPage() {
  const response = await api.get('/invoices', { params: { page: page.value, itemsPerPage: itemsPerPage.value } });
  items.value = response.data.items;
}
</script>

<template>
  <FzDataTable
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :items-length="total"
    clickable-rows
    @update:options="fetchPage"
    @row-click="openInvoice"
  >
    <!-- Custom empty state on desktop and mobile -->
    <template #no-data>
      <div class="d-flex flex-column align-center ga-2 py-8">
        <v-icon size="48">mdi-inbox-outline</v-icon>
        <span class="text-body-1">Nenhuma fatura encontrada</span>
        <v-btn color="primary">Nova fatura</v-btn>
      </div>
    </template>
  </FzDataTable>
</template>
```

- **`row-click`** emits `(item, event)` on both layouts. It only fires when `clickable-rows` is set.
- Clicks inside interactive content (`button`, `a`, `input`, `select`, `textarea`, `.v-btn`, `.v-icon--clickable`,
  `.v-chip--clickable`) do not trigger `row-click`. For custom content, add `data-row-click-ignore` to opt out.
- **`no-data` slot** replaces `no-data-text` in both the table and the card list; it is not rendered while loading.
- **`hideOnCard`**: mark a header to drop it from the mobile cards while keeping it on desktop.

```ts
import type { FzDataTableHeader } from '@forizi/ui';

const headers: FzDataTableHeader[] = [
  { title: 'Id', key: 'id', hideOnCard: true },
  { title: 'Nome', key: 'name' },
  { title: 'Ações', key: 'actions', hideOnCard: true, sortable: false },
];
```

### Client-side tables

Use the `useClientDataTable` composable when the full list is already in memory:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FzDataTable, useClientDataTable } from '@forizi/ui';

const source = ref<Invoice[]>([]);
const { page, itemsPerPage, sortBy, pageItems, total, pageCount } = useClientDataTable(source);

// itemsPerPage <= 0 returns every row and pageCount 1
</script>

<template>
  <FzDataTable
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :headers="headers"
    :items="pageItems"
    :items-length="total"
    clickable-rows
    @row-click="openInvoice"
  />
</template>
```

The composable sorts with path-aware `getValueByPath`, numeric comparison for numbers and numeric strings, and a
`pt-BR` `Intl.Collator`. It resets the page to 1 whenever the source ref changes.

## Navigation

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FzMonthStepper } from '@forizi/ui';

const month = ref('2026-11');
</script>

<template>
  <FzMonthStepper v-model="month" />
  <FzMonthStepper v-model="month" locale="en" :arrows="false" />
</template>
```

`FzMonthStepper` shares the `yyyy-mm` contract and navigation logic with `FzMonthPicker`. `min`/`max` disable the
arrows at the bounds, `allow-future="false"` blocks navigating past the current month, `arrows="false"` hides the
buttons for read-only headers, and the default slot replaces the label.

## Layout

### Empty state

```vue
<script setup lang="ts">
import { FzEmptyState } from '@forizi/ui';
</script>

<template>
  <FzEmptyState
    title="Nenhuma fatura encontrada"
    description="Comece registrando sua primeira fatura para acompanhar seus gastos."
    action-text="Nova fatura"
    action-icon="mdi-plus"
    @action="openCreateInvoice"
  />
</template>
```

`compact` reduces the spacing/icon/typography for use inside table cards. The `action` slot fully replaces the
default button, and the default slot adds extra content below the description.

Combine it with the `FzDataTable` `no-data` slot:

```vue
<FzDataTable :headers="headers" :items="items" :items-length="total">
  <template #no-data>
    <FzEmptyState
      compact
      title="Nenhuma fatura encontrada"
      description="Comece registrando sua primeira fatura."
      action-text="Nova fatura"
      @action="openCreateInvoice"
    />
  </template>
</FzDataTable>
```

## Composables

```ts
import { useBreakpoint, useClientDataTable, useGlobals, useLoading, useMonthPicker } from '@forizi/ui';

// Responsive breakpoints
const { isMobile, isMobileOrTablet } = useBreakpoint();

// Access global utilities inside setup
const { notify, loading, confirm } = useGlobals();

// Local loading state
const { isActive, message, show, hide } = useLoading();

// Client-side pagination + sorting for FzDataTable
const { page, itemsPerPage, sortBy, pageItems, total, pageCount } = useClientDataTable(source);

// Month navigation state shared by FzMonthPicker / FzMonthStepper
const { label, canGoPrevious, canGoNext, goPrevious, goNext } = useMonthPicker({ modelValue: month });
```

Pure month helpers are also exported: `parseMonth`, `toMonthIso`, `formatMonth`, `shiftMonth`,
`isMonthWithinRange`, `getCurrentMonth` and `getMonthLabel`.

## API (HTTP Client)

```ts
import api, { configureApi } from '@forizi/ui/utils';

configureApi({ baseURL: 'https://api.example.com', timeout: 15000 });

const response = await api.get('/items');
```

## Package Entry Points

```ts
// Main — all components + composables + utilities
import { FzMoneyField, useBreakpoint, notify } from '@forizi/ui';

// Components only (tree-shakeable)
import { FzMoneyField } from '@forizi/ui/components';

// Composables only
import { useBreakpoint } from '@forizi/ui/composables';

// Utilities only
import { notify, confirm, loading } from '@forizi/ui/utils';

// Plugin (for manual registration)
import { globalsPlugin } from '@forizi/ui/plugins';
```

## Development

```bash
pnpm dev             # watch mode build
pnpm build           # build + type declarations
pnpm lint            # eslint --fix
pnpm test            # vitest run
pnpm check           # lint + test
pnpm dev:playground  # visual test environment
pnpm storybook       # Storybook dev server on port 6006
pnpm build:storybook # static Storybook build → storybook-static/
```

## License

MIT

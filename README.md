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

All `Fz` input components (`FzPhoneField`, `FzMoneyField`, `FzEmailField`, `FzNumberField`, `FzZipCodeField`, `FzFullAddress`) will use `outlined` automatically. Override individually when needed:

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
  <FzZipCodeField v-model="cep" label="CEP" @zip-code-found="onAddress" />
  <FzFullAddress v-model="address" />
</template>
```

### Buttons

```vue
<template>
  <FzIconToolTip icon="mdi-pencil" tooltip="Editar" @click="edit" />
  <FzIconToolTip icon="mdi-delete" tooltip="Excluir" disabled disabled-tooltip="Sem permissão" />
</template>
```

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
</script>
```

**Features:**
- Decremental progress bar tracking the auto-hide timer
- Hover the card to **pause** the timer (read at your own pace)
- Move the mouse away to **resume**
- Theme-aware: border, title, icon and progress fill use the type color from your Vuetify theme

### Confirm Dialog

No manual setup required — just place `<FzConfirmDialog />` in `App.vue` and use `confirm.show()`.

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

```vue
<script setup lang="ts">
import { loading } from '@forizi/ui';

loading.show('Salvando...');
await doSomething();
loading.hide();
</script>
```

## Composables

```ts
import { useBreakpoint, useGlobals, useLoading } from '@forizi/ui';

// Responsive breakpoints
const { isMobile, isMobileOrTablet } = useBreakpoint();

// Access global utilities inside setup
const { notify, loading, confirm } = useGlobals();

// Local loading state
const { isActive, message, show, hide } = useLoading();
```

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

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title class="text-body-1 font-weight-bold">
        Forizi UI — Playground
      </v-app-bar-title>

      <template #append>
        <v-btn
          :icon="themeIcon"
          variant="text"
          @click="toggleTheme"
        />
      </template>
    </v-app-bar>

    <v-main>
      <v-tabs
        v-model="activeTab"
        color="primary"
        grow
      >
        <v-tab value="botoes">Botões</v-tab>
        <v-tab value="inputs">Inputs</v-tab>
        <v-tab value="modal">Modal</v-tab>
        <v-tab value="mensagens">Mensagens</v-tab>
        <v-tab value="layout">Layout</v-tab>
      </v-tabs>

      <v-divider />

      <div style="height: calc(100dvh - 200px); overflow-y: auto;">
        <v-window v-model="activeTab">
          <v-window-item value="botoes" class="pa-6">
            <ButtonsPlayground />
          </v-window-item>

          <v-window-item value="inputs" class="pa-6">
            <InputsPlayground />
          </v-window-item>

          <v-window-item value="modal" class="pa-6">
            <ModalPlayground />
          </v-window-item>

          <v-window-item value="mensagens" class="pa-6">
            <MessagesPlayground />
          </v-window-item>

          <v-window-item value="layout" class="pa-6">
            <LayoutPlayground />
          </v-window-item>
        </v-window>
      </div>
    </v-main>

    <FzFloatingNotify />
    <FzLoadingOverlay :is-loading="isActive" :message="message" />
    <FzConfirmDialog />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useLoadingRefs } from '@/utils';
import ButtonsPlayground from './views/ButtonsPlayground.vue';
import InputsPlayground from './views/InputsPlayground.vue';
import ModalPlayground from './views/ModalPlayground.vue';
import MessagesPlayground from './views/MessagesPlayground.vue';
import LayoutPlayground from './views/LayoutPlayground.vue';

const STORAGE_THEME = 'playground-theme';
const STORAGE_TAB = 'playground-tab';

const activeTab = ref(localStorage.getItem(STORAGE_TAB) || 'botoes');

const { isActive, message } = useLoadingRefs();

const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);

const themeIcon = computed(() => isDark.value ? 'mdi-weather-sunny' : 'mdi-weather-night');

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark';

  (theme as unknown as { change: (name: string) => void }).change(next);

  localStorage.setItem(STORAGE_THEME, next);
}

watch(activeTab, (tab) => {
  localStorage.setItem(STORAGE_TAB, tab);
});

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_THEME);

  if (saved === 'dark' && !isDark.value) toggleTheme();

  if (saved === 'light' && isDark.value) toggleTheme();
});
</script>

<style>
kbd {
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  font-size: 0.85em;
  font-weight: 600;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
</style>

<template>
  <SectionCard title="FzModalBase">
    <template #description>
      Modal base com ações customizáveis e suporte a teclado (Enter/Esc).
    </template>

    <div class="d-flex flex-wrap ga-4">
      <v-btn color="primary" @click="openModal = true">
        Abrir Modal
      </v-btn>

      <v-btn color="secondary" @click="openModalLarge = true">
        Modal Grande
      </v-btn>
    </div>

    <FzModalBase
      v-model="openModal"
      title="Confirmar ação"
      message="Deseja realmente executar esta ação?"
      :actions="defaultActions"
    />

    <FzModalBase
      v-model="openModalLarge"
      title="Modal com conteúdo personalizado"
      :actions="largeModalActions"
      :max-width="600"
    >
      <v-text-field
        v-model="modalField"
        label="Nome do item"
        variant="outlined"
        density="comfortable"
      />

      <v-select
        v-model="modalSelect"
        :items="['Opção 1', 'Opção 2', 'Opção 3']"
        label="Categoria"
        variant="outlined"
        density="comfortable"
      />
    </FzModalBase>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ModalAction } from '@/components';

const openModal = ref(false);
const openModalLarge = ref(false);
const modalField = ref('');
const modalSelect = ref('');

const defaultActions: ModalAction[] = [
  { text: 'Cancelar', color: 'secondary', handler: () => { openModal.value = false; } },
  { text: 'Confirmar', color: 'primary', handler: () => { openModal.value = false; } },
];

const largeModalActions: ModalAction[] = [
  { text: 'Salvar', color: 'primary', handler: () => { openModalLarge.value = false; } },
  { text: 'Fechar', color: 'secondary', handler: () => { openModalLarge.value = false; } },
];
</script>

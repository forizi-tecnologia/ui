<template>
  <SectionCard title="Notificações (FzFloatingNotify)">
    <template #description>
      Notificações flutuantes com auto-hide. Use o utilitário <code>notify</code>.
    </template>

    <div class="d-flex flex-wrap ga-2">
      <v-btn color="success" @click="notifySuccess">
        Sucesso
      </v-btn>

      <v-btn color="error" @click="notifyError">
        Erro
      </v-btn>

      <v-btn color="warning" @click="notifyWarning">
        Aviso
      </v-btn>

      <v-btn color="info" @click="notifyInfo">
        Informação
      </v-btn>
    </div>
  </SectionCard>

  <SectionCard title="Confirmação (FzConfirmDialog)">
    <template #description>
      Diálogo de confirmação assíncrono. Use o utilitário <code>confirm</code>.
    </template>

    <div class="d-flex flex-wrap ga-2">
      <v-btn color="primary" @click="confirmDelete">
        Excluir item
      </v-btn>

      <v-btn color="secondary" @click="confirmInfo">
        Informação
      </v-btn>
    </div>

    <v-alert
      v-if="confirmResult !== null"
      :type="confirmResult ? 'success' : 'warning'"
      class="mt-3"
      density="compact"
      variant="tonal"
    >
      {{ confirmResult ? 'Usuário confirmou' : 'Usuário cancelou' }}
    </v-alert>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { notify, confirm } from '@/utils';

const confirmResult = ref<boolean | null>(null);

function notifySuccess() {
  notify.success('Sucesso', 'Operação realizada com sucesso.');
}

function notifyError() {
  notify.error('Erro', 'Ocorreu um erro ao executar a operação.');
}

function notifyWarning() {
  notify.warning('Atenção', 'Verifique os dados antes de continuar.');
}

function notifyInfo() {
  notify.info('Informação', 'Esta é uma notificação informativa.');
}

async function confirmDelete() {
  confirmResult.value = await confirm.show('Excluir', 'Deseja realmente excluir este item?', {
    confirmText: 'Sim, excluir',
    confirmColor: 'error',
  });
}

async function confirmInfo() {
  confirmResult.value = await confirm.show('Informação', 'Esta ação não pode ser desfeita.', {
    confirmText: 'OK',
    cancelText: 'Fechar',
    confirmColor: 'info',
  });
}
</script>

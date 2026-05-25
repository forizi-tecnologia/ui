<template>
  <SectionCard title="FzIconToolTip">
    <template #description>
      Botão icônico com tooltip. Útil para ações rápidas em tabelas e listas.
    </template>

    <div class="text-subtitle-2 mb-2">Variantes de cor</div>

    <div class="d-flex flex-wrap ga-4">
      <FzIconToolTip
        icon="mdi-pencil"
        tooltip="Editar"
        color="primary"
        @click="onClick('Editar')"
      />

      <FzIconToolTip
        icon="mdi-delete"
        tooltip="Excluir"
        color="error"
        @click="onClick('Excluir')"
      />

      <FzIconToolTip
        icon="mdi-content-save"
        tooltip="Salvar"
        color="success"
        @click="onClick('Salvar')"
      />

      <FzIconToolTip
        icon="mdi-download"
        tooltip="Download"
        color="info"
        @click="onClick('Download')"
      />

      <FzIconToolTip
        icon="mdi-cog"
        tooltip="Configurações"
        color="warning"
        @click="onClick('Configurações')"
      />
    </div>

    <v-divider class="my-4" />

    <div class="text-subtitle-2 mb-2">Modo botão (as-button)</div>

    <div class="d-flex flex-wrap ga-4">
      <FzIconToolTip
        icon="mdi-pencil"
        tooltip="Clique para editar"
        as-button
        color="primary"
        @click="onClick('Editar (botão)')"
      />

      <FzIconToolTip
        icon="mdi-delete"
        tooltip="Clique para excluir"
        as-button
        color="error"
        @click="onClick('Excluir (botão)')"
      />

      <FzIconToolTip
        icon="mdi-content-save"
        tooltip="Salvar alterações"
        as-button
        color="success"
        @click="onClick('Salvar (botão)')"
      />
    </div>

    <v-divider class="my-4" />

    <div class="text-subtitle-2 mb-2">Desabilitado sem tooltip</div>

    <div class="d-flex flex-wrap ga-4 mb-4">
      <FzIconToolTip
        icon="mdi-pencil"
        tooltip="Editar"
        disabled
        color="primary"
      />

      <FzIconToolTip
        icon="mdi-delete"
        tooltip="Excluir"
        disabled
        color="error"
      />

      <FzIconToolTip
        icon="mdi-pencil"
        tooltip="Editar (desabilitado)"
        as-button
        disabled
        color="primary"
      />
    </div>

    <div class="text-subtitle-2 mb-2">Desabilitado com motivo (disabledTooltip)</div>

    <div class="d-flex flex-wrap ga-4">
      <FzIconToolTip
        icon="mdi-pencil"
        tooltip="Editar"
        disabled
        disabled-tooltip="Sem permissão para editar"
        color="primary"
      />

      <FzIconToolTip
        icon="mdi-delete"
        tooltip="Excluir"
        disabled
        disabled-tooltip="Exclusão bloqueada"
        color="error"
      />

      <FzIconToolTip
        icon="mdi-content-save"
        tooltip="Salvar alterações"
        as-button
        disabled
        disabled-tooltip="Preencha todos os campos obrigatórios"
        color="primary"
      />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { notify } from '@/utils';

function onClick(action: string) {
  notify.info('Ação', `Clicou em: ${action}`);
}
</script>

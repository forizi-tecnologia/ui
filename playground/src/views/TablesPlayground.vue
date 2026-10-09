<template>
  <div>
    <SectionCard title="FzDataTable — responsivo (server-side)">
      <template #description>
        Redimensione a janela: telas menores viram cards. Use o switch para forçar
        o modo cards e comparar.
      </template>

      <div class="d-flex flex-wrap align-center ga-4 mb-4">
        <v-switch
          v-model="forceMobile"
          label="Forçar cards"
          color="primary"
          hide-details
          density="compact"
        />

        <span class="text-body-2 text-medium-emphasis">
          Página {{ page }} de {{ totalPages }}
        </span>
      </div>

      <FzDataTable
        v-model:page="page"
        :headers="headers"
        :items="pageItems"
        :items-length="items.length"
        :items-per-page="itemsPerPage"
        :mobile="forceMobile ? true : undefined"
      >
        <template #item.status="{ value }">
          <v-chip :color="statusColor(value)" size="small" variant="tonal">
            {{ value }}
          </v-chip>
        </template>
      </FzDataTable>
    </SectionCard>

    <SectionCard title="FzDataTable — card montado pelo consumidor">
      <template #description>
        Mesmo componente, mas o consumidor define o corpo do card via slot #card:
        título em cima, texto embaixo, status no canto e as ações no rodapé.
        Forçado no modo cards para visualizar, com elevation 1 e accent colorido.
      </template>

      <FzDataTable
        v-model:page="customPage"
        :headers="headers"
        :items="customPageItems"
        :items-length="items.length"
        :items-per-page="customItemsPerPage"
        mobile
        :elevation="1"
        accent-color="primary"
      >
        <template #card="{ item }">
          <div class="d-flex flex-column ga-3">
            <div class="d-flex align-start justify-space-between ga-2">
              <div class="d-flex flex-column">
                <span class="text-subtitle-1 font-weight-medium">{{ item.name }}</span>
                <span class="text-body-2 text-medium-emphasis">{{ item.email }}</span>
              </div>

              <v-chip :color="statusColor(item.status)" size="small" variant="tonal">
                {{ item.status }}
              </v-chip>
            </div>

            <span class="text-body-2">{{ item.city }}</span>

            <div class="d-flex justify-end ga-2">
              <FzIconToolTip icon="mdi-pencil" tooltip="Editar" @click="onEdit(item)" />

              <FzIconToolTip
                icon="mdi-eye"
                tooltip="Visualizar"
                color="primary"
                @click="onView(item)"
              />
            </div>
          </div>
        </template>
      </FzDataTable>
    </SectionCard>

    <SectionCard title="FzDataTable — scroll confinado na lista">
      <template #description>
        Campo em cima e a tabela abaixo. Com a prop height, o scroll fica só na
        lista (tabela no desktop, cards no mobile) e o resto da tela não rola.
      </template>

      <v-text-field
        v-model="scrollSearch"
        label="Buscar"
        variant="outlined"
        density="compact"
        hide-details
        class="mb-4"
      />

      <FzDataTable
        :headers="headers"
        :items="items"
        :items-length="items.length"
        :items-per-page="items.length"
        :height="360"
        :table-props="{ fixedHeader: true }"
      />
    </SectionCard>

    <SectionCard title="FzPagination">
      <template #description>Componente público, reutilizável fora da tabela.</template>

      <div class="d-flex flex-column ga-3">
        <FzPagination v-model="demoPage" :length="5" />

        <FzPagination :model-value="5" :length="5" color="primary" />
      </div>
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DataTableHeader } from 'vuetify';
import { notify } from '@/utils';
import FzDataTable from '@/components/tables/FzDataTable.vue';
import FzPagination from '@/components/navigation/FzPagination.vue';
import FzIconToolTip from '@/components/buttons/FzIconToolTip.vue';

interface Cliente {
  id: number
  name: string
  email: string
  city: string
  status: 'ativo' | 'inativo' | 'pendente'
}

const headers: DataTableHeader[] = [
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'Cidade', key: 'city' },
  { title: 'Status', key: 'status' },
];

const NAMES = ['Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Elisa Prado'];

const CITIES = ['São Paulo', 'Curitiba', 'Recife', 'Fortaleza', 'Porto Alegre'];

const STATUSES: Cliente['status'][] = ['ativo', 'inativo', 'pendente'];

const items: Cliente[] = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  name: NAMES[index % NAMES.length],
  email: `usuario${index + 1}@forizi.com.br`,
  city: CITIES[index % CITIES.length],
  status: STATUSES[index % STATUSES.length],
}));

const itemsPerPage = 5;

const customItemsPerPage = 3;

const page = ref(1);

const customPage = ref(1);

const demoPage = ref(3);

const forceMobile = ref(false);

const scrollSearch = ref('');

const totalPages = computed(() => Math.ceil(items.length / itemsPerPage));

const pageItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;

  return items.slice(start, start + itemsPerPage);
});

const customPageItems = computed(() => {
  const start = (customPage.value - 1) * customItemsPerPage;

  return items.slice(start, start + customItemsPerPage);
});

function statusColor(status: Cliente['status']): string {
  return status === 'ativo' ? 'success' : status === 'pendente' ? 'warning' : 'error';
}

function onEdit(item: Cliente): void {
  notify.info('Editar', `Abrir edição de ${item.name}`);
}

function onView(item: Cliente): void {
  notify.info('Visualizar', `Abrir detalhes de ${item.name}`);
}
</script>

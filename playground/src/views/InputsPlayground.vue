<template>
  <SectionCard title="FzDatePicker">
    <template #description>
      Campo de data com máscara e modal de calendário (3 telas: dias, meses, anos).
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateValue" label="Data (dd/mm/aaaa)" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateIso" label="Data (ISO yyyy-mm-dd)" format="yyyy-mm-dd" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateEn" label="Date (English)" locale="en" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateRequired" label="Data (obrigatória)" required />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateRange" label="Com min/max" :min="minDate" :max="maxDate" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker v-model="dateDisabled" label="Desabilitado" disabled />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzDatePicker
          v-model="dateCustomLocation"
          label="Location custom (bottom end)"
          menu-location="bottom end"
        />
      </div>
    </div>

    <div class="mt-2 text-caption text-medium-emphasis">
      v-model (ISO): {{ dateValue || '—' }} · ISO: {{ dateIso || '—' }} · EN: {{ dateEn || '—' }} · Range:
      {{ dateRange || '—' }}
    </div>
  </SectionCard>

  <SectionCard title="FzDateRangeField">
    <template #description>
      Intervalo de datas (inicial e final) com validação de período.
    </template>

    <div class="d-flex flex-column ga-6">
      <div>
        <div class="text-subtitle-2 mb-2">Padrão</div>

        <FzDateRangeField v-model="dateRangeValue" />
      </div>

      <div>
        <div class="text-subtitle-2 mb-2">Com datas preenchidas</div>

        <FzDateRangeField v-model="dateRangeFilled" />
      </div>

      <div>
        <div class="text-subtitle-2 mb-2">Com limites min/max</div>

        <FzDateRangeField
          v-model="dateRangeMinMax"
          :min="rangeMinDate"
          :max="rangeMaxDate"
          hint="Período entre 01/07/2026 e 31/07/2026"
        />
      </div>

      <div>
        <div class="text-subtitle-2 mb-2">Custom width (300px)</div>

        <FzDateRangeField v-model="dateRangeValue" field-width="300px" />
      </div>

      <div>
        <div class="text-subtitle-2 mb-2">Desabilitado</div>

        <FzDateRangeField
          v-model="dateRangeDisabled"
          disabled
        />
      </div>

      <div>
        <div class="text-subtitle-2 mb-2">Location customizada (bottom end)</div>

        <FzDateRangeField v-model="dateRangeValue" menu-location="bottom end" />
      </div>
    </div>

    <div class="mt-2 text-caption text-medium-emphasis">
      v-model: {{ JSON.stringify(dateRangeValue) }}
    </div>
  </SectionCard>

  <SectionCard title="FzEmailField">
    <template #description>
      Campo de e-mail com validação automática e ícone dinâmico.
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzEmailField v-model="emailValue" label="E-mail" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzEmailField
          v-model="emailRequired"
          label="E-mail (obrigatório)"
          required
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzEmailField
          v-model="emailDisabled"
          label="E-mail (desabilitado)"
          disabled
        />
      </div>
    </div>
  </SectionCard>

  <SectionCard title="FzMoneyField">
    <template #description>
      Campo monetário com formatação automática em Real (BRL).
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzMoneyField v-model="moneyValue" label="Preço" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzMoneyField
          v-model="moneyValue2"
          label="Com valor máximo"
          :max="1000"
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzMoneyField
          v-model="moneyDisabled"
          label="Desabilitado"
          disabled
        />
      </div>
    </div>

    <div class="mt-2 text-caption text-medium-emphasis">
      Valor: {{ moneyValue }}
    </div>
  </SectionCard>

  <SectionCard title="FzNumberField">
    <template #description>
      Campo numérico com formatação de milhar e casas decimais.
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzNumberField
          v-model="numberValue"
          label="Quantidade"
          :decimal-places="0"
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzNumberField
          v-model="numberDecimal"
          label="Com decimais"
          :decimal-places="2"
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzNumberField
          v-model="numberDisabled"
          label="Desabilitado"
          disabled
          :decimal-places="0"
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzNumberField
          v-model="numberNegative"
          label="Negativo permitido"
          :decimal-places="2"
          :allow-negative="true"
        />
      </div>
    </div>
  </SectionCard>

  <SectionCard title="FzPhoneField">
    <template #description>
      Campo de telefone com máscara automática (fixo ou celular).
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzPhoneField v-model="phoneValue" label="Telefone" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzPhoneField
          v-model="phoneCustom"
          label="Celular"
          icon="mdi-cellphone"
        />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzPhoneField
          v-model="phoneDisabled"
          label="Desabilitado"
          disabled
        />
      </div>
    </div>
  </SectionCard>

  <SectionCard title="FzChipsSelect">
    <template #description>
      Autocomplete múltiplo que adiciona as opções como chips, sem checkbox no menu.
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 320px; max-width: 420px;">
        <FzChipsSelect v-model="chipsValue" label="Estados" :items="chipsOptions" />
      </div>

      <div style="min-width: 320px; max-width: 420px;">
        <FzChipsSelect
          v-model="chipsLimited"
          label="Máx. 2 visíveis"
          :items="chipsOptions"
          :max-visible-chips="2"
        />
      </div>

      <div style="min-width: 320px; max-width: 420px;">
        <FzChipsSelect
          v-model="chipsRequired"
          label="Obrigatório"
          :items="chipsOptions"
          required
        />
      </div>

      <div style="min-width: 320px; max-width: 420px;">
        <FzChipsSelect
          v-model="chipsDisabled"
          label="Desabilitado"
          :items="chipsOptions"
          disabled
        />
      </div>
    </div>

    <div class="mt-2 text-caption text-medium-emphasis">
      v-model: {{ JSON.stringify(chipsValue) }}
    </div>
  </SectionCard>

  <SectionCard title="FzZipCodeField">
    <template #description>
      Campo de CEP com busca automática via ViaCEP.
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzZipCodeField v-model="zipValue" label="CEP" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzZipCodeField
          v-model="zipDisabled"
          label="Desabilitado"
          disabled
        />
      </div>
    </div>
  </SectionCard>

  <SectionCard title="FzCpfCnpjField">
    <template #description>
      Campo único de CPF/CNPJ com detecção automática e validação do dígito verificador
      (aceita CNPJ alfanumérico).
    </template>

    <div class="d-flex flex-wrap ga-4">
      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentValue" label="CPF/CNPJ" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentCpf" label="CPF válido" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentCnpj" label="CNPJ numérico válido" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentAlphanumeric" label="CNPJ alfanumérico" />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentRequired" label="Obrigatório" required />
      </div>

      <div style="min-width: 280px; max-width: 360px;">
        <FzCpfCnpjField v-model="documentDisabled" label="Desabilitado" disabled />
      </div>
    </div>

    <div class="mt-2 text-caption text-medium-emphasis">
      v-model: {{ documentValue || '—' }} · CPF: {{ documentCpf }} · CNPJ: {{ documentCnpj }} · Alfa:
      {{ documentAlphanumeric }}
    </div>
  </SectionCard>

  <SectionCard title="FzFullAddress">
    <template #description>
      Formulário completo de endereço com busca por CEP.
    </template>

    <div class="d-flex flex-wrap ga-6">
      <div style="min-width: 400px; max-width: 600px;">
        <div class="text-subtitle-2 mb-2">Padrão</div>

        <FzFullAddress v-model="addressValue" />
      </div>

      <div style="min-width: 400px; max-width: 600px;">
        <div class="text-subtitle-2 mb-2">Com validação e contador</div>

        <FzFullAddress v-model="addressValidated" required counter />
      </div>

      <div style="min-width: 400px; max-width: 600px;">
        <div class="text-subtitle-2 mb-2">Campos bloqueados após CEP</div>

        <FzFullAddress
          v-model="addressDisabled"
          :disabled-fields="true"
        />
      </div>

      <div style="min-width: 400px; max-width: 600px;">
        <div class="text-subtitle-2 mb-2">Totalmente desabilitado</div>

        <FzFullAddress
          v-model="addressAllDisabled"
          disabled
        />
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DateRange } from '@/components';

// DatePicker
const dateValue = ref('');
const dateIso = ref('');
const dateEn = ref('');
const dateRequired = ref('');
const dateRange = ref('');
const dateDisabled = ref('2026-07-08');
const dateCustomLocation = ref('');
const minDate = ref('2026-07-01');
const maxDate = ref('2026-07-31');

// DateRangeField
const dateRangeValue = ref<DateRange>({ start: null, end: null });
const dateRangeFilled = ref<DateRange>({ start: '2026-07-01', end: '2026-07-10' });
const rangeMinDate = ref('2026-07-01');
const rangeMaxDate = ref('2026-07-31');
const dateRangeMinMax = ref<DateRange>({ start: null, end: null });
const dateRangeDisabled = ref<DateRange>({ start: '2026-07-15', end: '2026-07-20' });

// Email
const emailValue = ref('');
const emailRequired = ref('');
const emailDisabled = ref('user@example.com');

// Money
const moneyValue = ref(0);
const moneyValue2 = ref(0);
const moneyDisabled = ref(150.50);

// Number
const numberValue = ref(0);
const numberDecimal = ref(0);
const numberDisabled = ref(42);
const numberNegative = ref(0);

// Phone
const phoneValue = ref('');
const phoneCustom = ref('');
const phoneDisabled = ref('11999999999');

// ChipsSelect
const chipsOptions = [
  { title: 'São Paulo', value: 'SP' },
  { title: 'Rio de Janeiro', value: 'RJ' },
  { title: 'Minas Gerais', value: 'MG' },
  { title: 'Paraná', value: 'PR' },
  { title: 'Santa Catarina', value: 'SC' },
  { title: 'Rio Grande do Sul', value: 'RS' },
];
const chipsValue = ref<string[]>([]);
const chipsLimited = ref<string[]>(['SP', 'RJ', 'MG', 'PR']);
const chipsRequired = ref<string[]>([]);
const chipsDisabled = ref<string[]>(['SP', 'RJ']);

// ZipCode
const zipValue = ref('');
const zipDisabled = ref('');

// CpfCnpj
const documentValue = ref('');
const documentCpf = ref('11144477735');
const documentCnpj = ref('11222333000181');
const documentAlphanumeric = ref('12ABC34501DE35');
const documentRequired = ref('');
const documentDisabled = ref('11144477735');

// FullAddress
const addressValue = ref({});
const addressValidated = ref({});
const addressDisabled = ref({});
const addressAllDisabled = ref({
  zipCode: '01001000',
  street: 'Praça da Sé',
  number: '1',
  complement: 'Centro',
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'SP',
});
</script>

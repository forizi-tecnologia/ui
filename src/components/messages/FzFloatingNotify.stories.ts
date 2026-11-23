import type { Meta, StoryObj } from '@storybook/vue3';
import { onMounted } from 'vue';
import { notify } from '../../utils/notify';
import FzFloatingNotify from './FzFloatingNotify.vue';

const meta = {
  title: 'Messages/FzFloatingNotify',
  component: FzFloatingNotify,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Fixed-position notification card with auto-hide timer, animated progress bar, and hover-to-pause support.',
          '',
          '**Singleton pattern**: include `<FzFloatingNotify />` once in your `App.vue`, then trigger notifications imperatively from anywhere:',
          '',
          '```ts',
          "import { notify } from '@forizi-tecnologia/ui/utils';",
          '',
          "notify.success('Sucesso', 'Operação concluída.');",
          "notify.error('Erro', 'Algo deu errado.');",
          "notify.warning('Atenção', 'Verifique os dados.');",
          "notify.info('Info', 'Mensagem informativa.');",
          '```',
          '',
          '**Queue**: consecutive calls are shown one at a time, in order. Hovering pauses the visible item only.',
          '',
          '**Duration**: pass `{ duration }` as the last argument to override the default 3000ms:',
          '',
          '```ts',
          "notify.success('Salvo', 'Tudo certo', { duration: 5000 });",
          '```',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof FzFloatingNotify>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.success('Sucesso', 'Operação concluída com sucesso.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Error: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.error('Erro', 'Algo deu errado ao processar.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Warning: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.warning('Atenção', 'Verifique os dados informados.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Info: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.info('Informação', 'Esta é uma mensagem informativa.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const CustomDuration: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.success('Sucesso', 'Esta notificação fica 6 segundos na tela.', { duration: 6000 }));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Queue: Story = {
  render: () => ({
    setup() {
      onMounted(() => {
        notify.info('Primeira', 'Preenche a tela primeiro.');
        notify.success('Segunda', 'Aparece quando a primeira fechar.');
      });
    },
    template: '<FzFloatingNotify />',
  }),
};

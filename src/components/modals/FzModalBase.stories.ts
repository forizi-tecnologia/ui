import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FzModalBase, { type ModalAction } from './FzModalBase.vue';

const meta = {
  title: 'Modals/FzModalBase',
  component: FzModalBase,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'Controls modal visibility. Use with v-model.' },
    title: { control: 'text', description: 'Modal title displayed in the header' },
    message: { control: 'text', description: 'Text content shown when no default slot is provided. Falls back to the slot if one is given.' },
    titleIcon: { control: 'text', description: 'MDI icon name displayed before the title' },
    maxWidth: { control: 'number', description: 'Maximum width in pixels (number) or CSS value (string). Default: 500' },
    persistent: { control: 'boolean', description: 'Prevent closing the modal by clicking outside or pressing Escape. Default: true' },
    enterToConfirm: { control: 'boolean', description: 'Pressing Enter triggers the primary action. Default: false' },
    fullscreen: { control: 'boolean', description: 'Display modal in fullscreen mode. Default: false' },
    actions: { description: 'Array of ModalAction objects: { text: string, icon?: string, color?: string, variant?: string, handler?: () => void }. The last action with color "primary" (or no color) is treated as the primary action and triggers on Enter. Actions with "secondary" or "error" color trigger on Escape.' },
    contentClass: { control: 'text', description: 'Additional CSS classes added to the dialog content element' },
  },
} satisfies Meta<typeof FzModalBase>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultActions: ModalAction[] = [
  { text: 'Cancelar', color: 'secondary' },
  { text: 'Confirmar', color: 'primary' },
];

export const Default: Story = {
  args: {
    modelValue: true,
    title: 'Confirmar ação',
    message: 'Tem certeza que deseja prosseguir?',
    actions: defaultActions,
  },
};

export const WithIcon: Story = {
  args: {
    modelValue: true,
    title: 'Atenção',
    titleIcon: 'mdi-alert-circle',
    message: 'Esta ação não pode ser desfeita.',
    actions: [
      { text: 'Cancelar', color: 'secondary' },
      { text: 'Sim, prosseguir', color: 'error' },
    ],
  },
};

export const CustomContent: Story = {
  render: () => ({
    components: { FzModalBase },
    setup() {
      const open = ref(true);
      const actions: ModalAction[] = [
        { text: 'Fechar', color: 'primary', handler: () => { open.value = false; } },
      ];

      return { open, actions };
    },
    template: `
      <FzModalBase v-model="open" title="Conteúdo customizado" :actions="actions" max-width="600">
        <p>Este modal usa o slot padrão para renderizar conteúdo customizado.</p>
      </FzModalBase>
    `,
  }),
};

export const LargeWidth: Story = {
  args: {
    modelValue: true,
    title: 'Modal largo',
    message: 'Este modal usa maxWidth de 800px.',
    maxWidth: 800,
    actions: defaultActions,
  },
};

export const NotPersistent: Story = {
  args: {
    modelValue: true,
    title: 'Modal fechável',
    message: 'Clique fora ou pressione Esc para fechar.',
    persistent: false,
    actions: [
      { text: 'OK', color: 'primary' },
    ],
  },
};

export const KeyboardShortcuts: Story = {
  args: {
    modelValue: true,
    title: 'Atalhos de teclado',
    message: 'Pressione Enter para confirmar ou Esc para cancelar.',
    enterToConfirm: true,
    persistent: false,
    actions: [
      { text: 'Cancelar', color: 'secondary' },
      { text: 'Confirmar', color: 'primary' },
    ],
  },
};

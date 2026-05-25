import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FzModalBase, { type ModalAction } from './FzModalBase.vue';

const meta = {
  title: 'Modals/FzModalBase',
  component: FzModalBase,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    maxWidth: { control: 'number' },
    persistent: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
  },
} satisfies Meta<typeof FzModalBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: true,
    title: 'Confirm action',
    message: 'Are you sure you want to proceed?',
    actions: [
      { text: 'Cancel', color: 'secondary' },
      { text: 'Confirm', color: 'primary' },
    ] as ModalAction[],
  },
};

export const CustomContent: Story = {
  render: () => ({
    components: { FzModalBase },
    setup() {
      const open = ref(true);
      const actions: ModalAction[] = [
        { text: 'Close', color: 'primary', handler: () => { open.value = false; } },
      ];

      return { open, actions };
    },
    template: `
      <FzModalBase v-model="open" title="Custom content" :actions="actions" max-width="600">
        <p>This modal has custom content passed via the default slot.</p>
      </FzModalBase>
    `,
  }),
};

export const Large: Story = {
  args: {
    modelValue: true,
    title: 'Large modal',
    message: 'This modal has a wider max width.',
    maxWidth: 800,
    actions: [
      { text: 'OK', color: 'primary' },
    ] as ModalAction[],
  },
};

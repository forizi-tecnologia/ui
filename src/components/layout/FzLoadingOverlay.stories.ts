import type { Meta, StoryObj } from '@storybook/vue3';
import { onUnmounted } from 'vue';
import FzLoadingOverlay from './FzLoadingOverlay.vue';
import { loading } from '@/utils/loading';

const meta = {
  title: 'Layout/FzLoadingOverlay',
  component: FzLoadingOverlay,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Optional override. When unset, the overlay follows the global loading singleton (loading.show()/hide())',
    },
    message: {
      control: 'text',
      description: 'Optional override. When unset, uses the message passed to loading.show()',
    },
    delay: { control: 'number', description: 'Delay before showing content (ms). Default: 300' },
  },
} satisfies Meta<typeof FzLoadingOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isLoading: true,
    message: 'Loading...',
    delay: 300,
  },
};

export const Hidden: Story = {
  args: {
    isLoading: false,
  },
};

export const CustomMessage: Story = {
  args: {
    isLoading: true,
    message: 'Saving changes...',
  },
};

export const GlobalSingleton: Story = {
  render: () => ({
    components: { FzLoadingOverlay },
    setup() {
      const show = () => loading.show('Global loading...');
      const hide = () => loading.hide();

      onUnmounted(hide);

      return { show, hide };
    },
    template: `
      <div class="d-flex flex-column ga-4">
        <div class="d-flex ga-2">
          <v-btn color="primary" variant="elevated" @click="show">loading.show()</v-btn>
          <v-btn color="secondary" variant="outlined" @click="hide">loading.hide()</v-btn>
        </div>
        <FzLoadingOverlay />
      </div>
    `,
  }),
};

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
        component: 'Fixed-position notification card with auto-hide timer, progress bar, and hover-pause support. Use the `notify` singleton to trigger: `notify.success("Title", "Message")`.',
      },
    },
  },
} satisfies Meta<typeof FzFloatingNotify>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.success('Success', 'Operation completed successfully.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Error: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.error('Error', 'Something went wrong.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Warning: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.warning('Warning', 'Please check your input.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

export const Info: Story = {
  render: () => ({
    setup() {
      onMounted(() => notify.info('Info', 'This is an informational message.'));
    },
    template: '<FzFloatingNotify />',
  }),
};

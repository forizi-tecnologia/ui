import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FzIconToolTip from './FzIconToolTip.vue';

const meta = {
  title: 'Buttons/FzIconToolTip',
  component: FzIconToolTip,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', description: 'MDI icon name' },
    tooltip: { control: 'text', description: 'Tooltip text shown on hover' },
    color: { control: 'color', description: 'Icon and tooltip color' },
    asButton: { control: 'boolean', description: 'Render as v-btn instead of v-icon' },
    disabled: { control: 'boolean' },
    disabledTooltip: { control: 'text', description: 'Tooltip shown when disabled' },
    size: { control: 'text', description: 'Icon size (number or Vuetify size token). Forwarded to v-icon/v-btn' },
  },
} satisfies Meta<typeof FzIconToolTip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'mdi-pencil',
    tooltip: 'Edit',
    color: 'primary',
  },
};

export const AsButton: Story = {
  args: {
    icon: 'mdi-pencil',
    tooltip: 'Click to edit',
    asButton: true,
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'mdi-delete',
    tooltip: 'Delete',
    color: 'error',
    disabled: true,
  },
};

export const DisabledWithReason: Story = {
  args: {
    icon: 'mdi-delete',
    tooltip: 'Delete',
    color: 'error',
    disabled: true,
    disabledTooltip: 'You do not have permission to delete',
  },
};

export const CustomColor: Story = {
  args: {
    icon: 'mdi-content-save',
    tooltip: 'Save changes',
    color: 'success',
  },
};

export const Keyboard: Story = {
  render: () => ({
    components: { FzIconToolTip },
    setup() {
      const activationCount = ref(0);
      const onActivate = () => {
        activationCount.value += 1;
      };

      return { activationCount, onActivate };
    },
    template: `
      <div class="d-flex align-center ga-4">
        <FzIconToolTip icon="mdi-pencil" tooltip="Edit" @click="onActivate" />
        <span class="text-body-2">Tab to focus, then press Enter or Space. Activated {{ activationCount }} time(s).</span>
      </div>
    `,
  }),
};

export const CustomSize: Story = {
  args: {
    icon: 'mdi-content-save',
    tooltip: 'Save',
    size: 40,
  },
};

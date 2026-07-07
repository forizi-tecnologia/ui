import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { setupLib, requiredVuetifyComponents } from '../src';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components: requiredVuetifyComponents,
});

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
  app.use(vuetify);
  setupLib(app);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Forizi UI', 'Buttons', 'Inputs', 'Layout', 'Modals', 'Messages'],
      },
    },
  },
  decorators: [
    () => ({
      template: '<v-app class="pa-4"><story /></v-app>',
    }),
  ],
};

export default preview;

import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    const { default: vuetify } = await import('vite-plugin-vuetify');

    config.plugins = [...(config.plugins || []), vuetify({ autoImport: true })];

    return config;
  },
};

export default config;

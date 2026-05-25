import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import type { Component } from 'vue';

const vuetify = createVuetify();
const pinia = createPinia();

setActivePinia(pinia);

export function createComponent(
  component: Component,
  options?: MountingOptions<Record<string, unknown>>,
): VueWrapper {
  return mount(component, {
    global: {
      plugins: [vuetify, pinia],
    },
    ...options,
  });
}

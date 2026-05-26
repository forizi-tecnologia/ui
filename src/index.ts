import type { App } from 'vue';
import * as componentExports from './components';
import { globalsPlugin } from './plugins';
import { ensureVuetify } from './utils/vuetify-check';

export const components = componentExports;

export * from './components';

export * from './utils';

export * from './composables';

export * from './constants';

export type { FzDefaults } from './types/FzDefaults';

export { globalsPlugin } from './plugins';

export { requiredVuetifyComponents } from './vuetifyComponents';

export default function registerLibComponents(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}

export function registerLibPlugins(app: App) {
  app.use(globalsPlugin);
}

export function setupLib(app: App) {
  ensureVuetify(app);

  registerLibComponents(app);
  registerLibPlugins(app);
}

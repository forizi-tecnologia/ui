import type { App } from 'vue';

interface VueAppInternal {
  _context?: {
    provides?: Record<string | symbol, unknown>;
    components?: Record<string, unknown>;
  };
}

export function ensureVuetify(app: App): void {
  const appContext = (app as unknown as VueAppInternal)._context;
  const provides = appContext?.provides;
  const globalProperties = app.config.globalProperties;

  const hasVuetifyDirect =
    provides?.vuetify || provides?.$vuetify || globalProperties.$vuetify || (globalProperties as Record<string, unknown>).vuetify;

  const hasVuetifySymbol =
    provides &&
    Object.getOwnPropertySymbols(provides).some((sym) => {
      const symbolStr = sym.toString();

      return symbolStr.includes('vuetify') || symbolStr.includes('Vuetify');
    });

  const hasVuetifyComponents =
    appContext?.components && Object.keys(appContext.components).some((name) => name.startsWith('V'));

  const hasVuetify = hasVuetifyDirect || hasVuetifySymbol || hasVuetifyComponents;

  if (hasVuetify) return;

  if (import.meta.env.DEV) {
    console.warn(
      '[BaseLib] Vuetify not detected. Ensure app.use(vuetify) is called before setupLib(app).\n' +
        'Example:\n' +
        "  import { createVuetify } from 'vuetify'\n" +
        '  const vuetify = createVuetify()\n' +
        '  app.use(vuetify)\n' +
        '  setupLib(app)',
    );
  }
}

export function debugVuetifyInstances(): void {
  const overlayContainers = document.querySelectorAll('.v-overlay-container');
  const vApps = document.querySelectorAll('.v-application');
  const overlays = document.querySelectorAll('.v-overlay');
  const menus = document.querySelectorAll('.v-menu');
  const selects = document.querySelectorAll('.v-select');

  console.group('Vuetify Debug Info');
  console.log('Overlay containers found:', overlayContainers.length);
  console.log('v-application found:', vApps.length);
  console.log('Active overlays:', overlays.length);
  console.log('Menus found:', menus.length);
  console.log('v-select found:', selects.length);

  if (overlayContainers.length > 1) {
    console.warn(
      'Multiple overlay containers detected. This may indicate multiple Vuetify instances.\n' +
        'Ensure only one Vuetify instance is registered.',
    );
  }

  if (overlayContainers.length === 0) {
    console.warn(
      'No overlay container found. Vuetify may not be initialized correctly.\n' +
        'Check that app.use(vuetify) is called in main.ts',
    );
  }

  console.groupEnd();
}

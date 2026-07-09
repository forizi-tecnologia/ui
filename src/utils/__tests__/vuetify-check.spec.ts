/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { ensureVuetify, debugVuetifyInstances } from '../vuetify-check';

describe('ensureVuetify', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should warn when Vuetify is not installed', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const app = createApp({});

    ensureVuetify(app);

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Vuetify not detected'),
    );

    warnSpy.mockRestore();
  });

  it('should not warn when Vuetify is installed', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const app = createApp({});

    app.use(createVuetify());
    ensureVuetify(app);

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('should not throw when called with a valid app instance', () => {
    const app = createApp({});

    expect(() => ensureVuetify(app)).not.toThrow();
  });

  it('should detect Vuetify via a provided symbol when globalProperties is not set', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const app = createApp({});

    app.provide(Symbol('Vuetify'), {});
    ensureVuetify(app);

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('should detect Vuetify via a registered component starting with "V"', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const app = createApp({});

    app.component('VBtn', { template: '<button />' });
    ensureVuetify(app);

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('should not warn in production mode even when Vuetify is not installed', () => {
    vi.stubEnv('DEV', false);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const app = createApp({});

    ensureVuetify(app);

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});

describe('debugVuetifyInstances', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should not throw when called', () => {
    expect(() => debugVuetifyInstances()).not.toThrow();
  });

  it('should warn when no overlay containers exist', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    debugVuetifyInstances();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No overlay container found'),
    );

    warnSpy.mockRestore();
  });

  it('should warn when multiple overlay containers exist', () => {
    const first = document.createElement('div');
    const second = document.createElement('div');

    first.className = 'v-overlay-container';
    second.className = 'v-overlay-container';
    document.body.append(first, second);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    debugVuetifyInstances();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Multiple overlay containers detected'),
    );

    warnSpy.mockRestore();
    first.remove();
    second.remove();
  });
});

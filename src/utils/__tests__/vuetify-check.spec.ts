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
});

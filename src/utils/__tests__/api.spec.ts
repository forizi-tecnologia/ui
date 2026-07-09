import { describe, it, expect, beforeEach, vi } from 'vitest';
import { API_TIMEOUT } from '../types';

describe('api', () => {
  let apiModule: typeof import('../api');

  beforeEach(async () => {
    // Reset modules to get a fresh axios instance and config
    vi.resetModules();
    apiModule = await import('../api');
  });

  it('should export an axios instance with default baseURL', () => {
    expect(apiModule.default.defaults.baseURL).toBe('/api');
  });

  it('should export an axios instance with default timeout', () => {
    expect(apiModule.default.defaults.timeout).toBe(API_TIMEOUT);
  });

  it('should have JSON content-type header', () => {
    expect(apiModule.default.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should export configureApi function', () => {
    expect(typeof apiModule.configureApi).toBe('function');
  });

  it('should update baseURL when configureApi is called', () => {
    apiModule.configureApi({ baseURL: 'https://api.example.com' });

    expect(apiModule.default.defaults.baseURL).toBe('https://api.example.com');
  });

  it('should update timeout when configureApi is called', () => {
    apiModule.configureApi({ timeout: 5000 });

    expect(apiModule.default.defaults.timeout).toBe(5000);
  });

  it('should merge partial config without overwriting existing values', () => {
    apiModule.configureApi({ baseURL: 'https://api.example.com' });

    // Timeout should still be the default
    expect(apiModule.default.defaults.timeout).toBe(API_TIMEOUT);
  });

  it('should keep existing config when configureApi is called with empty object', () => {
    apiModule.configureApi({});

    expect(apiModule.default.defaults.baseURL).toBe('/api');
    expect(apiModule.default.defaults.timeout).toBe(API_TIMEOUT);
  });

  it('should update config and keep other defaults when only timeout changes', () => {
    apiModule.configureApi({ timeout: 15000 });

    expect(apiModule.default.defaults.timeout).toBe(15000);
    expect(apiModule.default.defaults.baseURL).toBe('/api');
  });

  it('should pass through a successful response unchanged via the response interceptor', () => {
    const interceptor = (apiModule.default.interceptors.response as unknown as {
      handlers: { fulfilled: (response: unknown) => unknown; rejected: (error: unknown) => Promise<unknown> }[];
    }).handlers[0];

    const response = { data: { ok: true }, status: 200 };

    expect(interceptor.fulfilled(response)).toBe(response);
  });

  it('should reject with the original error via the response interceptor', async () => {
    const interceptor = (apiModule.default.interceptors.response as unknown as {
      handlers: { fulfilled: (response: unknown) => unknown; rejected: (error: unknown) => Promise<unknown> }[];
    }).handlers[0];

    const error = new Error('Network Error');

    await expect(interceptor.rejected(error)).rejects.toBe(error);
  });
});
